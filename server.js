// Importation des modules nécessaires
const express = require('express'); // Framework node.js
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
    'http://localhost:8080', 
    'https://green-brussels.onrender.com',  // Ajoute l'URL de ton site Render
    'https://green-brussels.duckdns.org' // Ajoute l'IP de ton site AWS
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Appliquer CORS globalement
app.use(cors(corsOptions));

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

// Route pour récupérer les données en GeoJSON de md_road_occupancy
app.get('/api/road_occupancy', async (req, res) => {
console.log('🔄 Requête reçue pour /api/road_occupancy');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    // Vérifier si la connexion est toujours active avant d'exécuter la requête
    if (db._connected === false) {
      console.log('⚠️ La connexion à la base de données est fermée. On la réouvre...');
      await db.connect(); // Réouvre la connexion si elle est fermée
    }
    const result = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      ) AS geojson
      FROM vector.md_road_occupancy AS t;
    `);

    if (!result || !result.rows || result.rows.length === 0) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }

    console.log("Données récupérées avec succès !");
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données en GeoJSON de md_noise
app.get('/api/noise', async (req, res) => {
console.log('🔄 Requête reçue pour /api/noise');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    // Vérifier si la connexion est toujours active avant d'exécuter la requête
    if (db._connected === false) {
      console.log('⚠️ La connexion à la base de données est fermée. On la réouvre...');
      await db.connect(); // Réouvre la connexion si elle est fermée
    }
    const result = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      ) AS geojson
      FROM vector.md_noise AS t;
    `);

    if (!result || !result.rows || result.rows.length === 0) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }

    console.log("Données récupérées avec succès !");
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données en GeoJSON de md_population
app.get('/api/population', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/population');
    try {
      console.log("Tentative d'exécution de la requête SQL...");
      // Vérifier si la connexion est toujours active avant d'exécuter la requête
      if (db._connected === false) {
        console.log('⚠️ La connexion à la base de données est fermée. On la réouvre...');
        await db.connect(); // Réouvre la connexion si elle est fermée
      }
      const result = await db.query(`
        SELECT json_build_object(
          'type', 'FeatureCollection',
          'features', json_agg(ST_AsGeoJSON(t.*)::json)
        ) AS geojson
        FROM vector.md_population AS t;
      `);
  
      if (!result || !result.rows || result.rows.length === 0) {
        console.error("Aucune donnée trouvée !");
        return res.status(404).json({ error: 'Aucune donnée disponible' });
      }
  
      console.log("Données récupérées avec succès !");
      res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données en GeoJSON de md_green_spaces
app.get('/api/green_spaces', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/green_spaces');
    try {
      console.log("Tentative d'exécution de la requête SQL...");
      // Vérifier si la connexion est toujours active avant d'exécuter la requête
      if (db._connected === false) {
        console.log('⚠️ La connexion à la base de données est fermée. On la réouvre...');
        await db.connect(); // Réouvre la connexion si elle est fermée
      }
      const result = await db.query(`
        SELECT json_build_object(
          'type', 'FeatureCollection',
          'features', json_agg(ST_AsGeoJSON(t.*)::json)
        ) AS geojson
        FROM vector.md_green_spaces AS t;
      `);
  
      if (!result || !result.rows || result.rows.length === 0) {
        console.error("Aucune donnée trouvée !");
        return res.status(404).json({ error: 'Aucune donnée disponible' });
      }
  
      console.log("Données récupérées avec succès !");
      res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données en GeoJSON de search_layer
app.get('/api/search_layer', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/search_layer');
    try {
      console.log("Tentative d'exécution de la requête SQL...");
      // Vérifier si la connexion est toujours active avant d'exécuter la requête
      if (db._connected === false) {
        console.log('⚠️ La connexion à la base de données est fermée. On la réouvre...');
        await db.connect(); // Réouvre la connexion si elle est fermée
      }
      const result = await db.query(`
        SELECT json_build_object(
          'type', 'FeatureCollection',
          'features', json_agg(ST_AsGeoJSON(t.*)::json)
        ) AS geojson
        FROM vector.search_layer AS t;
      `);
  
      if (!result || !result.rows || result.rows.length === 0) {
        console.error("Aucune donnée trouvée !");
        return res.status(404).json({ error: 'Aucune donnée disponible' });
      }
  
      console.log("Données récupérées avec succès !");
      res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données de blocks_desc
app.get('/api/blocks_desc', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/blocks_desc');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    if (db._connected === false) {
      console.log('⚠️ Connexion fermée, réouverture...');
      await db.connect();
    }
    const result = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      ) AS geojson
      FROM vector.blocks_desc AS t;
    `);
    if (!result.rows.length) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }
    console.log("Données récupérées avec succès !");
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données de public_green_spaces
app.get('/api/public_green_spaces', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/public_green_spaces');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    if (db._connected === false) {
      console.log('⚠️ Connexion fermée, réouverture...');
      await db.connect();
    }
    const result = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      ) AS geojson
      FROM vector.public_green_spaces AS t;
    `);
    if (!result.rows.length) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }
    console.log("Données récupérées avec succès !");
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données de municipalities
app.get('/api/municipalities', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/municipalities');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    if (db._connected === false) {
      console.log('⚠️ Connexion fermée, réouverture...');
      await db.connect();
    }
    const result = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      ) AS geojson
      FROM vector.municipalities AS t;
    `);
    if (!result.rows.length) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }
    console.log("Données récupérées avec succès !");
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les données de trees_be
app.get('/api/trees_be', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/trees_be');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    if (db._connected === false) {
      console.log('⚠️ Connexion fermée, réouverture...');
      await db.connect();
    }
    const result = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      ) AS geojson
      FROM vector.trees_be AS t;
    `);
    if (!result.rows.length) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }
    console.log("Données récupérées avec succès !");
    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});


