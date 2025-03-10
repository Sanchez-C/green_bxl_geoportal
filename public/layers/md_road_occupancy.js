const lyr_md_road_occ_morning = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
          // Teste la disponibilité du service WFS
          var apiUrl = "https://green-brussels.onrender.com/api/road_occupancy";
          var wfsUrl = "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                    "&request=GetFeature&typeName=green_brussels:md_road_occupancy" +
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
                    lyr_md_road_occ_morning.getSource().addFeatures(features);
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
                    lyr_md_road_occ_morning.getSource().addFeatures(features);
                })
                .catch(error => console.error('Erreur chargement WFS:', error));
            }
          
          // Lancer la vérification de la disponibilité du service WFS
          checkWfsAvailability(wfsUrl);
        }
    }),
    style: style_md_road_occ_morning,
    leg: 'leg_md_road_occ_morning',
    popuplayertitle: 'Occupation de la voirie (%)',
    interactive: true,
    title: 'Taux d\'occupation de la voirie entre 8h et 9h',
    opacity: 1.0
});

const lyr_md_road_occ_evening = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
          // Teste la disponibilité du service WFS
          var apiUrl = "https://green-brussels.onrender.com/api/road_occupancy";
          var wfsUrl = "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                    "&request=GetFeature&typeName=green_brussels:md_road_occupancy" +
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
                    lyr_md_road_occ_evening.getSource().addFeatures(features);
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
                    lyr_md_road_occ_evening.getSource().addFeatures(features);
                })
                .catch(error => console.error('Erreur chargement WFS:', error));
            }
          
          // Lancer la vérification de la disponibilité du service WFS
          checkWfsAvailability(wfsUrl);
        }
    }),
    style: style_md_road_occ_evening,
    leg: 'leg_md_road_occ_evening',
    popuplayertitle: 'Occupation de la voirie (%)',
    interactive: true,
    title: 'Taux d\'occupation de la voirie entre 17h et 18h',
    opacity: 1.0
});