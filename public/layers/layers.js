var wms_layers = [];

// Création du groupe de couches pour la health map
const lyr_health = new ol.layer.Group({
  layers: [
    lyr_health_air,
    lyr_health_heat,
    lyr_health_multi,
    lyr_health_noise,
    lyr_heat_islands
  ],
  title: 'Health map',
  fold: 'close',
  opacity: 1.0
});

// Création du groupe de couches pour la noise map
const lyr_noise = new ol.layer.Group({
  layers: [
    lyr_noise_multi_lden,
    lyr_noise_multi_ln,
    lyr_noise_road_lden,
    lyr_noise_road_ln
  ],
  title: 'Noise map',
  fold: 'close',
  opacity: 1.0
});

// Création du groupe de couches pour la noise map
const lyr_statistics = new ol.layer.Group({
  layers: [
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
  ],
  title: 'Statistical map',
  fold: 'close',
  opacity: 1.0
});
lyr_osm.setVisible(false);
lyr_urbis_base_map.setVisible(false);
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
lyr_municipalities.setVisible(false);
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
var layersList = [
lyr_osm,
lyr_urbis_base_map,
lyr_base_map,
lyr_health,
lyr_noise,
lyr_statistics,
lyr_trees_be,
lyr_public_green_spaces,
lyr_municipalities];
lyr_municipalities.set('fieldAliases', {'nis_code': 'nis_code','mun_name_fr': '','mun_name_nl': '', 'police_zone_id': 'police_zone_id', });
lyr_public_green_spaces.set('fieldAliases', {'gid': 'gid', 'pgs_id': 'pgs_id', 'pgs_name_fr': '', 'pgs_name_nl': '', 'code': 'code','surface': 'surface', 'type_fr': 'Type', 'type_nl': 'type_nl', 'subtype_fr': 'Sous-type', 'subtype_nl': 'subtype_nl', 'manager_fr': 'Gestionnaire', 'manager_nl': 'manager_nl', 'owner_fr': 'Propriétaire', 'owner_nl': 'owner_nl', 'municipality_fr': 'municipality_fr', 'municipality_nl': 'municipality_nl', 'management_plan': 'management_plan', 'security': 'security', 'accessibility_by_law': 'accessibility_by_law','opening_times': 'opening_times', 'potential': 'potential', 'permeability30': 'permeability30', 'temporary': 'temporary', 'on_roof': 'on roof', 'url_gardens': 'url_gardens'});
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
lyr_public_green_spaces.set('fieldImages', {'gid': '', 'pgs_id': '', 'pgs_name_fr': '', 'pgs_name_nl': '', 'code': '','surface': '', 'type_fr': '', 'type_nl': '', 'subtype_fr': '', 'subtype_nl': '', 'manager_fr': '', 'manager_nl': '', 'owner_fr': '', 'owner_nl': '', 'municipality_fr': '', 'municipality_nl': '', 'management_plan': '', 'security': '', 'accessibility_by_law': '','opening_times': '', 'potential': '', 'permeability30': '', 'temporary': '', 'on_roof': '', 'url_gardens': ''});
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
lyr_public_green_spaces.set('fieldLabels', {'pgs_id': 'hidden field', 'pgs_name_fr': 'header label - always visible', 'pgs_name_nl': 'hidden field', 'code': 'hidden field', 'surface': 'hidden field', 'type_fr': 'hidden field', 'type_nl': 'hidden field', 'subtype_fr': 'hidden field', 'subtype_nl': 'hidden field', 'manager_fr': 'hidden field', 'manager_nl': 'hidden field', 'owner_fr': 'hidden field', 'owner_nl': 'hidden field', 'municipality_fr': 'hidden field', 'municipality_nl': 'hidden field', 'management_plan': 'hidden field', 'security': 'hidden field', 'accessibility_by_law': 'hidden field', 'opening_times': 'hidden field', 'potential': 'hidden field', 'permeability30': 'hidden field', 'temporary': 'hidden field', 'on_roof': 'hidden field', 'url_gardens': 'hidden field'});
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