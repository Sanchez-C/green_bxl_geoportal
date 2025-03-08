const { Client } = require('pg');

const connectionOptions = {
  connectionString: process.env.DB_URL
};

// Désactiver SSL si le serveur ne le supporte pas
if (process.env.DB_DISABLE_SSL === 'true') {
  connectionOptions.ssl = false;
} else {
  connectionOptions.ssl = { rejectUnauthorized: false };
}

// Création d'une instance de client PostgreSQL avec les variables d'environnement définies sur Render
const client = new Client(connectionOptions);

// Connexion à la base de données
client.connect()
  .then(() => console.log('✅ Connecté à la base de données PostgreSQL'))
  .catch(err => console.error('❌ Erreur de connexion à PostgreSQL', err));

module.exports = client;