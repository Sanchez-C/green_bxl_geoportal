fetch('https://ton-serveur/render.com/api/donnees')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Vérifie que tu reçois bien les données
    // Ici, tu peux ajouter des données à OpenLayers
    const features = data.map(item => {
      const geometry = JSON.parse(item.geom);
      return new ol.Feature({
        geometry: new ol.geom.Point([geometry.coordinates[0], geometry.coordinates[1]]),
        id: item.id
      });
    });

    const vectorSource = new ol.source.Vector({
      features: features
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    // Ajoute le vectorLayer à ta carte OpenLayers
    map.addLayer(vectorLayer);
  })
  .catch(error => console.error('Erreur lors de la récupération des données :', error));
