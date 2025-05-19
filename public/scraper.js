const axios = require('axios');
const cheerio = require('cheerio');

async function getParcInfo(url) {
  const result = {};

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // 🏷️ Titre
    result.titre = $('h1 .field--name-title').text().trim();
    if (!result.titre.length) console.warn('⚠️  Aucun titre trouvé pour', url);

    // 🧾 Sous-titre
    result.soustitre = $('.field--name-field-soustitre').text().trim();
    if (!result.soustitre.length) console.warn('⚠️  Aucun sous-titre trouvé pour', url);

    // 🖼️ Première image illustratrice
    result.image = $('.field--name-field-media-image picture source').first().attr('srcset');
    if (result.image && result.image.startsWith('/')) {
      result.image = 'https://gardens.brussels' + result.image.split(' ')[0];
    }
    if (!result.image.length) console.warn('⚠️  Aucune image trouvée pour', url);

    // 📜 Copyright pour la première image
    result.image_copyright = $('.field--name-field-media-image')
      .first() // Cibler le premier champ d'image
      .closest('div.media--type-image') // Remonter jusqu'au conteneur de l'image
      .find('.field--name-field-copyright') // Trouver le copyright associé
      .first() // S'assurer de prendre seulement le premier copyright
      .text()
      .trim();
    if (!result.image_copyright.length) console.warn('⚠️  Aucun copyright trouvée pour', url);

    // 🟩 À propos
    result.a_propos = $('h2:contains("A propos de cet espace vert")')
      .next('.body-wrapper')
      .text()
      .trim();
    if (!result.a_propos.length) console.warn('⚠️  Aucune section A propos trouvée pour', url);

    // 📌 Infos pratiques
    result.infos_pratiques = [];
    const contenuUnique = new Set();

    function extraireContenu($elements) {
      $elements.each((i, el) => {
        const $el = $(el);
        const tag = $el[0].tagName;

        if (tag === 'h3') {
          const txt = $el.text().trim();
          if (txt && !contenuUnique.has(`h3:${txt}`)) {
            result.infos_pratiques.push({ type: 'h3', content: txt });
            contenuUnique.add(`h3:${txt}`);
          }
        }

        else if (tag === 'p') {
          const txt = $el.html().trim(); // Utilisation de .html() pour inclure les <br>
          if (txt && !contenuUnique.has(`p:${txt}`)) {
            // Séparation du texte par les <br>
            const sections = txt.split('<br>').map(str => str.trim()).filter(str => str); // Sépare et nettoie chaque section
            sections.forEach(section => {
              result.infos_pratiques.push({ type: 'p', content: section });
            });
            contenuUnique.add(`p:${txt}`);
          }
        }

        else if (tag === 'ul') {
          const items = [];
          $el.find('li').each((_, li) => {
            const itemText = $(li).text().trim();
            if (itemText && !contenuUnique.has(`li:${itemText}`)) {
              items.push(itemText);
              contenuUnique.add(`li:${itemText}`);
            }
          });

          if (items.length > 0) {
            result.infos_pratiques.push({ type: 'ul', items });
          }
        }

        else if (tag === 'div') {
          extraireContenu($el.contents()); // 🔁 récursivité
        }
      });
    
    if (!result.infos_pratiques.length) console.warn('⚠️  Aucune info pratique trouvée pour', url);
    }


    // 🔁 On lance ensuite l’analyse générale
    extraireContenu($('.ev-infos .card-body').contents());


    // 🛠️ Aménagements
    result.amenagements = [];
    result.descriptions  = [];

    // 1. Récupération de la section « Aménagements »
    const $amenagementsSection = $('summary h3')
      .filter((i, el) => $(el).text().trim() === 'Aménagements')
      .closest('summary')
      .next('.details-content');

    // -- icônes + libellés ------------------------------
    $amenagementsSection.find('.tag-group .field--name-name').each((i, el) => {
      const label = $(el).text().trim();
      if (label) result.amenagements.push({ type: 'icone', label });
    });

    // -- description textuelle --------------------------
    $amenagementsSection.find('.field--name-field-ev-equipement p').each((i, el) => {
      const desc = $(el).text().trim();
      if (desc) result.descriptions.push(desc);
    });

    if (!result.amenagements.length) console.warn('⚠️  Aucun aménagement trouvé pour', url);
    if (!result.descriptions.length) console.warn('⚠️  Aucune description trouvé pour', url);

    return result;

  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    throw error;
  }
}

module.exports = { getParcInfo };
