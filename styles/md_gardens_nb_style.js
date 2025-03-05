var style_md_gardens_nb = function(feature) {
    var attributeValue = feature.get('gardens_nb'); // Remplace par ton attribut
    var minSize = 5;  // Rayon minimum
    var maxSize = 20; // Rayon maximum
    var scaleFactor = 0.008; // Ajuste selon tes valeurs

    // Calcul de la taille proportionnelle
    var radius = Math.max(minSize, Math.min(maxSize, attributeValue * scaleFactor));

    // Calcul du centroïde du polygone
    var centroid = ol.extent.getCenter(feature.getGeometry().getExtent());

    var polygonStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: 'rgba(100,100,100,1)', // Contour noir
          width: 1
      }),
      fill: new ol.style.Fill({
          color: 'rgba(170, 170, 170, 0)' // Gris transparent
      })
    });

    // Créer un style avec un cercle sur le centroïde
    var circleStyle = new ol.style.Style({
        geometry: new ol.geom.Point(centroid), // Appliquer le style au centroïde
        image: new ol.style.Circle({
            radius: radius,
            fill: new ol.style.Fill({
                color: 'rgba(46, 166, 82, 0.4)' // Vert semi-transparent
            }),
            stroke: new ol.style.Stroke({
                color: 'rgb(28, 75, 42)',
                width: 1
            })
        })
    });
  return [polygonStyle, circleStyle]
};