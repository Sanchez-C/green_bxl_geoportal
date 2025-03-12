

var style_bmap_addresses = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    // Zoom min et max de la couche
    var minZoom = 17;
    var maxZoom = 20;
    var zoom = map.getView().getZoom();
    if (zoom < minZoom || zoom > maxZoom) {
        return []; // Masquer la couche si en dehors des limites
    }

    // Taille du texte dynamique selon l'échelle
    var fontSize = Math.max(8, Math.min(12, zoom/1.5));

    // Définition du texte à afficher (nom de la rue)
    var labelText = feature.get("house_nb") || "";

    // Style pour les étiquettes (noms de rue)
    new ol.style.Style({
        text: new ol.style.Text({
            font: fontSize + 'px Arial, sans-serif',
            text: labelText,
            placement: 'line',
            fill: new ol.style.Fill({ color: '#323232' }), // Noir
            stroke: new ol.style.Stroke({ color: '#fafafa', width: 2 }), // Halo blanc
            maxAngle: 25 * Math.PI / 180, // maxAngleDelta (converti en radians)
            overflow: true,
        })
    })

    var style = [ new ol.style.Style({
        text: new ol.style.Text({
            font: fontSize + "px 'Arial', sans-serif",
            text: labelText,
            fill: new ol.style.Fill({ color: "#323232" }),
            stroke: new ol.style.Stroke({ color: "#fafafa", width: 1.0 }),
            textAlign: "center",
            offsetX: 0,
            offsetY: 0,
            placement: 'point'
        })
    })];

    return style;
};
