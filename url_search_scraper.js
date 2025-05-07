const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const stringSimilarity = require('string-similarity');
const db = require('./db');

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function fetchSlugsFromSitemap() {
  try {
    const { data } = await axios.get('https://gardens.brussels/sitemap.xml');
    const parsed = await parseStringPromise(data);

    const urls = parsed.urlset.url
      .map(u => u.loc[0])
      .filter(link => link.includes('/fr/espaces-verts/'))
      .map(link => {
        const slug = link.split('/fr/espaces-verts/')[1].replace(/\/$/, '');
        return { slug, url: link };
      });

    return urls;
  } catch (err) {
    console.error('Erreur récupération sitemap:', err);
    return [];
  }
}

async function updateMatchingUrls() {
  const unmatchedHighScore = [];
  const matchedData = {}; // Dictionnaire pour garder trace des doublons et des scores les plus élevés

  try {
    console.log('🔌 Connexion à la base...');

    await db.query(`
      ALTER TABLE vector.public_green_spaces_orig
      ADD COLUMN IF NOT EXISTS url_gardens TEXT;
    `);

    const siteSlugs = await fetchSlugsFromSitemap();
    console.log(`🌐 ${siteSlugs.length} slugs récupérés depuis le site.`);

    const res = await db.query(`
      SELECT gid, pgs_name_fr, subtype_fr
      FROM vector.public_green_spaces_orig
      WHERE type_fr = 'Espace vert'
        AND pgs_name_fr IS NOT NULL
        AND TRIM(pgs_name_fr) != ''
        AND subtype_fr NOT IN ('Associé à la voirie', 'Cimetière');
    `);

    for (const row of res.rows) {
      const { gid, pgs_name_fr, subtype_fr } = row;
      const slug = slugify(pgs_name_fr);

      const allSlugs = siteSlugs.map(s => s.slug);
      const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(slug, allSlugs);

      // Vérification de correspondance
      if (bestMatch.rating >= 0.67) {
        const matchedUrl = siteSlugs[bestMatchIndex].url;

        // Si on a déjà une correspondance pour ce nom, vérifier le score
        if (matchedData[slug]) {
          // Comparer les scores
          if (matchedData[slug].score < bestMatch.rating) {
            console.log(`✅ Nouveau meilleur match pour "${pgs_name_fr}" → ${matchedUrl} (score: ${bestMatch.rating.toFixed(2)})`);
            matchedData[slug] = { gid, url: matchedUrl, score: bestMatch.rating };
          }
        } else {
          // Ajouter la première correspondance (n'existe pas encore dans matchedData)
          console.log(`✅ Match pour "${pgs_name_fr}" → ${matchedUrl} (score: ${bestMatch.rating.toFixed(2)})`);
          matchedData[slug] = { gid, url: matchedUrl, score: bestMatch.rating };
        }

      } else {
        console.log(`❌ Aucun match fiable pour "${pgs_name_fr}" (score max: ${bestMatch.rating.toFixed(2)})`);

        await db.query(
          `UPDATE vector.public_green_spaces_orig SET url_gardens = NULL WHERE gid = $1`,
          [gid]
        );

        if (bestMatch.rating >= 0.5) {
          unmatchedHighScore.push({
            name: pgs_name_fr,
            dbSlug: slug,
            siteSlug: siteSlugs[bestMatchIndex].slug,
            score: bestMatch.rating
          });
        }
      }
    }

    // Mise à jour de la base de données avec les meilleures correspondances (après avoir filtré les doublons)
    for (const parkName in matchedData) {
      const { gid, url, score } = matchedData[parkName];
      await db.query(
        `UPDATE vector.public_green_spaces_orig SET url_gardens = $1 WHERE gid = $2`,
        [url, gid]
      );
    }

    if (unmatchedHighScore.length > 0) {
      unmatchedHighScore.sort((a, b) => b.score - a.score);

      console.log('⚠️ Cas avec un score élevé mais non retenus :');
      unmatchedHighScore.forEach((item) => {
        console.log(`  - Nom : "${item.name}", Slug base : "${item.dbSlug}", Slug site : "${item.siteSlug}", Score : ${item.score.toFixed(2)}`);
      });
    }

    console.log('✅ Mise à jour terminée.');
  } catch (err) {
    console.error('❌ Erreur:', err);
  } finally {
    db.end();
  }
}

updateMatchingUrls();
