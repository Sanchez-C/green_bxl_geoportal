// Importation des modules nécessaires
const express = require('express');
const path = require('path');

// Création d'une instance d'Express
const app = express();

// Définir le port (par défaut 3000, mais Render utilisera son propre port)
const port = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public'))); // 'public' est le dossier où tes fichiers HTML/CSS/JS sont stockés

// Route pour tester
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connection à la base de donnée
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Récupère l'URL de connexion via une variable d'environnement
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));
