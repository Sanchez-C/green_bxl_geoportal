const lyr_lyr_md_noise_ldne = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
          // Teste la disponibilité du service WFS
          var apiUrl = "http://localhost:3000/api/noise";
          var wfsUrl = "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                    "&request=GetFeature&typeName=green_brussels:md_noise" +
                    "&outputFormat=application/json&srsname=EPSG:3857";  

          // Fonction pour charger les données depuis l'API
          function loadDataFromApi(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var features = new ol.format.GeoJSON().readFeatures(data, {
                        dataProjection: 'EPSG:3857',
                        featureProjection: projection.getCode()
                    });
                    lyr_lyr_md_noise_ldne.getSource().addFeatures(features);
                })
                .catch(error => console.error('Erreur chargement API:', error));
          }

          // Fonction pour tester si le WFS est disponible
          function checkWfsAvailability(url) {
            fetch(url, { method: 'HEAD' })  // On fait juste un HEAD pour vérifier la disponibilité
                .then(response => {
                    if (response.ok) {
                        // Si WFS est disponible, on charge les données depuis le WFS
                        fetchWfsData(url);
                    } else {
                        // Sinon, on charge les données depuis l'API
                        loadDataFromApi(apiUrl);
                    }
                })
                .catch(error => {
                    // Si la requête échoue (service WFS non trouvé par exemple), on utilise l'API
                    console.log('Service WFS non disponible, utilisation de l\'API');
                    loadDataFromApi(apiUrl);
                });
          }

          // Fonction pour charger les données depuis le WFS
          function fetchWfsData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var features = new ol.format.GeoJSON().readFeatures(data, {
                        dataProjection: 'EPSG:3857',
                        featureProjection: projection.getCode()
                    });
                    lyr_lyr_md_noise_ldne.getSource().addFeatures(features);
                })
                .catch(error => console.error('Erreur chargement WFS:', error));
            }
          
          // Lancer la vérification de la disponibilité du service WFS
          checkWfsAvailability(wfsUrl);
        }
    }),
    style: style_md_noise_ldne,
    leg: 'leg_md_noise_ldne',
    popuplayertitle: 'Bruit (db)',
    interactive: true,
    title: 'Pollution sonore (ldne)',
    opacity: 1.0
});

const lyr_lyr_md_noise_ln = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
          // Teste la disponibilité du service WFS
          var apiUrl = "http://localhost:3000/api/noise";
          var wfsUrl = "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                    "&request=GetFeature&typeName=green_brussels:md_noise" +
                    "&outputFormat=application/json&srsname=EPSG:3857";  

          // Fonction pour charger les données depuis l'API
          function loadDataFromApi(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var features = new ol.format.GeoJSON().readFeatures(data, {
                        dataProjection: 'EPSG:3857',
                        featureProjection: projection.getCode()
                    });
                    lyr_lyr_md_noise_ln.getSource().addFeatures(features);
                })
                .catch(error => console.error('Erreur chargement API:', error));
          }

          // Fonction pour tester si le WFS est disponible
          function checkWfsAvailability(url) {
            fetch(url, { method: 'HEAD' })  // On fait juste un HEAD pour vérifier la disponibilité
                .then(response => {
                    if (response.ok) {
                        // Si WFS est disponible, on charge les données depuis le WFS
                        fetchWfsData(url);
                    } else {
                        // Sinon, on charge les données depuis l'API
                        loadDataFromApi(apiUrl);
                    }
                })
                .catch(error => {
                    // Si la requête échoue (service WFS non trouvé par exemple), on utilise l'API
                    console.log('Service WFS non disponible, utilisation de l\'API');
                    loadDataFromApi(apiUrl);
                });
          }

          // Fonction pour charger les données depuis le WFS
          function fetchWfsData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var features = new ol.format.GeoJSON().readFeatures(data, {
                        dataProjection: 'EPSG:3857',
                        featureProjection: projection.getCode()
                    });
                    lyr_lyr_md_noise_ln.getSource().addFeatures(features);
                })
                .catch(error => console.error('Erreur chargement WFS:', error));
            }
          
          // Lancer la vérification de la disponibilité du service WFS
          checkWfsAvailability(wfsUrl);
        }
    }),
    style: style_md_noise_ln,
    leg: 'leg_md_noise_ln',
    popuplayertitle: 'Bruit (db)',
    interactive: true,
    title: 'Pollution sonore (ln)',
    opacity: 1.0
});