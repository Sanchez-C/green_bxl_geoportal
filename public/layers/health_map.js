const lyr_health_air = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: {
      'LAYERS': 'green_brussels:health_air',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_health',
  title: 'Pollution de l\'air',
  opacity: 1.000000,
});

const lyr_health_heat = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: {
      'LAYERS': 'green_brussels:health_heat',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_health',
  title: 'Stress thermique',
  opacity: 1.000000,
});

const lyr_health_multi = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: {
      'LAYERS': 'green_brussels:health_multi',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_health',
  title: 'Multi exposition',
  opacity: 1.000000,
});

const lyr_health_noise = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: {
      'LAYERS': 'green_brussels:health_noise',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_health',
  title: 'Pollution sonore',
  opacity: 1.000000,
});

const lyr_heat_islands = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: {
      'LAYERS': 'green_brussels:heat_islands',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_heat_islands',
  title: 'Ilot de chaleur urbains',
  opacity: 1.000000,
});