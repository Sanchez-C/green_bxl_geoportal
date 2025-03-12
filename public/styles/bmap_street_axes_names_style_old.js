var style_bmap_street_axes_names = function(feature, resolution) {

    // Zoom min et max de la couche
    var minZoom = 16;
    var maxZoom = 20;
    var zoom = map.getView().getZoom();
    if (zoom < minZoom || zoom > maxZoom) {
        return []; // Masquer la couche si en dehors des limites
    }

    // Taille du texte dynamique selon l'échelle
    var fontSize = Math.max(8, Math.min(12, zoom/0.4));

    // Définition du texte à afficher (nom de la rue)
    var labelText = feature.get("name_fr") || "";

    var style = [
        // Style pour la ligne (routes)
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 255, 255, 0)', // Blanc
                width: 1,
                lineCap: 'square',
                lineJoin: 'bevel'
            })
        }),
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
    ];

    return style;
};
