// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();
// Afficher l'URL de connexion pour debug (sans le mot de passe)
const safeDbUrl = process.env.DB_URL ? process.env.DB_URL.replace(/:\/\/(.*):(.*)@/, '://****:****@') : 'Non définie';
console.log('🌍 URL de connexion utilisée :', safeDbUrl);

const { Client } = require('pg');

// Désactiver SSL en local, mais le garder actif en production (si nécessaire)
console.log('🛠️ Création du client PostgreSQL...');
const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000, // 5 secondes
});

// Connexion à la base de données
console.log('🔌 Tentative de connexion...');
client.connect()
  .then(() => {
    console.log('✅ Connexion réussie à PostgreSQL');
  })
  .catch(err => {
    console.error('❌ Erreur de connexion :', err);
    console.error('📡 Vérifie si Render accepte bien les connexions externes.');
  });

module.exports = client;