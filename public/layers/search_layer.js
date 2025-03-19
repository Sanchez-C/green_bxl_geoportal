const lyr_search_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
          // Teste la disponibilité du service WFS
          var apiUrl = "https://green-brussels.onrender.com/api/search_layer";
          var wfsUrl = serviceUrl + "/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                    "&request=GetFeature&typeName=green_brussels:search_layer" +
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
                    lyr_search_layer.getSource().addFeatures(features);
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
                    lyr_search_layer.getSource().addFeatures(features);
                })
                .catch(error => console.error('Erreur chargement WFS:', error));
            }
          
          // Lancer la vérification de la disponibilité du service WFS
          checkWfsAvailability(wfsUrl);
        }
    }),
    style: new ol.style.Style(),
    interactive: true,
    title: '',
    display: 'always_on',
    opacity: 1.000000,
});