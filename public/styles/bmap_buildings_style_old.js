

var style_bmap_buildings = function(feature, resolution){

    // Zoom min et max de la couche
    var minZoom = 15;
    var maxZoom = 20;
    var zoom = map.getView().getZoom();
    if (zoom < minZoom || zoom > maxZoom) {
        return []; // Masquer la couche si en dehors des limites
    }

    // Définition du style des bâtiments (remplissage gris)
    var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(127,127,127,1.0)'}),
    });

    return [style];
};
