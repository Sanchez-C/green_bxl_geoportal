var wms_layers = [];

var lyr_base_map = new ol.layer.Tile({
                            source: new ol.source.TileWMS({
                              url: "http://localhost:8080/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "green_brussels:base_map",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            }),
                            title: 'Fond de carte',
                            display: 'always_on',
                            opacity: 1.000000,
                          });
              wms_layers.push([lyr_base_map, 0]);

var lyr_noise_multi_lden = new ol.layer.Tile({
                            source: new ol.source.TileWMS({
                              url: "http://localhost:8080/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "green_brussels:noise_multi_lden",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            }),
                            leg: 'leg_noise',
                            title: 'Bruit - Multi exposition (lden)',
                            opacity: 1.000000,
                          });
              wms_layers.push([lyr_noise_multi_lden, 0]);

var lyr_noise_multi_ln = new ol.layer.Tile({
                            source: new ol.source.TileWMS({
                              url: "http://localhost:8080/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "green_brussels:noise_multi_ln",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            }),
                            leg: 'leg_noise',
                            title: 'Bruit - Multi exposition (ln)',
                            opacity: 1.000000,
                          });
              wms_layers.push([lyr_noise_multi_ln, 0]);

var lyr_noise_road_lden = new ol.layer.Tile({
                            source: new ol.source.TileWMS({
                              url: "http://localhost:8080/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "green_brussels:noise_road_lden",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            }),
                            leg: 'leg_noise',
                            title: 'Bruit - Trafic routier (lden)',
                            opacity: 1.000000,
                          });
              wms_layers.push([lyr_noise_road_lden, 0]);

var lyr_noise_road_ln = new ol.layer.Tile({
                            source: new ol.source.TileWMS({
                              url: "http://localhost:8080/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "green_brussels:noise_road_ln",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            }),
                            leg: 'leg_noise',
                            title: 'Bruit - Trafic routier (ln)',
                            opacity: 1.000000,
                          });
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

var lyr_public_green_spaces = new ol.layer.Vector({
                            source: new ol.source.Vector({
                              format: new ol.format.GeoJSON({
                              }),
                              strategy: ol.loadingstrategy.bbox,
                              url: "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=green_brussels:public_green_spaces&outputFormat=application/json&srsname=EPSG:3857"
                            }),
                            popuplayertitle: 'Espace vert',
                            interactive: true,
                            style: style_transp,
                            leg: 'leg_public_green_spaces',
                            hoverStyle: 'greenHover',
                            title: 'Espaces verts publics',
                            display: 'always_on',
                            opacity: 1.000000,
                          });

var trees_wfsSource = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function(extent) {
      return "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0&request=GetFeature" +
             "&typeName=green_brussels:trees_be&outputFormat=application/json&srsname=EPSG:3857&bbox=" +
             extent.join(',') + ',EPSG:3857';
  },
  strategy: ol.loadingstrategy.bbox
});

var cluster_trees_be = new ol.source.Cluster({
  distance: 30,
  source: trees_wfsSource
});

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
                    
var lyr_municipalities = new ol.layer.Vector({
                            source: new ol.source.Vector({
                              format: new ol.format.GeoJSON({
                              }),
                              strategy: ol.loadingstrategy.bbox,
                              url: "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=green_brussels:municipalities&outputFormat=application/json&srsname=EPSG:3857"
                            }),
                            style: style_transp,
                            hoverStyle: 'blueHover',
                            popuplayertitle: 'Commune',
                            interactive: true,
                            title: 'Limites communales',
                            display: 'always_on',
                            opacity: 1.000000,
                          });

var lyr_search_layer = new ol.layer.Vector({
                            source: new ol.source.Vector({
                              format: new ol.format.GeoJSON({
                              }),
                              strategy: ol.loadingstrategy.bbox,
                              url: "http://localhost:8080/geoserver/green_brussels/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=green_brussels:search_layer&outputFormat=application/json&srsname=EPSG:3857"
                            }),
                            style: new ol.style.Style(),
                            interactive: true,
                            title: '',
                            display: 'always_on',
                            opacity: 1.000000,
                          }); 

lyr_base_map.setVisible(true);
lyr_noise_multi_lden.setVisible(false);
lyr_noise_multi_ln.setVisible(false);
lyr_noise_road_lden.setVisible(false);
lyr_noise_road_ln.setVisible(false);
lyr_health_air.setVisible(false);
lyr_health_heat.setVisible(false);
lyr_health_multi.setVisible(false);
lyr_health_noise.setVisible(false);
lyr_heat_islands.setVisible(false);
lyr_public_green_spaces.setVisible(true);
lyr_trees_be.setVisible(false);
lyr_municipalities.setVisible(true);
lyr_md_gardens_rel.setVisible(false);
lyr_md_gardens_nb.setVisible(false);
lyr_md_green_spaces.setVisible(false);
lyr_md_surfaces_imp.setVisible(false);
lyr_md_surfaces_veg.setVisible(false);
lyr_md_densite.setVisible(false);
lyr_md_households_size.setVisible(false);
lyr_md_noise_lden.setVisible(false);
lyr_md_noise_ln.setVisible(false);
lyr_md_road_occ_morning.setVisible(false);
lyr_md_road_occ_evening.setVisible(false);
lyr_search_layer.setVisible(true);
var layersList = [
lyr_base_map,
lyr_health_air,
lyr_health_heat,
lyr_health_multi,
lyr_health_noise,
lyr_heat_islands,
lyr_noise_multi_lden,
lyr_noise_multi_ln,
lyr_noise_road_lden,
lyr_noise_road_ln,
lyr_md_noise_ln,
lyr_md_noise_lden,
lyr_md_road_occ_evening,
lyr_md_road_occ_morning,
lyr_md_households_size,
lyr_md_densite,
lyr_md_surfaces_imp,
lyr_md_surfaces_veg,
lyr_md_green_spaces,
lyr_md_gardens_rel,
lyr_md_gardens_nb,
lyr_trees_be,
lyr_public_green_spaces,
lyr_municipalities,
lyr_search_layer];
lyr_municipalities.set('fieldAliases', {'nis_code': 'nis_code','mun_name_fr': '','mun_name_nl': '', 'police_zone_id': 'police_zone_id', });
lyr_public_green_spaces.set('fieldAliases', {'gid': 'gid', 'pgs_id': 'pgs_id', 'pgs_name_fr': '', 'pgs_name_nl': '', 'code': 'code','surface': 'surface', 'type_fr': 'Type', 'type_nl': 'type_nl', 'subtype_fr': 'Sous-type', 'subtype_nl': 'subtype_nl', 'manager_fr': 'Gestionnaire', 'manager_nl': 'manager_nl', 'owner_fr': 'Propriétaire', 'owner_nl': 'owner_nl', 'municipality_fr': 'municipality_fr', 'municipality_nl': 'municipality_nl', 'management_plan': 'management_plan', 'security': 'security', 'accessibility_by_law': 'accessibility_by_law','opening_times': 'opening_times', 'potential': 'potential', 'permeability30': 'permeability30', 'temporary': 'temporary', 'on_roof': 'on roof',});
lyr_trees_be.set('fieldAliases', {'tree_id': 'tree_id', 'specie': 'Espèce', 'c150_cm': 'c150_cm', 'h_tot_m': 'Hauteur', 'd_cour_m': 'd_cour_m', });
lyr_md_gardens_rel.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl': '', 'surfaces_m2': 'surfaces_m2', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_gardens_nb.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl': '', 'surfaces_m2': 'surfaces_m2', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_green_spaces.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl': '', 'surfaces_m2': 'surfaces_m2', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_surfaces_imp.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl': '', 'surfaces_m2': 'surfaces_m2', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_surfaces_veg.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl': '', 'surfaces_m2': 'surfaces_m2', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_noise_lden.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': 'surfaces_m2', 'lden': '', 'ln': '', });
lyr_md_noise_ln.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': 'surfaces_m2', 'lden': '', 'ln': '', });
lyr_md_densite.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': 'surfaces_m2', 'population': '', 'households': '', 'densite': '', 'households_size': '', });
lyr_md_households_size.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': 'surfaces_m2', 'population': '', 'households': '', 'densite': '', 'households_size': '', });
lyr_md_road_occ_evening.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': 'surfaces_m2', 'morning': '', 'evening': '', });
lyr_md_road_occ_morning.set('fieldAliases', {'md_id': 'md_id', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': 'surfaces_m2', 'morning': '', 'evening': '', });
lyr_municipalities.set('fieldImages', {'nis_code': 'nis_code','mun_name_fr': '','mun_name_nl': '', 'police_zone_id': 'police_zone_id', });
lyr_public_green_spaces.set('fieldImages', {'gid': '', 'pgs_id': '', 'pgs_name_fr': '', 'pgs_name_nl': '', 'code': '','surface': '', 'type_fr': '', 'type_nl': '', 'subtype_fr': '', 'subtype_nl': '', 'manager_fr': '', 'manager_nl': '', 'owner_fr': '', 'owner_nl': '', 'municipality_fr': '', 'municipality_nl': '', 'management_plan': '', 'security': '', 'accessibility_by_law': '','opening_times': '', 'potential': '', 'permeability30': '', 'temporary': '', 'on_roof': '',});
lyr_trees_be.set('fieldImages', {'tree_id': '', 'specie': '', 'c150_cm': '', 'h_tot_m': '', 'd_cour_m': '', });
lyr_md_gardens_rel.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl': '', 'surfaces_m2': '', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_gardens_nb.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl': '', 'surfaces_m2': '', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_green_spaces.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl': '', 'surfaces_m2': '', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_surfaces_imp.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl': '', 'surfaces_m2': '', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_surfaces_veg.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl': '', 'surfaces_m2': '', 'gardens_nb': '', 'gardens_rel': '', 'surfaces_imp': '', 'surfaces_veg': '', 'green_spaces': '', });
lyr_md_noise_lden.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl': '', 'surfaces_m2': '', 'lden': '', 'ln': '', });
lyr_md_noise_ln.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': '', 'lden': '', 'ln': '', });
lyr_md_densite.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': '', 'population': '', 'households': '', 'densite': '', 'households_size': '', });
lyr_md_households_size.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': '', 'population': '', 'households': '', 'densite': '', 'households_size': '', });
lyr_md_road_occ_evening.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': '', 'morning': '', 'evening': '', });
lyr_md_road_occ_morning.set('fieldImages', {'md_id': '', 'name_fr': '', 'name_nl' : '', 'surfaces_m2': '', 'morning': '', 'evening': '', });
lyr_municipalities.set('fieldLabels', {'nis_code': 'hidden field','mun_name_fr': 'header label - always visible','mun_name_nl': 'hidden field', 'police_zone_id': 'hidden field', });
lyr_public_green_spaces.set('fieldLabels', {'pgs_id': 'hidden field', 'pgs_name_fr': 'header label - always visible', 'pgs_name_nl': 'hidden field', 'code': 'hidden field', 'surface': 'hidden field', 'type_fr': 'inline label - always visible', 'type_nl': 'hidden field', 'subtype_fr': 'inline label - always visible', 'subtype_nl': 'hidden field', 'manager_fr': 'inline label - always visible', 'manager_nl': 'hidden field', 'owner_fr': 'inline label - always visible', 'owner_nl': 'hidden field', 'municipality_fr': 'hidden field', 'municipality_nl': 'hidden field', 'management_plan': 'hidden field', 'security': 'hidden field', 'accessibility_by_law': 'hidden field', 'opening_times': 'hidden field', 'potential': 'hidden field', 'permeability30': 'hidden field', 'temporary': 'hidden field', 'on_roof': 'hidden field', });
lyr_trees_be.set('fieldLabels', {'tree_id': 'hidden field', 'specie': 'inline label - always visible', 'c150_cm': 'hidden field', 'h_tot_m': 'inline label - always visible', 'd_cour_m': 'hidden field', });
lyr_md_gardens_rel.set('fieldLabels',{'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'gardens_nb': 'hidden field', 'gardens_rel': 'header label - always visible', 'surfaces_imp': 'hidden field', 'surfaces_veg': 'hidden field', 'green_spaces': 'hidden field', });
lyr_md_gardens_nb.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'gardens_nb': 'header label - always visible', 'gardens_rel': 'hidden field', 'surfaces_imp': 'hidden field', 'surfaces_veg': 'hidden field', 'green_spaces': 'hidden field', });
lyr_md_green_spaces.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'gardens_nb': 'hidden field', 'gardens_rel': 'hidden field', 'surfaces_imp': 'hidden field', 'surfaces_veg': 'hidden field', 'green_spaces': 'header label - always visible', });
lyr_md_surfaces_imp.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'gardens_nb': 'hidden field', 'gardens_rel': 'hidden field', 'surfaces_imp': 'header label - always visible', 'surfaces_veg': 'hidden field', 'green_spaces': 'hidden field', });
lyr_md_surfaces_veg.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'gardens_nb': 'hidden field', 'gardens_rel': 'hidden field', 'surfaces_imp': 'hidden field', 'surfaces_veg': 'header label - always visible', 'green_spaces': 'hidden field', });
lyr_md_noise_lden.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'lden': 'header label - always visible', 'ln': 'hidden field', });
lyr_md_noise_ln.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'lden': 'hidden field', 'ln': 'inline label - visible with data', });
lyr_md_densite.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'population': 'hidden field', 'households': 'hidden field', 'densite': 'header label - always visible', 'households_size': 'hidden field', });
lyr_md_households_size.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'population': 'hidden field', 'households': 'hidden field', 'densite': 'hidden field', 'households_size': 'header label - always visible', });
lyr_md_road_occ_evening.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'morning': 'hidden field', 'evening': 'header label - always visible', });
lyr_md_road_occ_morning.set('fieldLabels', {'md_id': 'hidden field', 'name_fr': 'header label - always visible', 'name_nl': 'hidden field', 'surfaces_m2': 'hidden field', 'morning': 'header label - always visible', 'evening': 'hidden field', });
lyr_md_road_occ_evening.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});