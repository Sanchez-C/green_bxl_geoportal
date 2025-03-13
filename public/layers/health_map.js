wms_layers.push([lyr_noise_road_ln, 0]);
var lyr_health_air = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:health_air",
      "TILED": "true",
      "SRS": "EPSG:3857",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_health',
  title: 'Santé - Pollution de l\'air',
  opacity: 1.000000,
});
wms_layers.push([lyr_health_air, 0]);


var lyr_health_heat = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:health_heat",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_health',
  title: 'Santé - Stress thermique',
  opacity: 1.000000,
});
wms_layers.push([lyr_health_heat, 0]);

var lyr_health_multi = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:health_multi",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_health',
  title: 'Santé - Multi exposition',
  opacity: 1.000000,
});
wms_layers.push([lyr_health_multi, 0]);

var lyr_health_noise = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:health_noise",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_health',
  title: 'Santé - Pollution sonore',
  opacity: 1.000000,
});
wms_layers.push([lyr_health_noise, 0]);

var lyr_heat_islands = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    attributions: ' ',
    params: {
      "LAYERS": "green_brussels:heat_islands",
      "TILED": "true",
      "VERSION": "1.3.0"},
  }),
  leg: 'leg_heat_islands',
  title: 'Ilot de chaleur urbains',
  opacity: 1.000000,
});
wms_layers.push([lyr_heat_islands, 0]);