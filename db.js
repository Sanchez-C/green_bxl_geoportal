// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const { Client } = require('pg');

const connectionOptions = {
  connectionString: process.env.DB_URL
};

// Désactiver SSL en local, mais le garder actif en production (si nécessaire)
if (process.env.NODE_ENV === 'production') {
  connectionOptions.ssl = { rejectUnauthorized: false };
} else {
  connectionOptions.ssl = false; // Désactive SSL en local
}

// Création d'une instance de client PostgreSQL avec les variables d'environnement définies sur Render
const client = new Client(connectionOptions);

// Connexion à la base de données
client.connect()
  .then(() => console.log('✅ Connecté à la base de données PostgreSQL'))
  .catch(err => console.error('❌ Erreur de connexion à PostgreSQL', err));

module.exports = client;