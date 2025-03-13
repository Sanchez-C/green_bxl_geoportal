const lyr_noise_multi_lden = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",  // L'URL de ton GeoServer
    params: {
      'LAYERS': 'green_brussels:noise_multi_lden',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_noise',
  title: 'Multi exposition (lden)',
  opacity: 1.000000,
});

const lyr_noise_multi_ln = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",  // L'URL de ton GeoServer
    params: {
      'LAYERS': 'green_brussels:noise_multi_ln',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_noise',
  title: 'Multi exposition (ln)',
  opacity: 1.000000,
});

const lyr_noise_road_lden = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",  // L'URL de ton GeoServer
    params: {
      'LAYERS': 'green_brussels:noise_road_lden',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_noise',
  title: 'Trafic routier (lden)',
  opacity: 1.000000,
});

const lyr_noise_road_ln = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",  // L'URL de ton GeoServer
    params: {
      'LAYERS': 'green_brussels:noise_road_ln',
      'STYLES': '',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'true',
      'VERSION': '1.1.0',
      'SRS': 'EPSG:3857'
    },
    serverType: 'geoserver'
  }),
  leg: 'leg_noise',
  title: 'Trafic routier (ln)',
  opacity: 1.000000,
});

