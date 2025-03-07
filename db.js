const { Client } = require('pg');

// Création d'une instance de client PostgreSQL avec les variables d'environnement définies sur Render
const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connexion à la base de données
client.connect()
  .then(() => console.log('✅ Connecté à la base de données PostgreSQL'))
  .catch(err => console.error('❌ Erreur de connexion à PostgreSQL', err));

module.exports = client;
