const lyr_base_map_wms = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",  // L'URL de ton GeoServer
    params: {
      'LAYERS': 'green_brussels:base_map',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  title: 'Fond de carte (WMS)',
  display: 'always_on',
  opacity: 1.0
});

const lyr_bmap_blocks_desc = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    loader: function () {
      fetch('https://green-brussels.onrender.com/api/blocks_desc')
        .then(response => response.json())
        .then(data => {
          const features = new ol.format.GeoJSON().readFeatures(data, {
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857'
          });
          lyr_bmap_blocks_desc.getSource().clear();
          lyr_bmap_blocks_desc.getSource().addFeatures(features);
        })
        .catch(error => console.error('Erreur chargement API:', error));
    }
  }),
  style: style_bmap_blocks_type,
  title: ''
});

const lyr_bmap_public_green_spaces = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    loader: function () {
      fetch('https://green-brussels.onrender.com/api/public_green_spaces')
        .then(response => response.json())
        .then(data => {
          const features = new ol.format.GeoJSON().readFeatures(data, {
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857'
          });
          lyr_bmap_public_green_spaces.getSource().clear();
          lyr_bmap_public_green_spaces.getSource().addFeatures(features);
        })
        .catch(error => console.error('Erreur chargement API:', error));
    }
  }),
  style: style_bmap_public_green_spaces,
  title: ''
});

const lyr_bmap_municipalities = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    loader: function () {
      fetch('https://green-brussels.onrender.com/api/municipalities')
        .then(response => response.json())
        .then(data => {
          const features = new ol.format.GeoJSON().readFeatures(data, {
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857'
          });
          lyr_bmap_municipalities.getSource().clear();
          lyr_bmap_municipalities.getSource().addFeatures(features);
        })
        .catch(error => console.error('Erreur chargement API:', error));
    }
  }),
  style: style_bmap_municipalities,
  title: ''
});

// Création du groupe de couches
const lyr_base_map_api = new ol.layer.Group({
  layers: [
    lyr_bmap_blocks_desc,
    lyr_bmap_public_green_spaces,
    lyr_bmap_municipalities,
  ],
  title: 'Fond de carte (API)',
  display: 'always_on',
  opacity: 1.0
});