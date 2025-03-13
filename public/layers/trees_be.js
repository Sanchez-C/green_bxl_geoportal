var useAPI = false; // false = WFS (prioritaire), true = API (fallback)

// Source WFS
var trees_wfsSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0&request=GetFeature" +
               "&typeName=green_brussels:trees_be&outputFormat=application/json&srsname=EPSG:3857&bbox=" +
               extent.join(',') + ',EPSG:3857';
    },
    strategy: ol.loadingstrategy.bbox
});

// Source API
var trees_apiSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: "https://green-brussels.onrender.com/api/trees_be", // URL de l'API
    strategy: ol.loadingstrategy.all
});

// Cluster
var cluster_trees_be = new ol.source.Cluster({
    distance: 30,
    source: trees_wfsSource // On commence avec WFS
});

// Couche des arbres
var lyr_trees_be = new ol.layer.Vector({
    declutter: false,
    source: cluster_trees_be,
    style: style_trees_be,
    leg: 'leg_trees',
    popuplayertitle: 'Arbre',
    interactive: true,
    title: 'Arbres gérés par Bruxelles Environnement',
    display: 'always_on'
});

// Vérifier si WFS charge correctement, sinon fallback vers API
trees_wfsSource.once('featuresloaderror', function() {
    console.warn("WFS indisponible, bascule sur l'API...");
    switchTreeSource(true);
});

// Fonction pour switcher entre API et WFS
function switchTreeSource(forceAPI = false) {
    useAPI = forceAPI || !useAPI; // Fallback vers API si forceAPI = true
    cluster_trees_be.setSource(useAPI ? trees_apiSource : trees_wfsSource);
    console.log("Source des arbres changée :", useAPI ? "API" : "WFS");
}