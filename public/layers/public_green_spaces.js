const lyr_public_green_spaces = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
            var apiUrl = "https://green-brussels.onrender.com/api/public_green_spaces";
            var wfsUrl = "http://16.171.115.144/geoserver/green_brussels/wfs?service=WFS&version=1.1.0" +
                        "&request=GetFeature&typeName=green_brussels:public_green_spaces" +
                        "&outputFormat=application/json&srsname=EPSG:3857";

            function loadDataFromApi(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        var features = new ol.format.GeoJSON().readFeatures(data, {
                            dataProjection: 'EPSG:3857',
                            featureProjection: projection.getCode()
                        });
                        lyr_public_green_spaces.getSource().addFeatures(features);
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
                        lyr_public_green_spaces.getSource().addFeatures(features);
                    })
                    .catch(error => console.error('Erreur chargement WFS:', error));
            }

            checkWfsAvailability(wfsUrl);
        }
    }),
    popuplayertitle: 'Espace vert',
    interactive: true,
    style: style_transp,
    leg: 'leg_public_green_spaces',
    hoverStyle: 'greenHover',
    title: 'Espaces verts publics',
    display: 'always_on',
    opacity: 1.000000,
});