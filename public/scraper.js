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

    // 🧾 Sous-titre
    result.soustitre = $('.field--name-field-soustitre').text().trim();

    // 🖼️ Première image illustratrice
    result.image = $('.field--name-field-media-image picture source').first().attr('srcset');
    if (result.image && result.image.startsWith('/')) {
      result.image = 'https://gardens.brussels' + result.image.split(' ')[0];
    }

    // 📜 Copyright pour la première image
    result.image_copyright = $('.field--name-field-media-image')
      .first() // Cibler le premier champ d'image
      .closest('div.media--type-image') // Remonter jusqu'au conteneur de l'image
      .find('.field--name-field-copyright') // Trouver le copyright associé
      .first() // S'assurer de prendre seulement le premier copyright
      .text()
      .trim();

    // 🟩 À propos
    result.a_propos = $('h2:contains("A propos de cet espace vert")')
      .next('.body-wrapper')
      .text()
      .trim();

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
    }

    // 🔁 On lance ensuite l’analyse générale
    extraireContenu($('.ev-infos .card-body').contents());


    // 🛠️ Aménagements
    result.amenagements = [];
    result.descriptions = []; 

    // 1. Liste des équipements avec icône
    $('.field--name-field-db-equipement .field--name-name').each((i, el) => {
      const equipement = $(el).text().trim();
      result.amenagements.push({ type: 'icone', label: equipement });
    });


    // 2. Description textuelle en dessous
    $('.field--name-field-ev-equipement p').each((i, el) => {
      const description = $(el).text().trim();
      if (description) {
        result.descriptions.push(description);
      }
    });

    return result;

  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    throw error;
  }
}

module.exports = { getParcInfo };
