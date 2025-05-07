var size = 0;
var placement = 'point';

var style_blue_points = function(feature, resolution) {
    var context = {
        feature: feature,
        variables: {}
    };

    var labelText = "";  // Pas de label pour ces points (tu peux l'ajouter si besoin)
    var value = feature.get("");  // Si tu souhaites utiliser une propriété spécifique de la feature
    var labelFont = "10px, sans-serif";  // Style de la police (si nécessaire)
    var labelFill = "#000000";  // Couleur du texte (noir, mais pas utilisé ici)
    var bufferColor = "";  // Pas de fond de texte (pas utilisé ici)
    var bufferWidth = 0;  // Pas de contour autour du texte (pas utilisé ici)
    var textAlign = "left";  // Alignement du texte (pas utilisé ici)
    var offsetX = 0;  // Décalage horizontal du texte (pas utilisé ici)
    var offsetY = 0;  // Décalage vertical du texte (pas utilisé ici)

    // Création du style pour les points
    var style = [new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,  // Taille du cercle (ajuste si nécessaire)
            fill: new ol.style.Fill({
                color: 'rgba(33, 64, 155,1)'// Couleur du cercle
            }),
            stroke: new ol.style.Stroke({
                color: 'white',  // Bordure blanche
                width: 2  // Largeur de la bordure
            })
        }),
        text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth)
    })];

    return style;
};