const lyr_noise_multi_lden = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:noise_multi_lden",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_noise',
  title: 'Bruit - Multi exposition (lden)',
  opacity: 1.000000,
});
wms_layers.push([lyr_noise_multi_lden, 0]);

const lyr_noise_multi_ln = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:noise_multi_ln",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_noise',
  title: 'Bruit - Multi exposition (ln)',
  opacity: 1.000000,
});
wms_layers.push([lyr_noise_multi_ln, 0]);

const lyr_noise_road_lden = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:noise_road_lden",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_noise',
  title: 'Bruit - Trafic routier (lden)',
  opacity: 1.000000,
});
wms_layers.push([lyr_noise_road_lden, 0]);

const lyr_noise_road_ln = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:noise_road_ln",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_noise',
  title: 'Bruit - Trafic routier (ln)',
  opacity: 1.000000,
});
wms_layers.push([lyr_noise_road_ln, 0]);
