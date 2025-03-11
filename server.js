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

// Route pour récupérer les données de street_axes_names
app.get('/api/street_axes_names', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/street_axes_names');
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
      FROM vector.street_axes_names AS t;
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

// Route pour récupérer les données de buildings
app.get('/api/buildings', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/buildings');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    if (db._connected === false) {
      console.log('⚠️ Connexion fermée, réouverture...');
      await db.connect();
    }

    // Exécuter les requêtes séparément en fonction du ROW_NUMBER()
    const batch1 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.buildings AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 1 AND 50000;
    `);

    const batch2 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.buildings AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 50001 AND 100000;
    `);

    const batch3 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.buildings AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 100001 AND 150000;
    `);

    const batch4 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.buildings AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 150001 AND 200000;
    `);

    const batch5 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.buildings AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 200001 AND 249896;
    `);

    // Vérifier si les données existent
    if (!batch1.rows[0].geojson || 
        !batch2.rows[0].geojson || 
        !batch3.rows[0].geojson || 
        !batch4.rows[0].geojson || 
        !batch5.rows[0].geojson) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }

    console.log("Données récupérées avec succès !");

    // Combiner les résultats dans une seule réponse GeoJSON
    const combinedGeoJSON = {
      type: 'FeatureCollection',
      features: [
        ...batch1.rows[0].geojson.features || [],
        ...batch2.rows[0].geojson.features || [],
        ...batch3.rows[0].geojson.features || [],
        ...batch4.rows[0].geojson.features || [],
        ...batch5.rows[0].geojson.features || []
      ]
    };

    res.json(combinedGeoJSON);
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

// Route pour récupérer les données de addresses
app.get('/api/addresses', async (req, res) => {
  console.log('🔄 Requête reçue pour /api/addresses');
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    if (db._connected === false) {
      console.log('⚠️ Connexion fermée, réouverture...');
      await db.connect();
    }

    // Exécuter les requêtes séparément en fonction du ROW_NUMBER()
    const batch1 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.addresses AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 1 AND 200000;
    `);

    const batch2 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.addresses AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 200001 AND 400000;
    `);

    const batch3 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.addresses AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 400001 AND 600000;
    `);

    const batch4 = await db.query(`
      WITH numbered AS (
        SELECT t.geom, ROW_NUMBER() OVER () AS rn
        FROM vector.addresses AS t
      )
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(geom)::json)
      ) AS geojson
      FROM numbered
      WHERE rn BETWEEN 600001 AND 790665;
    `);

    // Vérifier si les données existent
    if (!batch1.rows[0].geojson || 
        !batch2.rows[0].geojson || 
        !batch3.rows[0].geojson || 
        !batch4.rows[0].geojson) {
      console.error("Aucune donnée trouvée !");
      return res.status(404).json({ error: 'Aucune donnée disponible' });
    }

    console.log("Données récupérées avec succès !");

    // Combiner les résultats dans une seule réponse GeoJSON
    const combinedGeoJSON = {
      type: 'FeatureCollection',
      features: [
        ...batch1.rows[0].geojson.features || [],
        ...batch2.rows[0].geojson.features || [],
        ...batch3.rows[0].geojson.features || [],
        ...batch4.rows[0].geojson.features || []
      ]
    };

    res.json(combinedGeoJSON);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
});



// Route pour récupérer les données en GeoJSON de base_map
/*app.get('/api/base_map', async (req, res) => {
  try {
    console.log("Tentative d'exécution de la requête SQL...");
    // Vérifier si la connexion est toujours active avant d'exécuter la requête
    if (db._connected === false) {
      console.log('⚠️ La connexion à la base de données est fermée. On la réouvre...');
      await db.connect(); // Réouvre la connexion si elle est fermée
    }

    // Récupérer les couches individuellement
    console.log("Exécution de la requête de récupération de street_axes_names.");
    const StreetLabelResult = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', json_build_object('layer', 'bmap_street_axes_names')
          )
        )
      ) AS geojson
      FROM vector.street_axes_names AS t;
    `);
    console.log("Exécution de la requête de récupération de blocks_desc.");
    const BlocksResult = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', json_build_object('layer', 'bmap_blocks_desc')
          )
        )
      ) AS geojson
      FROM vector.blocks_desc AS t;
    `);
    console.log("Exécution de la requête de récupération de public_green_spaces.");
    const PGSResult = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', json_build_object('layer', 'bmap_public_green_spaces')
          )
        )
      ) AS geojson
      FROM vector.public_green_spaces AS t;
    `);
    console.log("Exécution de la requête de récupération de buildings.");
    const BuildingsResult = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', json_build_object('layer', 'bmap_buildings')
          )
        )
      ) AS geojson
      FROM vector.buildings AS t
      GROUP BY t.building_id;
    `);
    console.log("Exécution de la requête de récupération de municipalities.");
    const MunicipaltiesResult = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', json_build_object('layer', 'bmap_municipalities')
          )
        )
      ) AS geojson
      FROM vector.municipalities AS t;
    `);
    console.log("Exécution de la requête de récupération de trees_be.");
    const TreesResult = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', json_build_object('layer', 'bmap_trees_be')
          )
        )
      ) AS geojson
      FROM vector.trees_be AS t;
    `);
    console.log("Exécution de la requête de récupération de addresses.");
    const AddressesResult = await db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(t.geom)::json,
            'properties', json_build_object('layer', 'bmap_addresses')
          )
        )
      ) AS geojson
      FROM vector.addresses AS t
      GROUP BY t.addresse_id;
    `);

    // Combiner toutes les couches dans une seule réponse GeoJSON
    const combinedGeoJSON = {
      type: 'FeatureCollection',
      features: [
        //...AddressesResult.rows[0].geojson.features
        ...TreesResult.rows[0].geojson.features,
        ...MunicipaltiesResult.rows[0].geojson.features,
        //...BuildingsResult.rows[0].geojson.features,
        ...PGSResult.rows[0].geojson.features,
        ...BlocksResult.rows[0].geojson.features,
        ...StreetLabelResult.rows[0].geojson.features,
      ]
    };
    if (!AddressesResult.rows[0].geojson || 
      !TreesResult.rows[0].geojson || 
      !MunicipaltiesResult.rows[0].geojson || 
      !BuildingsResult.rows[0].geojson || 
      !PGSResult.rows[0].geojson || 
      !BlocksResult.rows[0].geojson || 
      !StreetLabelResult.rows[0].geojson) {
    console.error("Aucune donnée trouvée !");
    return res.status(404).json({ error: 'Aucune donnée disponible' });
    }

    console.log("Données récupérées avec succès !");

    // Répondre avec le GeoJSON combiné
    res.json(combinedGeoJSON);

  } catch (error) {
    console.error('Error fetching basemap data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});
*/





// Lancer le serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
