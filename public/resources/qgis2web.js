var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
        projection: 'EPSG:3857',
        maxZoom: 20, minZoom: 11
    })
});

//initial view - epsg:3857 coordinates if not "Match project CRS"
map.getView().fit([472385.988109, 6579486.289370, 499022.735602, 6606078.911337], {size: map.getSize(), padding: [10, 10, 10, 10]});

////small screen definition
    var hasTouchScreen = map.getViewport().classList.contains('ol-touch');
    var isSmallScreen = window.innerWidth < 650;

////controls container

    //top left container
    var topLeftContainer = new ol.control.Control({
        element: (() => {
            var topLeftContainer = document.createElement('div');
            topLeftContainer.id = 'top-left-container';
            return topLeftContainer;
        })(),
    });
    map.addControl(topLeftContainer)

    //bottom left container
    var bottomLeftContainer = new ol.control.Control({
        element: (() => {
            var bottomLeftContainer = document.createElement('div');
            bottomLeftContainer.id = 'bottom-left-container';
            return bottomLeftContainer;
        })(),
    });
    map.addControl(bottomLeftContainer)
  
    //top right container
    var topRightContainer = new ol.control.Control({
        element: (() => {
            var topRightContainer = document.createElement('div');
            topRightContainer.id = 'top-right-container';
            return topRightContainer;
        })(),
    });
    map.addControl(topRightContainer)

    //bottom right container
    var bottomRightContainer = new ol.control.Control({
        element: (() => {
            var bottomRightContainer = document.createElement('div');
            bottomRightContainer.id = 'bottom-right-container';
            return bottomRightContainer;
        })(),
    });
    map.addControl(bottomRightContainer)

//full screen button
const fullscreenBtn = document.getElementById('fullscreen-btn');
const bodyContainer = document.querySelector('body');

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        bodyContainer.requestFullscreen().catch(err => {
            console.error(`Erreur en entrant en plein écran : ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

// Changer l'icône dynamiquement
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenBtn.textContent = '🗗'; // Icône "réduire"
        fullscreenBtn.title = "Quitter le plein écran";
    } else {
        fullscreenBtn.textContent = '⛶'; // Icône "plein écran"
        fullscreenBtn.title = "Plein écran";
    }
});


//popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});
map.addOverlay(overlayPopup)
    
    
var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

//highligth collection
var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = true;
var doHover = true;

function createPopupField(currentFeature, currentFeatureKeys, layer) {
    var popupText = '';
    for (var i = 0; i < currentFeatureKeys.length; i++) {
        if (currentFeatureKeys[i] != 'geometry') {
            var popupField = '';
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "hidden field") {
                continue;
            } else if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - visible with data") {
                if (currentFeature.get(currentFeatureKeys[i]) == null) {
                    continue;
                }
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - always visible" ||
                layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - visible with data") {
                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + '</th><td>';
            } else {
                popupField += '<td colspan="2">';
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - visible with data") {
                if (currentFeature.get(currentFeatureKeys[i]) == null) {
                    continue;
                }
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - always visible" ||
                layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - visible with data") {
                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + '</strong><br />';
            }
            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "ExternalResource") {
				popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? autolinker.link(currentFeature.get(currentFeatureKeys[i]).toLocaleString()) + '</td>' : '');
			} else {
				var fieldValue = currentFeature.get(currentFeatureKeys[i]);
				if (/\.(gif|jpg|jpeg|tif|tiff|png|avif|webp|svg)$/i.test(fieldValue)) {
					popupField += (fieldValue != null ? '<img src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" /></td>' : '');
				} else if (/\.(mp4|webm|ogg|avi|mov|flv)$/i.test(fieldValue)) {
					popupField += (fieldValue != null ? '<video controls><source src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" type="video/mp4">Il tuo browser non supporta il tag video.</video></td>' : '');
				} else {
					popupField += (fieldValue != null ? autolinker.link(fieldValue.toLocaleString()) + '</td>' : '');
				}
			}
            popupText += '<tr>' + popupField + '</tr>';
        }
    }
    return popupText;
}

var highlight;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});


//Style for each layer hover

function getHoverStyle(layerName, geometryType, clusterSize = 0) {
    var styles = {
        'blueHover': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.2)'
            })
        }),
        'greenHover': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 255, 0, 0)'
            })
        }),
        'orangeHover': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ff6600',
                width: 4
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,102,0,0.2)'
            })
        }),
        'default': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'yellow',
                width: 3
            }),
        })
    };

    if (geometryType === 'Point' || geometryType === 'MultiPoint') {
        return new ol.style.Style({
            image: new ol.style.Circle({
                stroke: new ol.style.Stroke({
                    color: 'green',
                    width: 2
                }),
                radius: 7
            })
        });
    } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: styles[layerName] ? styles[layerName].getStroke().getColor() : '#ffff00',
                lineDash: null,
                width: 3
            })
        });
    } else {
        return styles[layerName] || styles['default'];
    }
}

function onPointerMove(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var clusterLength;
    var popupText = '<ul>';
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive"))) {
            var doPopup = false;
            for (k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] != "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            currentLayer = layer;
            clusteredFeatures = feature.get("features");
            if (clusteredFeatures) {
				clusterLength = clusteredFeatures.length;
			}
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    for(var n=0; n<clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table>'
                        popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
                        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';    
                    }
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText += '<li><table>';
                    popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table></li>';
                }
            }
        }
    });
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
    
    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var layerName = currentLayer.get('hoverStyle'); // Récupère le nom de la couche
                var geometryType = currentFeature.getGeometry().getType();
                var clusterSize = clusteredFeatures ? clusteredFeatures.length : 0;
                highlightStyle = getHoverStyle(layerName, geometryType, clusterSize);
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
            content.innerHTML = popupText;
            container.style.display = 'block';        
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

map.on('pointermove', onPointerMove);

var popupContent = '';
var popupCoord = null;
var featuresPopupActive = false;

function updatePopup() {
    if (popupContent) {
        overlayPopup.setPosition(popupCoord);
        content.innerHTML = popupContent;
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
        closer.blur();
    }
} 

// Désactiver les événements de la souris sur le pop-up pour éviter qu'il bloque les interactions (zoom et pan)
container.style.pointerEvents = 'none';

function onSingleClickFeatures(evt) {
    if (doHover || sketch) {
        return;
    }
    if (!featuresPopupActive) {
        featuresPopupActive = true;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            var doPopup = false;
            for (var k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] !== "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            clusteredFeatures = feature.get("features");
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    for(var n = 0; n < clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table>';
                        popupText += '<a><b>' + layer.get('popuplayertitle') + '</b></a>';
                        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';    
                    }
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText += '<li><table>';
                    popupText += '<a><b>' + layer.get('popuplayertitle') + '</b></a>';
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table>';
                }
            }
        }
    });
    if (popupText === '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
	
	popupContent = popupText;
    popupCoord = coord;
    updatePopup();
}

function onSingleClickWMS(evt) {
    if (doHover || sketch) {
        return;
    }
	if (!featuresPopupActive) {
		popupContent = '';
	}
    var coord = evt.coordinate;
    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();

    for (var i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1] && wms_layers[i][0].getVisible()) {
            var url = wms_layers[i][0].getSource().getFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection, {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {				
                const wmsTitle = wms_layers[i][0].get('popuplayertitle');					
                var ldsRoller = '<div id="lds-roller"><img class="lds-roller-img" style="height: 25px; width: 25px;"></img></div>';
				
                popupCoord = coord;
				popupContent += ldsRoller;
                updatePopup();

                var timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('Timeout exceeded'));
                    }, 5000); // (5 second)
                });

                Promise.race([
                    fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url)),
                    timeoutPromise
                ])
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    }
                })
                .then((html) => {
                    if (html.indexOf('<table') !== -1) {
                        popupContent += '<a><b>' + wmsTitle + '</b></a>';
                        popupContent += html + '<p></p>';
                        updatePopup();
                    }
                })
                // .catch((error) => {
				// })
                .finally(() => {
                    setTimeout(() => {
                        var loaderIcon = document.querySelector('#lds-roller');
						loaderIcon.remove();
                    }, 500); // (0.5 second)	
                });
            }
        }
    }
}

map.on('singleclick', onSingleClickFeatures);
map.on('singleclick', onSingleClickWMS);

//get container
var topLeftContainerDiv = document.getElementById('top-left-container')
var bottomLeftContainerDiv = document.getElementById('bottom-left-container')
var bottomRightContainerDiv = document.getElementById('bottom-right-container')

//title

//abstract


//geolocate

isTracking = false;
var geolocateControl = (function (Control) {
    geolocateControl = function(opt_options) {
        var options = opt_options || {};
        var button = document.createElement('button');
        button.className += ' fa fa-map-marker';
        var handleGeolocate = function() {
            if (isTracking) {
                map.removeLayer(geolocateOverlay);
                isTracking = false;
          } else if (geolocation.getTracking()) {
                map.addLayer(geolocateOverlay);
                map.getView().setCenter(geolocation.getPosition());
                isTracking = true;
          }
        };
        button.addEventListener('click', handleGeolocate, false);
        button.addEventListener('touchstart', handleGeolocate, false);
        var element = document.createElement('div');
        element.className = 'geolocate ol-unselectable ol-control';
        element.appendChild(button);
        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });
    };
    if (Control) geolocateControl.__proto__ = Control;
    geolocateControl.prototype = Object.create(Control && Control.prototype);
    geolocateControl.prototype.constructor = geolocateControl;
    return geolocateControl;
}(ol.control.Control));
map.addControl(new geolocateControl())

      var geolocation = new ol.Geolocation({
  projection: map.getView().getProjection()
});


var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function() {
  var coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ?
      new ol.geom.Point(coordinates) : null);
});

var geolocateOverlay = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  })
});

geolocation.setTracking(true);


//measurement

var measuring = false;
var measureControl = (function (Control) {
    measureControl = function(opt_options) {

      var options = opt_options || {};

      var measurebutton = document.createElement('button');
      measurebutton.className += ' fas fa-ruler ';

      var this_ = this;
      var handleMeasure = function(e) {
        if (!measuring) {
            selectLabel.style.display = "";
            this_.getMap().addInteraction(draw);
            createHelpTooltip();
            createMeasureTooltip();
            measuring = true;
        } else {
            selectLabel.style.display = "none";
            this_.getMap().removeInteraction(draw);
            measuring = false;
            this_.getMap().removeOverlay(helpTooltip);
            this_.getMap().removeOverlay(measureTooltip);
            var staticTooltip = document.getElementsByClassName("tooltip-static");
                while (staticTooltip.length > 0) {
                  staticTooltip[0].parentNode.removeChild(staticTooltip[0]);
                }
            measureLayer.getSource().clear();
            sketch = null;
        }
      };

      measurebutton.addEventListener('click', handleMeasure, false);
      measurebutton.addEventListener('touchstart', handleMeasure, false);

      measurebutton.addEventListener("click", () => {
          measurebutton.classList.toggle("clicked");
        });

      var element = document.createElement('div');
      element.className = 'measure-control ol-unselectable ol-control';
      element.appendChild(measurebutton);

      ol.control.Control.call(this, {
        element: element,
        target: options.target
      });

    };
    if (Control) measureControl.__proto__ = Control;
    measureControl.prototype = Object.create(Control && Control.prototype);
    measureControl.prototype.constructor = measureControl;
    return measureControl;
    }(ol.control.Control));
    map.addControl(new measureControl())

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        if (measuring) {
            /** @type {string} */
            var helpMsg = 'Click to start drawing';
            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }
            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);
        }
    });
    

    var measureControl = document.querySelector(".measure-control");

    var selectLabel = document.createElement("label");
    selectLabel.innerHTML = "&nbsp;Measure:&nbsp;";

    var typeSelect = document.createElement("select");
    typeSelect.id = "type";

    var measurementOption = [
        { value: "LineString", description: "Length" },
        { value: "Polygon", description: "Area" }
        ];
    measurementOption.forEach(function (option) {
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.text = option.description;
        typeSelect.appendChild(optionElement);
    });

    selectLabel.appendChild(typeSelect);
    measureControl.appendChild(selectLabel);

    selectLabel.style.display = "none";
/**
 * Currently drawn feature.
 * @type {ol.Feature}
 */

/**
 * The help tooltip element.
 * @type {Element}
 */
var helpTooltipElement;


/**
 * Overlay to show the help messages.
 * @type {ol.Overlay}
 */
var helpTooltip;


/**
 * The measure tooltip element.
 * @type {Element}
 */
var measureTooltipElement;


/**
 * Overlay to show the measurement.
 * @type {ol.Overlay}
 */
var measureTooltip;


/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = 'Click to continue drawing the line';



/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
var continuePolygonMsg = "1click continue, 2click close";


var typeSelect = document.getElementById("type");
var typeSelectForm = document.getElementById("form_measure");

typeSelect.onchange = function (e) {		  
  map.removeInteraction(draw);
  addInteraction();
  map.addInteraction(draw);		  
};

var measureLineStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
	color: "rgba(0, 0, 255)", //blu
	lineDash: [10, 10],
	width: 4
  }),
  image: new ol.style.Circle({
	radius: 6,
	stroke: new ol.style.Stroke({
	  color: "rgba(255, 255, 255)", 
	  width: 1
	}),
  })
});

var measureLineStyle2 = new ol.style.Style({	  
	stroke: new ol.style.Stroke({
		color: "rgba(255, 255, 255)", 
		lineDash: [10, 10],
		width: 2
	  }),
  image: new ol.style.Circle({
	radius: 5,
	stroke: new ol.style.Stroke({
	  color: "rgba(0, 0, 255)", 
	  width: 1
	}),
		  fill: new ol.style.Fill({
	  color: "rgba(255, 204, 51, 0.4)", 
	}),
	  })
});

var labelStyle = new ol.style.Style({
  text: new ol.style.Text({
	font: "14px Calibri,sans-serif",
	fill: new ol.style.Fill({
	  color: "rgba(0, 0, 0, 1)"
	}),
	stroke: new ol.style.Stroke({
	  color: "rgba(255, 255, 255, 1)",
	  width: 3
	})
  })
});

var labelStyleCache = [];

var styleFunction = function (feature, type) {
  var styles = [measureLineStyle, measureLineStyle2];
  var geometry = feature.getGeometry();
  var type = geometry.getType();
  var lineString;
  if (!type || type === type) {
	if (type === "Polygon") {
	  lineString = new ol.geom.LineString(geometry.getCoordinates()[0]);
	} else if (type === "LineString") {
	  lineString = geometry;
	}
  }
  if (lineString) {
	var count = 0;
	lineString.forEachSegment(function (a, b) {
	  var segment = new ol.geom.LineString([a, b]);
	  var label = formatLength(segment);
	  if (labelStyleCache.length - 1 < count) {
		labelStyleCache.push(labelStyle.clone());
	  }
	  labelStyleCache[count].setGeometry(segment);
	  labelStyleCache[count].getText().setText(label);
	  styles.push(labelStyleCache[count]);
	  count++;
	});
  }
  return styles;
};
var source = new ol.source.Vector();

var measureLayer = new ol.layer.Vector({
  source: source,
  displayInLayerSwitcher: false,
  style: function (feature) {
	labelStyleCache = [];
	return styleFunction(feature);
  }
});

map.addLayer(measureLayer);

var draw; // global so we can remove it later
function addInteraction() {
  var type = typeSelect.value;
  draw = new ol.interaction.Draw({
    source: source,
    type: /** @type {ol.geom.GeometryType} */ (type),
	style: function (feature) {
			  return styleFunction(feature, type);
			}
  });

  var listener;
  draw.on('drawstart',
      function(evt) {
        // set sketch
        sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function(evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof ol.geom.Polygon) {
				  output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
				  tooltipCoord = geom.getInteriorPoint().getCoordinates();
				} else if (geom instanceof ol.geom.LineString) {
				  output = formatLength(/** @type {ol.geom.LineString} */ (geom));
				  tooltipCoord = geom.getLastCoordinate();
				}
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      }, this);

  draw.on('drawend',
      function(evt) {
        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        ol.Observable.unByKey(listener);
      }, this);
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'tooltip tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}

/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
 */
var formatLength = function(line) {
  var length;
  var coordinates = line.getCoordinates();
  length = 0;
  var sourceProj = map.getView().getProjection();
  for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
      var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
      length += ol.sphere.getDistance(c1, c2);
    }
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};

/**
 * Format area output.
 * @param {ol.geom.Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function (polygon) {
  var area = polygon.getArea();
  var output;
  if (area > 1000000) {
	output =
	  Math.round((area / 1000000) * 1000) / 1000 + " " + "km<sup>2</sup>";
  } else {
	output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
  }
  return output;
};

addInteraction();

var parentElement = document.querySelector(".measure-control");
var elementToMove = document.getElementById("form_measure");
if (elementToMove && parentElement) {
  parentElement.insertBefore(elementToMove, parentElement.firstChild);
}


//geocoder

var geocoder = new Geocoder('nominatim', {
  provider: 'osm',
  lang: 'en-US',
  placeholder: 'Search place or address ...',
  limit: 5,
  keepOpen: true,
});
map.addControl(geocoder);
document.getElementsByClassName('gcd-gl-btn')[0].className += ' fa fa-search';

// Modifier le zoom après sélection d'une adresse
geocoder.on('addresschosen', function(evt) {
    var coord = evt.coordinate;
    var view = map.getView();
    var buffer = 500; // Ajuste la valeur pour contrôler la zone affichée autour du point
    var extent = ol.extent.buffer(
        ol.extent.boundingExtent([coord]), 
        buffer
    );
    view.fit(extent, { duration: 1000 }); // Animation fluide vers la zone
});

//layer search

var searchLayer = new SearchLayer({
    layer: lyr_public_green_spaces,
    colName: 'pgs_name_fr',
    zoom: 10,
    collapsed: true,
    map: map
});
map.addControl(searchLayer);
document.getElementsByClassName('search-layer')[0].getElementsByTagName('button')[0].className += ' fa fa-binoculars';
document.getElementsByClassName('search-layer-input-search')[0].placeholder = 'Search feature ...';

// Reset View Control personnalisé
var ResetViewControl = (function(Control) {
    function ResetViewControl(optOptions) {
      var options = optOptions || {};
      options.map = optOptions.map;
  
      var button = document.createElement('button');
      button.setAttribute('type', 'button'); // important pour ne pas soumettre les formulaires
      button.title = 'Réinitialiser la vue';
      addClass(button, 'fa');
      addClass(button, 'fa-rotate'); // Icône Font Awesome pour "home"
  
      var resetView = function () {
        options.map.getView().animate({
          center: options.center,
          zoom: options.zoom,
          duration: 500
        });
      };
  
      button.addEventListener('click', resetView, false);
      button.addEventListener('touchstart', resetView, false);
  
      var element = document.createElement('div');
      element.className = 'reset-view ol-unselectable ol-control';
      element.appendChild(button);
  
      Control.call(this, {
        element: element,
        target: options.target
      });
    }
  
    if (Control) ResetViewControl.__proto__ = Control;
    ResetViewControl.prototype = Object.create(Control && Control.prototype);
    ResetViewControl.prototype.constructor = ResetViewControl;
  
    return ResetViewControl;
}(ol.control.Control));

// Exemple : recentrage sur Bruxelles
var resetControl = new ResetViewControl({
    map: map,
    center: ol.proj.fromLonLat([4.35, 50.84]),
    zoom: 11.5
  });

map.addControl(resetControl);


//Navbar

const menuToggle = document.querySelector('.menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

menuToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

//Legend

// Sidebar
const sidebar = document.getElementById('sidebar');
const toggleSidebarButton = document.getElementById('toggle-sidebar');
const toggleIcon = toggleSidebarButton.querySelector('i');

function adjustButtonPosition() {
    if (sidebar.classList.contains('open')) {
        const sidebarWidth = sidebar.offsetWidth; // Obtenir la largeur actuelle de la sidebar
        toggleSidebarButton.style.right = `${sidebarWidth}px`; // Positionner le bouton à la droite de la sidebar
    } else {
        toggleSidebarButton.style.right = '0px';
    }
}

// Fonction pour ouvrir/fermer la sidebar
function toggleSidebar() {
    sidebar.classList.toggle('open'); // Ajouter/retirer la classe "open"
    toggleSidebarButton.classList.toggle('open');
    // Modifier l'icône et le texte
    if (sidebar.classList.contains('open')) {
        toggleIcon.classList.replace('fa-caret-left', 'fa-caret-right'); // Change l'icône
        adjustButtonPosition(); // Ajuster la position du bouton quand la sidebar s'ouvre
    } else {
        toggleIcon.classList.replace('fa-caret-right', 'fa-caret-left');
        toggleSidebarButton.style.right = '0px'; // Réinitialiser la position du bouton quand la sidebar est fermée
    }
};

// Écouter les changements de taille de la sidebar (si tu souhaites un comportement réactif)
window.addEventListener('resize', adjustButtonPosition);

// Ajouter l'écouteur de clic pour le bouton
toggleSidebarButton.addEventListener('click', toggleSidebar);

// Créer un contrôle pour la légende
var legendControl = new ol.control.Control({
    element: document.getElementById('legend-container'),
    target: document.getElementById('sidebar')
});

// Ajouter ce contrôle à la carte
map.addControl(legendControl);

// Ajouter un tableau pour suivre les légendes déjà affichées
var displayedLegends = [];

// Fonction pour calculer le rayon proportionnel
function calculateCircleRadius(value, maxSize, minSize, scaleFactor) {
    // Calcul du rayon proportionnel en fonction des valeurs maximales et minimales
    return Math.max(minSize, Math.min(maxSize, value * scaleFactor));
}

function getAllLayers(layerGroup) {
    let layers = [];
    layerGroup.getLayers().forEach(layer => {
        if (layer instanceof ol.layer.Group) {
            layers = layers.concat(getAllLayers(layer)); // Récursion pour explorer les groupes
        } else {
            layers.push(layer);
        }
    });
    return layers;
}

// Fonction pour mettre à jour la légende en fonction de la couche active
function updateLegend(layer) {
    var legendDiv = document.getElementById('legend'); // On prend l'élément de légende dans la page
    if (!legendDiv) {
        return;
    }
    legendDiv.innerHTML = ''; // Réinitialiser la légende
    
    const values = [1, 1000, 1500, 2755]; // Plages d'exemple pour les valeurs (à adapter)
    const minSize = 5;  // Taille min du rayon
    const maxSize = 20; // Taille max du rayon
    const scaleFactor = 0.008; // Ajuste selon tes valeurs
    const allLayers = getAllLayers(map); // Récupérer toutes les couches (y compris dans les groupes)
    
    allLayers.forEach(function(layer) {
        if (layer.getVisible() && layer.get('leg')) {
            var legendKey = layer.get('leg'); // Récupérer l'identifiant de la légende
            var legendHTML = '';

            // Ajouter la légende en fonction de la couche
            switch (legendKey) {
                case 'leg_md_gardens_nb': // Créer des cercles pour chaque plage de valeur
                    legendHTML += `<h4>Nombre de jardins</h4>`;
                    values.forEach(value => {
                        const radius = calculateCircleRadius(value, maxSize, minSize, scaleFactor);
                        legendHTML += `<div class="leg_item">
                            <div style="width: ${radius * 2}px; height: ${radius * 2}px; border-radius: 50%; 
                                background-color: rgba(46, 166, 82, 0.4); border: 1px solid rgba(28, 75, 42); display: inline-block; 
                                margin-right: 10px; vertical-align: middle;">
                            </div>
                            <span style="vertical-align: middle;">${value}</span>
                        </div>`;
                    });
                    break;
                case 'leg_trees':
                    legendHTML = `
                        <h4>Arbres</h4>
                        <div class="leg_item"><img src="styles/legend/trees_be.png"/><p>Arbres</p></div>
                    `;
                    break;
                
                case 'leg_heat_islands':
                    legendHTML = `
                        <h4>Ilôts de chaleur</h4>
                        <div class="leg_item"><img src="styles/legend/heat_islands_0.png"/><p>1</p></div>
                        <div class="leg_item"><img src="styles/legend/heat_islands_1.png"/><p>25</p></div>
                        <div class="leg_item"><img src="styles/legend/heat_islands_2.png"/><p>50</p></div>
                        <div class="leg_item"><img src="styles/legend/heat_islands_3.png"/><p>74</p></div>
                        <div class="leg_item"><img src="styles/legend/heat_islands_4.png"/><p>98</p></div>
                    `;
                    break;
                case 'leg_health':
                    legendHTML = `
                        <h4>Indicateur de santé</h4>
                        <div class="leg_item"><img src="styles/legend/health_0.png"/><p>N/A</p></div>
                        <div class="leg_item"><img src="styles/legend/health_1.png"/><p>1</p></div>
                        <div class="leg_item"><img src="styles/legend/health_2.png"/><p>2</p></div>
                        <div class="leg_item"><img src="styles/legend/health_3.png"/><p>3</p></div>
                        <div class="leg_item"><img src="styles/legend/health_4.png"/><p>4</p></div>
                        <div class="leg_item"><img src="styles/legend/health_5.png"/><p>5</p></div>
                        <div class="leg_item"><img src="styles/legend/health_6.png"/><p>6</p></div>
                        <div class="leg_item"><img src="styles/legend/health_7.png"/><p>7</p></div>
                        <div class="leg_item"><img src="styles/legend/health_8.png"/><p>8</p></div>
                        <div class="leg_item"><img src="styles/legend/health_9.png"/><p>9</p></div>
                    `;
                    break;
                case 'leg_noise':
                    legendHTML = `
                        <h4>Bruit (db)</h4>
                        <div class="leg_item"><img src="styles/legend/noise_0.png"/><p>0-45</p></div>
                        <div class="leg_item"><img src="styles/legend/noise_1.png"/><p>45-50</p></div>
                        <div class="leg_item"><img src="styles/legend/noise_2.png"/><p>50-55</p></div>
                        <div class="leg_item"><img src="styles/legend/noise_3.png"/><p>55-60</p></div>
                        <div class="leg_item"><img src="styles/legend/noise_4.png"/><p>60-65</p></div>
                        <div class="leg_item"><img src="styles/legend/noise_5.png"/><p>65-70</p></div>
                        <div class="leg_item"><img src="styles/legend/noise_6.png"/><p>70-75</p></div>
                        <div class="leg_item"><img src="styles/legend/noise_7.png"/><p>> 75</p></div>
                    `;
                    break;
                case 'leg_public_green_spaces':
                    legendHTML = `
                        <h4>Espaces verts publics</h4>
                        <div class="leg_item"><img src="styles/legend/public_green_spaces_6.png"/><p>Parc et square</p></div>    
                        <div class="leg_item"><img src="styles/legend/public_green_spaces_1.png"/><p>Bois</p></div>               
                        <div class="leg_item"><img src="styles/legend/public_green_spaces_0.png"/><p>Associé à la voirie</p></div>
                        <div class="leg_item"><img src="styles/legend/public_green_spaces_2.png"/><p>Cimetière</p></div>
                        <div class="leg_item"><img src="styles/legend/public_green_spaces_3.png"/><p>Etang et berge en milieu urbain</p></div>
                        <div class="leg_item"><img src="styles/legend/public_green_spaces_5.png"/><p>Non-aménagé</p></div>
                        <div class="leg_item"><img src="styles/legend/public_green_spaces_4.png"/><p>N/A</p></div>
                    `;
                    break;
                case 'leg_md_road_occ_morning':
                    legendHTML = `
                        <h4>Occupation de la voirie - matin (%)</h4>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_morning_0.png"/><p>< 500m de routes</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_morning_1.png"/><p>21-34</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_morning_2.png"/><p>34-44</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_morning_3.png"/><p>44-53</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_morning_4.png"/><p>53-65</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_morning_5.png"/><p>65-87</p></div>
                    `;
                    break;
                case 'leg_md_road_occ_evening':
                    legendHTML = `
                        <h4>Occupation de la voirie - soir (%)</h4>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_evening_0.png"/><p>< 500m de routes</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_evening_1.png"/><p>21-34</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_evening_2.png"/><p>34-44</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_evening_3.png"/><p>44-53</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_evening_4.png"/><p>53-65</p></div>
                        <div class="leg_item"><img src="styles/legend/md_road_occ_evening_5.png"/><p>65-87</p></div>
                    `;
                    break;
                case 'leg_md_households_size':
                    legendHTML = `
                        <h4>Taille des ménages</h4>
                        <div class="leg_item"><img src="styles/legend/md_households_size_0.png"/><p>N/A ou < 5 ménages</p></div>
                        <div class="leg_item"><img src="styles/legend/md_households_size_1.png"/><p>1.4-1.8</p></div>
                        <div class="leg_item"><img src="styles/legend/md_households_size_2.png"/><p>1.8-2.1</p></div>
                        <div class="leg_item"><img src="styles/legend/md_households_size_3.png"/><p>2.1-2.4</p></div>
                        <div class="leg_item"><img src="styles/legend/md_households_size_4.png"/><p>2.4-2.7</p></div>
                        <div class="leg_item"><img src="styles/legend/md_households_size_5.png"/><p>2.7-3.6</p></div>
                    `;
                    break;
                case 'leg_md_densite':
                    legendHTML = `
                        <h4>Densité (hab / km²)</h4>
                        <div class="leg_item"><img src="styles/legend/md_densite_5.png"/><p>N/A</p></div>
                        <div class="leg_item"><img src="styles/legend/md_densite_0.png"/><p>0-3</p></div>
                        <div class="leg_item"><img src="styles/legend/md_densite_1.png"/><p>3-9</p></div>
                        <div class="leg_item"><img src="styles/legend/md_densite_2.png"/><p>9-15</p></div>
                        <div class="leg_item"><img src="styles/legend/md_densite_3.png"/><p>15-21</p></div>
                        <div class="leg_item"><img src="styles/legend/md_densite_4.png"/><p>21-35</p></div>
                    `;
                    break;
                case 'leg_md_noise_ln':
                    legendHTML = `
                        <h4>Bruit (db)</h4>
                        <div class="leg_item"><img src="styles/legend/md_noise_ln_0.png"/><p>41-45</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_ln_1.png"/><p>45-49</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_ln_2.png"/><p>49-53</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_ln_3.png"/><p>53-58</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_ln_4.png"/><p>58-64</p></div>
                    `;
                    break;
                case 'leg_md_noise_lden':
                    legendHTML = `
                        <h4>Bruit (db)</h4>
                        <div class="leg_item"><img src="styles/legend/md_noise_lden_0.png"/><p>49-54</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_lden_1.png"/><p>54-57</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_lden_2.png"/><p>57-60</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_lden_3.png"/><p>60-65</p></div>
                        <div class="leg_item"><img src="styles/legend/md_noise_lden_4.png"/><p>65-71</p></div>
                    `;
                    break;
                case 'leg_md_surfaces_veg':
                    legendHTML = `
                        <h4>Surfaces végétalisées (%)</h4>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_veg_0.png"/><p>4-21</p></div>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_veg_1.png"/><p>21-36</p></div>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_veg_2.png"/><p>36-53</p></div>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_veg_3.png"/><p>53-73</p></div>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_veg_4.png"/><p>73-97</p></div>
                    `;
                    break;
                case 'leg_md_surfaces_imp':
                    legendHTML = `
                        <h4>Surfaces imperméables (%)</h4>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_imp_0.png"/><p>2 -28</p></div>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_imp_1.png"/><p>28-53</p></div>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_imp_2.png"/><p>53-70</p></div>
                        <div class="leg_item"><img src="styles/legend/md_surfaces_imp_3.png"/><p>70-84</p></div>
                        <div class="leg_item"><img src="styles/legend/Md_surfaces_imp_4.png"/><p>84-99</p></div>
                    `;
                    break;
                case 'leg_md_green_spaces':
                    legendHTML = `
                        <h4>Accès aux espaces verts (%)</h4>
                        <div class="leg_item"><img src="styles/legend/md_green_spaces_5.png"/><p>N/A</p></div>
                        <div class="leg_item"><img src="styles/legend/md_green_spaces_0.png"/><p>4-41</p></div>
                        <div class="leg_item"><img src="styles/legend/md_green_spaces_1.png"/><p>41-64</p></div>
                        <div class="leg_item"><img src="styles/legend/md_green_spaces_2.png"/><p>64-78</p></div>
                        <div class="leg_item"><img src="styles/legend/md_green_spaces_3.png"/><p>78-92</p></div>
                        <div class="leg_item"><img src="styles/legend/md_green_spaces_4.png"/><p>92-100</p></div>
                    `;
                    break;
                case 'leg_md_gardens_rel':
                    legendHTML = `
                        <h4>Part de jardins privés (%)</h4>
                        <div class="leg_item"><img src="styles/legend/md_gardens_rel_0.png"/><p>< 30 ménages</p></div>
                        <div class="leg_item"><img src="styles/legend/md_gardens_rel_1.png"/><p>4-17</p></div>
                        <div class="leg_item"><img src="styles/legend/md_gardens_rel_2.png"/><p>17-30</p></div>
                        <div class="leg_item"><img src="styles/legend/md_gardens_rel_3.png"/><p>30-46</p></div>
                        <div class="leg_item"><img src="styles/legend/md_gardens_rel_4.png"/><p>46-67</p></div>
                        <div class="leg_item"><img src="styles/legend/md_gardens_rel_5.png"/><p>67-91</p></div>
                    `;
                    break;
                default:
                    legendHTML = "<p>Aucune légende disponible</p>";
            }

            // Ajouter la légende au conteneur
            legendDiv.innerHTML += legendHTML; // Utiliser += pour ajouter sans supprimer
        }
    });
}

// Ajouter un écouteur sur chaque couche pour détecter un changement de visibilité
getAllLayers(map).forEach(layer => {
    layer.on('change:visible', updateLegend);
});

// Initialiser la légende avec la première couche visible
updateLegend();

//Parc info pop up
let featureSurlignee = null;

document.getElementById('parcs-toggle').addEventListener('click', function () {
    const popup = document.getElementById('parcs-popup');
    const main = document.querySelector('main');
    popup.classList.add('show');
    main.classList.add('popup-open');
    map.updateSize(); // 👈 recalcul de la taille de la carte
});

// Accordéons des sections du pop up
function ajouterEvenementsAccordeon() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;

            // Fermer les autres sections + retirer classe active des autres headers
            document.querySelectorAll('.accordion-content').forEach(content => {
                if (content !== accordionContent) {
                    content.classList.remove('active');
                }
            });
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== this) {
                    h.classList.remove('active');
                }
            });

            // Toggle classe active sur l'élément cliqué (contenu + header)
            accordionContent.classList.toggle('active');
            this.classList.toggle('active');
        });
    });
}


async function afficherInfosParcs(urlsParcs, extent) {
    const popup = document.getElementById('parcs-popup');
    const tabsContainer = document.getElementById('tabs'); // Conteneur pour les onglets
    const content = document.getElementById('parcs-content'); // Conteneur pour les infos des parcs
    const main = document.querySelector('main');
    const toggleButton = document.getElementById('parcs-toggle'); // Le bouton à rendre visible/invisible
  
    tabsContainer.innerHTML = '';  // Vide les anciens onglets
    content.innerHTML = ''; // On vide le contenu précédent
    popup.classList.remove('show'); // Retire d’abord la classe pour relancer l’animation proprement
    
    let infosAjoutees = 0;
    let index = 0;
  
    for (const url of urlsParcs) {
      try {
        const response = await fetch(`/api/parc?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        console.log(data)
        if (
            data.titre || data.soustitre || data.a_propos ||
            data.image || data.infos_pratiques || data.amenagements
          ) {
            
            // Créer un onglet pour ce parc
            const tabButton = document.createElement('button');
            tabButton.classList.add('tab-btn');
            tabButton.textContent = data.titre || 'Parc inconnu';
            tabButton.onclick = (() => {
                const i = index;
                return () => afficherParc(i);
              })(); // IIFE pour capturer la bonne valeur
            tabsContainer.appendChild(tabButton);

            // Créer le contenu de l'onglet pour ce parc
            const parcContent = document.createElement('div');
            parcContent.classList.add('parc-info');

            function genererInfosPratiques(contenu) {
                if (!Array.isArray(contenu)) return '';
              
                return contenu.map(el => {
                  if (el.type === 'h3') {
                    return `<h3>${el.content}</h3>`;
                  } else if (el.type === 'p') {
                    return `<p>${el.content}</p>`;
                  } else if (el.type === 'ul') {
                    return `<ul>${el.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
                  }
                  return '';
                }).join('');
            }              

            // Fonction utilitaire pour associer une icône à un label
            function getIcon(label) {
            const lower = label.toLowerCase();
            if (lower.includes('toilette')) return 'fa-toilet';
            if (lower.includes('pique-nique') || lower.includes('table')) return 'fa-table';
            if (lower.includes('jeux')) return 'fa-child';
            if (lower.includes('sport')) return 'fa-futbol';
            if (lower.includes('fontaine')) return 'fa-tint';
            if (lower.includes('pmr') || lower.includes('mobilité réduite')) return 'fa-wheelchair';
            if (lower.includes('chien')) return 'fa-dog';
            if (lower.includes('horeca') || lower.includes('restauration')) return 'fa-utensils';
            if (lower.includes('banc')) return 'fa-couch';
            if (lower.includes('poubelle')) return 'fa-trash-alt';
            if (lower.includes('vélo') || lower.includes('cyclable')) return 'fa-bicycle';
            if (lower.includes('ponton')) return 'fa-water';
            return 'fa-leaf'; // Par défaut
            }

            // Génère la liste HTML des aménagements
            function genererListeAmenagements(amenagements, descriptions) {
                if (!Array.isArray(amenagements)) {
                    console.warn('Aménagements invalides :', amenagements);
                    return `<p>${amenagements || 'Non renseigné'}</p>`;
                }
            
                // Générer la liste des aménagements (icônes et textes)
                const listeAmenagements = amenagements.filter(am => am.type === 'icone' || am.type === 'texte').map(am => {
                    if (am.type === 'icone') {
                        const icon = getIcon(am.label);
                        return `<li><i class="fas ${icon}"></i> ${am.label}</li>`;
                    } else {
                        return `<li>${am.label}</li>`;
                    }
                }).join('');
            
                // Générer la section des descriptions sous forme de paragraphes
                const listeDescriptions = descriptions && descriptions.length > 0 
                    ? descriptions.map(desc => `<p>${desc}</p>`).join('')
                    : '';
            
                // Retourner à la fois la liste des aménagements et les descriptions
                return `
                    <ul class="amenagements">${listeAmenagements}</ul>
                    <div class="descriptions">${listeDescriptions}</div>
                `;
            }
            
            parcContent.innerHTML = `
                ${data.image ? `
                    <div class="parc-image">
                      <img src="${data.image}" alt="${data.titre || 'Image du parc'}">
                      ${data.image_copyright ? `<div class="copyright">${data.image_copyright}</div>` : ''}
                    </div>
                  ` : ''}
                <h1>${data.titre || 'Parc inconnu'}</h1>
                <p class="distance"></p>
                ${data.soustitre ? `<h4>${data.soustitre}</h4>` : ''}
                ${data.a_propos ? `
                    <section class="accordion">
                        <h2 class="accordion-header">À propos</h2>
                        <div class="accordion-content">
                            <p>${data.a_propos}</p>
                        </div>
                    </section>` : ''}
                ${data.infos_pratiques && data.infos_pratiques.length > 0 ? `
                    <section class="accordion">
                        <h2 class="accordion-header">Infos pratiques</h2>
                        <div class="accordion-content">
                            ${genererInfosPratiques(data.infos_pratiques)}
                        </div>
                    </section>` : ''}
                ${data.amenagements && data.amenagements.length > 0 ? `
                    <section class="accordion">
                    <h2 class="accordion-header">Aménagements</h2>
                        <div class="accordion-content">
                            ${genererListeAmenagements(data.amenagements, data.descriptions || [])}
                        </div>
                    </section>` : ''}
                ${data.url ? `<p class="source-link"><a href="${data.url}" target="_blank" rel="noopener noreferrer">Voir la fiche complète sur gardens.brussels</a></p>` : ''}
            `;

            content.appendChild(parcContent);

            index++;
            infosAjoutees++;
            }

      } catch (err) {
        console.error(`Erreur pour l'URL ${url}`, err);
      }
    }

    ajouterEvenementsAccordeon();

    if (extent) {
        if (infosAjoutees > 0) {
            // Affiche le popup et zoom
            toggleButton.classList.add('active');
            popup.classList.add('show');
            main.classList.add('popup-open');
            map.updateSize();
            setTimeout(() => {
                map.getView().fit(extent, {
                    padding: [50, 50, 50, 50],
                    duration: 1000
                });
                updateScrollButtons();
            }, 500);
        } else {
            // Zoom uniquement et masquer le bouton
            toggleButton.classList.remove('active');
            map.getView().fit(extent, {
                padding: [50, 50, 50, 50],
                duration: 1000
            });
        }
    }
}

// Fonction pour afficher/masquer les infos d'un parc en particulier
function afficherParc(index) {
    const tabs = document.querySelectorAll('.tab-btn');
    const parcs = document.querySelectorAll('.parc-info');
    const titreParc = tabs[index].textContent;
    const parcContent = parcs[index];
  
    // Vérifie si le bouton est déjà actif
    const isAlreadyActive = tabs[index].classList.contains('active');
  
    // Réinitialiser tous les onglets et cacher tous les contenus
    tabs.forEach(tab => tab.classList.remove('active'));
    parcs.forEach(parc => parc.classList.remove('active'));
  
    // Si c'était déjà actif, on désactive tout et on dézoome
    if (isAlreadyActive) {
      if (featureSurlignee) {
        featureSurlignee.setStyle(null); // Remet le style par défaut
        featureSurlignee = null;
      }
  
      // Zoom out sur l'ensemble des parcs
      const extent = searchExtent;
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 800
      });

      document.querySelector('.parcs-popup').classList.remove('plein-ecran');

      return;
    }
  
    // Sinon, on active cet onglet et affiche les infos
    tabs[index].classList.add('active');
    parcContent.classList.add('active');
    document.querySelector('.parcs-popup').classList.add('plein-ecran');
  
    const lien = parcContent.querySelector('a');
    if (!lien) return;
  
    const urlParc = lien.href;
    const source = searchedParcs.getSource();
    const feature = source.getFeatures().find(f => f.get('url_gardens') === urlParc);
  
    if (feature) {

        // Afficher la distance si disponible
        const distance = feature.get('distance');
        if (distance !== undefined) {
            const distanceElement = parcContent.querySelector('.distance');
            if (distanceElement) {
                distanceElement.textContent = `📍 Distance : ${Math.round(distance)} m`;
            }
        }

        // Supprimer le style précédent
        if (featureSurlignee && featureSurlignee !== feature) {
            featureSurlignee.setStyle(null);
        }
  
        // Zoom sur la feature
        const geom = feature.getGeometry();
        map.getView().fit(geom, {
            padding: [50, 50, 50, 50],
            maxZoom: 17,
            duration: 800
        });
  
        // Appliquer un style temporaire
        feature.setStyle(HighlightedStyle());
        featureSurlignee = feature;

    }
}

// Pour fermer le popup
document.getElementById('close-popup').addEventListener('click', () => {
    const popup = document.getElementById('parcs-popup');
    const main = document.querySelector('main');
    popup.classList.remove('show');
    main.classList.remove('popup-open');
    map.updateSize(); // 👈 recalcul de la taille de la carte
});

// Carrousel

// Sélection des éléments
const tabs = document.getElementById('tabs');
const btnLeft = document.querySelector('.carousel-nav.left');
const btnRight = document.querySelector('.carousel-nav.right');

// Ajout des événements pour les boutons gauche/droit (click)
btnLeft.addEventListener('click', () => {
    tabs.scrollBy({ left: -150, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
    tabs.scrollBy({ left: 150, behavior: 'smooth' });
});

// Ajout des événements pour les boutons gauche/droit (mouswheel)
tabs.addEventListener('wheel', (event) => {
  // Vérifie si l'utilisateur fait un scroll vertical
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault(); // empêche le scroll vertical de la page

    // Sens inversé : haut = droite, bas = gauche
    const scrollAmount = 150; // à ajuster selon ta préférence
    if (event.deltaY < 0) {
      tabs.scrollLeft += scrollAmount;
    } else {
      tabs.scrollLeft -= scrollAmount;
    }
  }
}, { passive: false }); // passive false pour pouvoir utiliser preventDefault

// Fonction pour mettre à jour la visibilité des boutons de navigation
function updateScrollButtons() {
    const scrollLeft = tabs.scrollLeft; // Position actuelle du scroll
    const scrollWidth = tabs.scrollWidth; // Largeur totale du contenu
    const clientWidth = tabs.clientWidth; // Largeur de la fenêtre visible

    // Affichage des valeurs pour voir ce qui se passe vraiment
    console.log(`scrollLeft: ${scrollLeft}, scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);

    // Vérification de ce qui se passe
    if (scrollWidth <= clientWidth) {
        console.log("Contenu entièrement visible, cacher les boutons.");
        btnLeft.classList.add('disabled');
        btnRight.classList.add('disabled');
    } else {
        // Vérifier si on peut scroller vers la gauche
        const canScrollLeft = scrollLeft > 5;
        console.log("Can scroll left: " + canScrollLeft);
        btnLeft.classList.toggle('disabled', !canScrollLeft);

        // Vérifier si on peut scroller vers la droite
        const canScrollRight = scrollLeft < scrollWidth - clientWidth - 5;
        console.log("Can scroll right: " + canScrollRight);
        btnRight.classList.toggle('disabled', !canScrollRight);
    }
}

// Met à jour les boutons de navigation au scroll ou au redimensionnement
tabs.addEventListener('scroll', updateScrollButtons);
window.addEventListener('resize', updateScrollButtons);

//scalebar

// Créer une barre d'échelle
var scaleLineControl = new ol.control.ScaleLine({
    units: 'metric' // Les unités peuvent être 'metric' (mètre/km) ou 'imperial' (pied/mi)
});
  
// Ajouter la barre d'échelle à la carte
map.addControl(scaleLineControl);

//layerswitcher

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: "Layers",
    target: 'panel'
});
map.addControl(layerSwitcher);

// Fonction pour gérer l'exclusivité des couches
function VisibilityChange(layer) {
    const isBaseMap = layer.get('isBaseMap') === true;
    const isAlwaysOn = layer.get('display') === 'always_on';

    // On ne fait rien si la couche activée n'est pas visible
    if (!layer.getVisible()) return;

    map.getLayers().forEach(function (otherLayer) {
        // Cas des groupes
        if (otherLayer instanceof ol.layer.Group) {
            otherLayer.getLayers().forEach(function (subLayer) {
                const subIsBaseMap = subLayer.get('isBaseMap') === true;
                const subIsAlwaysOn = subLayer.get('display') === 'always_on';

                if (
                    isBaseMap && subIsBaseMap &&
                    subLayer !== layer
                ) {
                    subLayer.setVisible(false);
                }

                if (
                    !isBaseMap && !subIsAlwaysOn && !subIsBaseMap &&
                    subLayer !== layer
                ) {
                    subLayer.setVisible(false);
                }
            });
        } else {
            // Cas des couches hors groupe
            const otherIsBaseMap = otherLayer.get('isBaseMap') === true;
            const otherIsAlwaysOn = otherLayer.get('display') === 'always_on';

            if (
                isBaseMap && otherIsBaseMap &&
                otherLayer !== layer
            ) {
                otherLayer.setVisible(false);
            }

            if (
                !isBaseMap && !otherIsAlwaysOn && !otherIsBaseMap &&
                otherLayer !== layer
            ) {
                otherLayer.setVisible(false);
            }
        }
    });
}

// Ajout de l’écouteur sur toutes les couches
map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Group) {
        layer.getLayers().forEach(function (subLayer) {
            subLayer.on('change:visible', function () {
                VisibilityChange(subLayer);
            });
        });
    } else {
        layer.on('change:visible', function () {
            VisibilityChange(layer);
        });
    }
});


// Base Map switcher

const switcher = document.getElementById('basemapSwitcher');
const toggle = document.getElementById('currentBasemap');
const options = document.getElementById('basemapOptions');

// Toggle dépliage
toggle.addEventListener('click', () => {
  switcher.classList.toggle('active');
});

// Clic sur une miniature
document.querySelectorAll('.basemap-option').forEach(option => {
  option.addEventListener('click', () => {
    const targetTitle = option.getAttribute('data-layer');

    map.getLayers().forEach(layer => {
      if (layer.get('isBaseMap')) {
        layer.setVisible(layer.get('bmaptitle') === targetTitle);
      }
    });

    // Mise à jour de l'image active
    toggle.src = option.src;

    // Repli du menu
    switcher.classList.remove('active');
  });
});

//attribution
var bottomAttribution = new ol.control.Attribution({
  collapsible: false,
  collapsed: false,
  className: 'bottom-attribution'
});
map.addControl(bottomAttribution);

var attributionList = document.createElement('li');
attributionList.innerHTML = `
	<a href="https://github.com/qgis2web/qgis2web">qgis2web</a> &middot;
	<a href="https://openlayers.org/">OpenLayers</a> &middot;
	<a href="https://qgis.org/">QGIS</a>	
`;
var bottomAttributionUl = bottomAttribution.element.querySelector('ul');
if (bottomAttributionUl) {
  bottomAttribution.element.insertBefore(attributionList, bottomAttributionUl);
}

// Disable "popup on hover" or "highlight on hover" if ol-control mouseover
var preDoHover = doHover;
var preDoHighlight = doHighlight;
var isPopupAllActive = false;
document.addEventListener('DOMContentLoaded', function() {
	if (doHover || doHighlight) {
		var controlElements = document.getElementsByClassName('ol-control');
		for (var i = 0; i < controlElements.length; i++) {
			controlElements[i].addEventListener('mouseover', function() { 
				doHover = false;
				doHighlight = false;
			});
			controlElements[i].addEventListener('mouseout', function() {
				doHover = preDoHover;
				if (isPopupAllActive) { return }
				doHighlight = preDoHighlight;
			});
		}
	}
});

//move controls inside containers, in order
    //geocoder
    var geocoderControl = document.getElementsByClassName('ol-geocoder')[0];
    if (geocoderControl) {
        topLeftContainerDiv.appendChild(geocoderControl);
    }
    //search layer
    var searchLayerControl = document.getElementsByClassName('search-layer')[0];
    if (searchLayerControl) {
        topLeftContainerDiv.appendChild(searchLayerControl);
    }
    //zoom
    var zoomControl = document.getElementsByClassName('ol-zoom')[0];
    if (zoomControl) {
        topLeftContainerDiv.appendChild(zoomControl);
    }
    //geolocate
    var geolocateControl = document.getElementsByClassName('geolocate')[0];
    if (geolocateControl) {
        topLeftContainerDiv.appendChild(geolocateControl);
    }
    //measure
    var measureControl = document.getElementsByClassName('measure-control')[0];
    if (measureControl) {
        topLeftContainerDiv.appendChild(measureControl);
    }

    //reste control
    var resetControlDiv = document.getElementsByClassName('reset-view')[0];
    if (resetControlDiv) {
        topLeftContainerDiv.appendChild(resetControlDiv);
    }

    //scale line
    var scaleLineControl = document.getElementsByClassName('ol-scale-line')[0];
    if (scaleLineControl) {
        scaleLineControl.className += ' ol-control';
        bottomLeftContainerDiv.appendChild(scaleLineControl);
    }
    //attribution
    var attributionControl = document.getElementsByClassName('bottom-attribution')[0];
    if (attributionControl) {
        bottomRightContainerDiv.appendChild(attributionControl);
    }

