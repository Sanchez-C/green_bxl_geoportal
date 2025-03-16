var lyr_trees_be = new ol.layer.Vector({
    declutter: false,
    source: new ol.source.Cluster({
        distance: 30,
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            strategy: ol.loadingstrategy.bbox,
            loader: function (extent, resolution, projection) {
                // URLs des sources de données
                var apiUrl = "https://green-brussels.onrender.com/api/trees_be"; 
                var wfsUrl = "http://16.171.115.144/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                            "&request=GetFeature&typeName=green_brussels:trees_be" +
                            "&outputFormat=application/json&srsname=EPSG:3857&bbox=" +
                            extent.join(',') + ',EPSG:3857';

                var vectorSource = this; // Source OL à mettre à jour

                // Fonction pour charger les données depuis l'API
                function loadDataFromApi(url) {
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            var features = new ol.format.GeoJSON().readFeatures(data, {
                                dataProjection: 'EPSG:3857',
                                featureProjection: projection.getCode()
                            });
                            vectorSource.addFeatures(features);
                            console.log("Données chargées depuis l'API.");
                        })
                        .catch(error => console.error('Erreur chargement API:', error));
                }

                // Fonction pour tester si le WFS est disponible
                function checkWfsAvailability(url) {
                    fetch(url, { method: 'HEAD' })  // Vérifie la disponibilité avec une requête HEAD
                        .then(response => {
                            if (response.ok) {
                                console.log("Service WFS disponible, chargement des données...");
                                fetchWfsData(url);
                            } else {
                                console.warn("Service WFS indisponible, bascule vers l'API.");
                                loadDataFromApi(apiUrl);
                            }
                        })
                        .catch(error => {
                            console.warn("Erreur connexion WFS, utilisation de l'API.");
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
                            vectorSource.addFeatures(features);
                            console.log("Données chargées depuis le WFS.");
                        })
                        .catch(error => console.error('Erreur chargement WFS:', error));
                }

                // Lancer la vérification de la disponibilité du service WFS
                checkWfsAvailability(wfsUrl);
            }
        })
    }),
    style: style_trees_be,
    leg: 'leg_trees',
    popuplayertitle: 'Arbre',
    interactive: true,
    title: 'Arbres gérés par BE',
    display: 'always_on'
});
