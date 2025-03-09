// Importation des modules nécessaires
const express = require('express'); // Framework node.js
const path = require('path'); // Pour gérer les chemins de fichiers
const db = require('./db'); // Import du fichier de connexion à la BDD

// Création d'une instance d'Express
const app = express();

// Définir le port (par défaut 3000, mais Render utilisera son propre port)
const port = process.env.PORT || 3000;

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

// Route pour récupérer les données en GeoJSON
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
      FROM vector.md_road_occupancy2 AS t;
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

// Lancer le serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
