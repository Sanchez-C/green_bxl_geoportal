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
app.get('/api/roads', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      ) AS geojson
      FROM md_road_occupancy AS t;
    `);

    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
