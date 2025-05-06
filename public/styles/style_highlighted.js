function HighlightedStyle() {
  return new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#ff6600',
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,102,0,0.2)'
    })
  });
}

var highlight_style = HighlightedStyle()