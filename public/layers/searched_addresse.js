const params = new URLSearchParams(window.location.search);
const adresse = params.get('adresse'); // Récupérer l'adresse depuis l'URL
const distance = parseInt(params.get("distance")) || 500;
let searchExtent = null;
let searchedParcs = null;

if (adresse) {
  fetch(`/api/search?adresse=${encodeURIComponent(adresse)}`)
    .then(response => response.json())
    .then(geojson => {
      if (geojson && geojson.features.length > 0) {
        const adresseFeature = geojson.features[0];

        // 1. Ajout du point d'adresse
        const adresseSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(geojson)
        });

        const adresseLayer = new ol.layer.Vector({
          source: adresseSource,
          style: style_blue_points, // Ton style de point bleu
          display: 'always_on',
          title: 'Addresse recherchée',
          opacity: 1.0,
        });

        const adresseExtent = adresseSource.getExtent();

        // 2. Extraire l'ID et faire une deuxième requête
        const adresseId = adresseFeature.properties.id;

        fetch(`/api/espaces-verts-proximite?adresse_id=${adresseId}&distance=${distance}`)
          .then(res => res.json())
          .then(espacesVertsGeojson => {
            if (espacesVertsGeojson && espacesVertsGeojson.features.length > 0) {
              const evSource = new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(espacesVertsGeojson)
              });

              searchedParcs = new ol.layer.Vector({
                source: evSource,
                style: new ol.style.Style({
                  fill: new ol.style.Fill({ color: 'rgba(33, 127, 155, 0)' }),
                  stroke: new ol.style.Stroke({ color: 'rgba(33, 64, 155,1)', width: 2 })
                }),
                display: 'always_on',
                title: 'Parcs à proximité',
                opacity: 1.0,
              });

              map.addLayer(searchedParcs);
              map.addLayer(adresseLayer);
              // Si ton switcher est une instance openlayers-layerswitcher
              if (layerSwitcher && typeof layerSwitcher.renderPanel === 'function') {
                layerSwitcher.renderPanel(); // force le re-scan des couches
              }

              const evExtent = evSource.getExtent();
              searchExtent = ol.extent.extend(adresseExtent, evExtent);

              // 💡 Ajouter ce bloc pour récupérer les URL et afficher les infos
              const urlsParcs = espacesVertsGeojson.features
                .map(f => f.properties?.url_gardens)
                .filter(url => url);

                afficherInfosParcs(urlsParcs, searchExtent);

            } else {
              console.log("Aucun espace vert trouvé à proximité.");
              map.addLayer(adresseLayer);
              map.getView().fit(adresseExtent, {
                padding: [50, 50, 50, 50],
                maxZoom: 17,
                duration: 1000
            });
            }
          });
      } else {
        console.error("Adresse non trouvée.");
      }
    })
    .catch(error => console.error("Erreur dans la recherche d'adresse :", error));
} else {
  console.log("Aucune adresse dans l'URL, carte par défaut.");
}
