const puppeteer = require('puppeteer');

(async () => {
  const result = {};
  const url = 'https://gardens.brussels/fr/espaces-verts/parc-roi-baudouin';

  // Lancer Chromium avec l’option pour ignorer les erreurs SSL
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--ignore-certificate-errors'],
    ignoreHTTPSErrors: true
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Exécute du code dans la page comme dans un navigateur
    const data = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : null;
      };

      const getImage = () => {
        const img = document.querySelector('.field--name-field-media-image picture source');
        if (img && img.getAttribute('srcset')) {
          const src = img.getAttribute('srcset').split(' ')[0];
          return src.startsWith('/')
            ? 'https://gardens.brussels' + src
            : src;
        }
        return null;
      };

      const getTextAfterHeading = (headingText) => {
        const headings = [...document.querySelectorAll('h2')];
        const heading = headings.find(h => h.textContent.includes(headingText));
        if (heading && heading.nextElementSibling) {
          return heading.nextElementSibling.textContent.trim();
        }
        return null;
      };

      const getAménagements = () => {
        const detail = [...document.querySelectorAll('details')].find(d =>
          d.querySelector('summary h3')?.textContent.includes('Aménagements')
        );
        return detail ? detail.querySelector('.details-content')?.textContent.trim() : null;
      };

      return {
        titre: getText('h1 .field--name-title'),
        soustitre: getText('.field--name-field-soustitre'),
        image: getImage(),
        a_propos: getTextAfterHeading('A propos de cet espace vert'),
        infos_pratiques: getText('.ev-infos-mobile .card-body'),
        amenagements: getAménagements()
      };
    });

    Object.assign(result, data);
    console.log(result);
  } catch (err) {
    console.error('💥 Erreur pendant le scraping :', err.message);
  } finally {
    await browser.close();
  }
})();
