let wmsUrl = serviceUrl + "/geoserver/wms";
const fallbackWmsUrl = localUrl + "/geoserver/wms";

// === SOURCES ===
const source_urbis_base_map = new ol.source.TileWMS({
  url: 'https://geoservices-urbis.irisnet.be/geoserver/BaseMaps/ows?request=GetCapabilities&service=WMS',
  params: {
    'LAYERS': 'UrbISFrenchLabeledColor',
    'TILED': true,
    'VERSION': '1.3.0',
    'FORMAT': 'image/png',
    'TRANSPARENT': true
  },
  serverType: 'geoserver'
});

const source_base_map = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:base_map',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_health_air = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:health_air',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_health_heat = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:health_heat',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_health_multi = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:health_multi',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_health_noise = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:health_noise',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_heat_islands = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:heat_islands',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_noise_multi_lden = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:noise_multi_lden',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_noise_multi_ln = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:noise_multi_ln',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_noise_road_lden = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:noise_road_lden',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

const source_noise_road_ln = new ol.source.TileWMS({
  url: wmsUrl,
  params: {
    'LAYERS': 'green_brussels:noise_road_ln',
    'STYLES': '',
    'FORMAT': 'image/png',
    'TRANSPARENT': 'true',
    'VERSION': '1.1.0',
    'SRS': 'EPSG:3857'
  },
  serverType: 'geoserver'
});

// === COUCHES ===
const lyr_osm = new ol.layer.Tile({
  source: new ol.source.OSM(),
  bmaptitle: 'OSM',
  display: 'always_on',
  isBaseMap: true,
  opacity: 1.0
});

const lyr_urbis_base_map = new ol.layer.Tile({
  source: source_urbis_base_map,
  bmaptitle: 'Urbis',
  display: 'always_on',
  isBaseMap: true,
  opacity: 1.0
});

const lyr_base_map = new ol.layer.Tile({
  source: source_base_map,
  leg: 'leg_public_green_spaces',
  bmaptitle: 'Fond de carte',
  display: 'always_on',
  isBaseMap: true,
  opacity: 1.0
});

const lyr_health_air = new ol.layer.Tile({
  source: source_health_air,
  leg: 'leg_health',
  title: 'Pollution de l\'air',
  opacity: 1.0
});

const lyr_health_heat = new ol.layer.Tile({
  source: source_health_heat,
  leg: 'leg_health',
  title: 'Stress thermique',
  opacity: 1.0
});

const lyr_health_multi = new ol.layer.Tile({
  source: source_health_multi,
  leg: 'leg_health',
  title: 'Multi exposition',
  opacity: 1.0
});

const lyr_health_noise = new ol.layer.Tile({
  source: source_health_noise,
  leg: 'leg_health',
  title: 'Pollution sonore',
  opacity: 1.0
});

const lyr_heat_islands = new ol.layer.Tile({
  source: source_heat_islands,
  leg: 'leg_heat_islands',
  title: 'Ilot de chaleur urbains',
  opacity: 1.0
});

const lyr_noise_multi_lden = new ol.layer.Tile({
  source: source_noise_multi_lden,
  leg: 'leg_noise',
  title: 'Multi exposition (lden)',
  opacity: 1.0
});

const lyr_noise_multi_ln = new ol.layer.Tile({
  source: source_noise_multi_ln,
  leg: 'leg_noise',
  title: 'Multi exposition (ln)',
  opacity: 1.0
});

const lyr_noise_road_lden = new ol.layer.Tile({
  source: source_noise_road_lden,
  leg: 'leg_noise',
  title: 'Trafic routier (lden)',
  opacity: 1.0
});

const lyr_noise_road_ln = new ol.layer.Tile({
  source: source_noise_road_ln,
  leg: 'leg_noise',
  title: 'Trafic routier (ln)',
  opacity: 1.0
});

// === Vérification de la disponibilité du WMS distant ===
fetch(wmsUrl + '?service=WMS&request=GetCapabilities', { method: 'HEAD' })
  .then(response => {
    if (!response.ok) {
      console.warn('WMS distant indisponible, fallback local.');
      wmsUrl = fallbackWmsUrl;
      updateWmsSources();
    }
  })
  .catch(() => {
    console.warn('Erreur de connexion au WMS distant, fallback local.');
    wmsUrl = fallbackWmsUrl;
    updateWmsSources();
  });

const controller = new AbortController();
const signal = controller.signal;
const timeout = 0; // Timeout en millisecondes

const timeoutId = setTimeout(() => {
  controller.abort();
}, timeout);

// === Vérification de la disponibilité du WMS distant avec timeout ===
fetch(wmsUrl, { method: 'HEAD', signal })
  .then(response => {
    clearTimeout(timeoutId); // Nettoyer le timeout si la requête réussit
    if (!response.ok) {
      console.warn('WMS distant indisponible (code non OK), fallback local.');
      wmsUrl = fallbackWmsUrl;
      updateWmsSources();
    } else {
      console.log('WMS distant disponible.');
    }
  })
  .catch(error => {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn('Timeout WMS distant, fallback local.');
    } else {
      console.warn('Erreur de connexion au WMS distant, fallback local.');
    }
    wmsUrl = fallbackWmsUrl;
    updateWmsSources();
  });

// === Mise à jour des URLs dans les sources ===
function updateWmsSources() {
  source_base_map.setUrl(wmsUrl);
  source_health_air.setUrl(wmsUrl);
  source_health_heat.setUrl(wmsUrl);
  source_health_multi.setUrl(wmsUrl);
  source_health_noise.setUrl(wmsUrl);
  source_heat_islands.setUrl(wmsUrl);
  source_noise_multi_lden.setUrl(wmsUrl);
  source_noise_multi_ln.setUrl(wmsUrl);
  source_noise_road_lden.setUrl(wmsUrl);
  source_noise_road_ln.setUrl(wmsUrl);
}
