const db = require('./db');
const axios = require('axios');

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // accents
    .replace(/[^a-z0-9 ]/g, '') // caractères spéciaux
    .trim()
    .replace(/\s+/g, '-');
}

function removeParentheses(str) {
  return str.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function removeWords(str, words) {
  const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
  return str.replace(pattern, '').replace(/\s+/g, ' ').trim();
}

function generateVariants(name) {
  const base = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const noParens = removeParentheses(base);

  return [
    slugify(base),
    slugify(noParens),
    slugify(removeWords(noParens, ['de', 'du', 'le', 'la'])),
    slugify(removeWords(noParens, ['des', 'les'])),
    slugify(removeWords(noParens, ["l'"])),
    slugify(removeWords(noParens, ['de', 'du', 'le', 'la', 'des', 'les', "l'"]))
  ];
}

async function isValidUrl(url) {
  try {
    const res = await axios.get(url);
    return res.status === 200;
  } catch {
    return false;
  }
}

async function updateUrls() {
  try {
    console.log('🔌 Connexion à la base via db.js...');

    await db.query(`
      ALTER TABLE vector.public_green_spaces_orig
      ADD COLUMN IF NOT EXISTS url_gardens TEXT;
    `);

    const res = await db.query(`
      SELECT gid, pgs_name_fr
      FROM vector.public_green_spaces_orig
      WHERE url_gardens IS NULL AND pgs_name_fr IS NOT NULL AND TRIM(pgs_name_fr) != '';
    `);

    for (const row of res.rows) {
      const { gid, pgs_name_fr } = row;

      if (!pgs_name_fr || !pgs_name_fr.trim()) {
        console.log(`⚠️ Nom vide pour gid ${gid}, on saute.`);
        continue;
      }

      console.log(`🌿 Traitement: "${pgs_name_fr}"`);

      const slugs = generateVariants(pgs_name_fr);
      let foundUrl = null;

      for (let i = 0; i < slugs.length; i++) {
        const slug = slugs[i];
        const url = `https://gardens.brussels/fr/espaces-verts/${slug}`;
        const ok = await isValidUrl(url);

        console.log(`  - Test URL ${i + 1}: ${url} → ${ok ? '✅ OK' : '❌'}`);

        if (ok) {
          foundUrl = url;
          break;
        }
      }

      await db.query(
        `UPDATE vector.public_green_spaces_orig SET url_gardens = $1 WHERE gid = $2`,
        [foundUrl, gid]
      );

      console.log(`  → Résultat final : ${foundUrl || '❌ aucune URL valide'}`);
    }

    console.log('✅ Mise à jour terminée.');
  } catch (err) {
    console.error('❌ Erreur :', err);
  } finally {
    db.end();
  }
}

updateUrls();
