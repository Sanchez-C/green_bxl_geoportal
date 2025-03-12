const lyr_trees_be = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
            var apiUrl = "https://green-brussels.onrender.com/api/trees";
            var wfsUrl = "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                        "&request=GetFeature&typeName=green_brussels:trees_be" +
                        "&outputFormat=application/json&srsname=EPSG:3857&bbox=" +
                        extent.join(',') + ',EPSG:3857';

            function loadDataFromApi(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        var features = new ol.format.GeoJSON().readFeatures(data, {
                            dataProjection: 'EPSG:3857',
                            featureProjection: projection.getCode()
                        });
                        lyr_trees_be.getSource().addFeatures(features);
                    })
                    .catch(error => console.error('Erreur chargement API:', error));
            }

            function checkWfsAvailability(url) {
                fetch(url, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            fetchWfsData(url);
                        } else {
                            loadDataFromApi(apiUrl);
                        }
                    })
                    .catch(error => {
                        console.log('Service WFS non disponible, utilisation de l\'API');
                        loadDataFromApi(apiUrl);
                    });
            }

            function fetchWfsData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        var features = new ol.format.GeoJSON().readFeatures(data, {
                            dataProjection: 'EPSG:3857',
                            featureProjection: projection.getCode()
                        });
                        lyr_trees_be.getSource().addFeatures(features);
                    })
                    .catch(error => console.error('Erreur chargement WFS:', error));
            }

            checkWfsAvailability(wfsUrl);
        }
    }),
    declutter: false,
    source: cluster_trees_be, 
    style: style_trees_be,
    leg: 'leg_trees',
    popuplayertitle: 'Arbre',
    interactive: true,
    title: 'Arbres gérés par Bruxelles Environnement',
    display: 'always_on'
});