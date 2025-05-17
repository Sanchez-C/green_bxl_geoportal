// Importation des modules nécessaires
const express = require('express'); // Framework node.js
const { getParcInfo } = require('./public/scraper'); // Importe le scraper 
const cors = require('cors');
const path = require('path'); // Pour gérer les chemins de fichiers
const db = require('./db'); // Import du fichier de connexion à la BDD

// Création d'une instance d'Express
const app = express();

// Définir le port (par défaut 3000, mais Render utilisera son propre port)
const port = process.env.PORT || 3000;

// Autoriser localhost:3000 et d'autres origines (si besoin)
const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://localhost:4200', 
    'http://localhost:8080', 
    'https://green-brussels.duckdns.org' // Ajoute l'IP de ton site AWS
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Appliquer CORS globalement
app.use(cors(corsOptions));

// Fonction pour extraire le numéro de la maison d'une adresse
function extraireNumero(adresse) {
  const regex = /(\d{1,5}[A-Za-z]?)(?:\s*(bis|ter|quater))?/i;
  // Repère un numéro (un ou plusieurs chiffres), suivi éventuellement d’une lettre, d'une espace ou de bis/ter/quater

  const match = adresse.match(regex);
  return match ? match[1] : null; // Si un numéro est trouvé, retourne le numéro
}

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public'))); // 'public' est le dossier où tes fichiers HTML/CSS/JS sont stockés

// Route pour tester la connexion à la base de données
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()'); // Exécute une requête simple
    res.json({ message: 'Connexion réussie à PostgreSQL', time: result.rows[0] });
  } catch (err) {
    console.error('❌ Erreur lors de la requête PostgreSQL', err);
    res.status(500).json({ error: 'Erreur de connexion à la base de données' });
  }
});

// Route principale
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Suggestions d'addresses renvoyées à l'utilisateur
app.get('/api/search/suggestions', async (req, res) => {
  const saisie = req.query.adresse;

  if (!saisie || saisie.length < 3) {
    return res.status(400).json({ message: "Saisie trop courte ou absente" });
  }

  try {
    const query = `
    SELECT * FROM (
      SELECT DISTINCT name_fr, similarity(name_fr, $1) AS score
      FROM data_table.place_names
      WHERE name_fr % $1
    ) AS sub
    WHERE score > 0.2
    ORDER BY score DESC
    LIMIT 5;
    `;
    const result = await db.query(query, [`%${saisie}%`]);

    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions:", error);
    res.status(500).json({ error: error.message });
  }
});

// Requête utilisateur pour récupérer un geojson avec son addresse
app.get('/api/search', async (req, res) => {
  const adresse = req.query.adresse;
  console.log('🔄 Requête reçue pour /api/search avec l\'adresse:', adresse);

  if (!adresse) {
    return res.status(400).json({ message: "Aucune adresse fournie" });
  }

  // Extraire le numéro de maison de l'adresse
  const numero = extraireNumero(adresse);
  const adresseSansNumero = adresse.replace(numero ? numero : '', '').trim();
  console.log('🔎 Adresse nettoyée :', adresseSansNumero);
  console.log('🔎 Numéro :', numero);
  // Si aucun numéro n'est extrait, retourne une erreur ou continue sans filtre sur le numéro
  if (!numero) {
    return res.status(400).json({ message: "Numéro de maison non trouvé dans l'adresse" });
  }

  try {
    // Vérifier si la connexion à la base est toujours active
    if (db._connected === false) {
      console.log('⚠️ La connexion à la base de données est fermée. On la réouvre...');
      await db.connect(); // Réouvre la connexion si elle est fermée
    }

    // Requête SQL avec recherche sur le numéro et la rue
    const query = `
    SELECT json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(features.feature)
    ) AS geojson
    FROM (
      SELECT json_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(a.geom)::json,
        'properties', json_build_object(
          'id', a.addresse_id,
          'name_fr', p.name_fr,
          'numero', a.house_nb,
          'score', similarity(p.name_fr, $1)
        )
      ) AS feature
      FROM vector.addresses a
      JOIN data_table.place_names p ON a.place_name_id = p.place_name_id
      WHERE p.name_fr % $1
        AND a.house_nb = $2
      ORDER BY similarity(p.name_fr, $1) DESC
      LIMIT 1
    ) AS features;
  `;

    const result = await db.query(query, [adresseSansNumero, numero]);

    if (!result || !result.rows || result.rows.length === 0) {
      console.error("Aucune adresse trouvée !");
      return res.status(404).json({ message: "Adresse non trouvée" });
    }

    console.log("Adresse récupérée avec succès !");
    // Envoie le GeoJSON dans la réponse
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: error.message });
  }
});

// Requête utilisateur pour récupérer un geojson avec les espaces verts à proximité
app.get('/api/espaces-verts-proximite', async (req, res) => {
  const adresseId = req.query.adresse_id;
  const distance = parseInt(req.query.distance) || 500;

  if (!adresseId) {
    return res.status(400).json({ message: "Paramètre adresse_id manquant" });
  }

  try {
    // Requête pour récupérer la géométrie de l’adresse
    const geomQuery = `
      SELECT geom
      FROM vector.addresses
      WHERE addresse_id = $1
    `;
    const geomResult = await db.query(geomQuery, [adresseId]);

    if (geomResult.rows.length === 0) {
      return res.status(404).json({ message: "Adresse introuvable" });
    }

    const geom = geomResult.rows[0].geom;

    // Requête pour trouver les espaces verts dans un rayon de 500m
    const espacesVertsQuery = `
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', to_jsonb(t) - 'geom'
          )
        )
      ) AS geojson
      FROM (
        SELECT ev.*, ST_Distance(ev.geom, $1::geometry) AS distance
        FROM vector.public_green_spaces_orig ev
        WHERE ST_DWithin(ev.geom, $1::geometry, $2)
        ORDER BY distance ASC
      ) t
    `;

    const result = await db.query(espacesVertsQuery, [geom, distance]);

    if (!result.rows[0].geojson.features) {
      return res.status(200).json({
        type: "FeatureCollection",
        features: [],
        message: "Aucun espace vert trouvé à proximité"
      });
    }

    console.log("Espaces verts récupérées avec succès !");
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des espaces verts :', error);
    res.status(500).json({ error: error.message });
  }
});

// server.js ou ton fichier de serveur
app.get('/api/parc', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'Paramètre `url` manquant' });
  }

  try {
    console.log('Requête reçue pour l\'URL:', url);  // Log côté serveur pour vérifier la requête
    const info = await getParcInfo(url);  // Appel à la fonction getParcInfo
    res.json({
      ...info,
      url
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du scraping' });
  }
});

app.get('/api/md_green_spaces', async (req, res) => {

  try {
    const GreenSpacesQuery = `
      SELECT 
        md_green_spaces.md_id, 
        population,
        gardens_nb, 
        gardens_rel, 
        lden,
        ST_X(ST_Centroid(md_green_spaces.geom)) AS lon, 
        ST_Y(ST_Centroid(md_green_spaces.geom)) AS lat
      FROM vector.md_green_spaces
      JOIN vector.md_population ON md_green_spaces.md_id = md_population.md_id
      JOIN vector.md_noise ON md_green_spaces.md_id = md_noise.md_id
      WHERE md_green_spaces.gardens_rel >= 0
    `;

    const result = await db.query(GreenSpacesQuery);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur dans /api/md_green_spaces:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Lancer le serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});


