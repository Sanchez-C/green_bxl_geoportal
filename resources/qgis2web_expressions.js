// Aggregates

// Color

// Conditionals

// Conversions

// Custom

// Date and Time

// Fields and Values

// Fuzzy Matching

// General

// Geometry
function fnc_azimuth(values, context) {
    return false;
};

function fnc_project(values, context) {
    return false;
};

// Math
function fnc_abs(values, context) {
    return Math.abs(values[0]);
};

function fnc_degrees(values, context) {
    return values[0] * (180/Math.PI);
};

function fnc_radians(values, context) {
    return values[0] * (Math.PI/180);
};

function fnc_sqrt(values, context) {
    return Math.sqrt(values[0]);
};

function fnc_cos(values, context) {
    return Math.cos(values[0]);
};

function fnc_sin(values, context) {
    return Math.sin(values[0]);
};

function fnc_tan(values, context) {
    return Math.tan(values[0]);
};

function fnc_asin(values, context) {
    return Math.asin(values[0]);
};

function fnc_acos(values, context) {
    return Math.acos(values[0]);
};

function fnc_atan(values, context) {
    return Math.atan(values[0]);
};

function fnc_atan2(values, context) {
    return Math.atan2(values[0]);
};

function fnc_exp(values, context) {
    return Math.exp(values[0]);
};

function fnc_ln(values, context) {
    return Math.log(values[0]);
};

function fnc_log10(values, context) {
    return Math.LN10(values[0]);
};

function fnc_log(values, context) {
    return Math.log(values[0]) / Math.log(values[1]);
};

function fnc_round(values, context) {
    return Math.round(values[0]);
};

function fnc_rand(values, context) {
    return Math.floor(Math.random()*(values[1]-values[0]+1)+values[0]);
};

function fnc_randf(values, context) {
    return Math.random()*(values[1]-values[0]+1)+values[0];
};

function fnc_max(values, context) {
    return Math.max.apply(this, values);
};

function fnc_min(values, context) {
    return Math.min.apply(this, values);
};

function fnc_clamp(values, context) {
    return Math.min(Math.max(values[0],values[1]),values[2]);
};

// Operators

// Record

// String

// TimeManager

// Variables



function fnc_scale_linear(values, context) {
    return false;
};

function fnc_scale_exp(values, context) {
    return false;
};

function fnc_floor(values, context) {
    return Math.floor(values[0]);
};

function fnc_ceil(values, context) {
    return Math.ceil(values[0]);
};

function fnc_pi(values, context) {
    return Math.PI;
};

function fnc_to_int(values, context) {
    var intVal = parseInt(values[0],10);
    if ( isNaN(intVal) ) { return false };
    return intVal;
};

function fnc_to_real(values, context) {
    var realVal = parseFloat(values[0]);
    if ( isNaN(realVal) ) { return false };
    return realVal;
};

function fnc_to_string(values, context) {
    return String(values[0]);
};

function fnc_to_datetime(values, context) {
    return false;
};

function fnc_to_date(values, context) {
    return false;
};

function fnc_to_time(values, context) {
    return false;
};

function fnc_to_interval(values, context) {
    return false;
};

function fnc_coalesce(values, context) {
    return false;
};

function fnc_if(values, context) {
    return false;
};

function fnc_aggregate(values, context) {
    return false;
};

function fnc_relation_aggregate(values, context) {
    return false;
};

function fnc_count(values, context) {
    return false;
};

function fnc_count_distinct(values, context) {
    return false;
};

function fnc_count_missing(values, context) {
    return false;
};

function fnc_minimum(values, context) {
    return false;
};

function fnc_maximum(values, context) {
    return false;
};

function fnc_sum(values, context) {
    return false;
};

function fnc_mean(values, context) {
    return false;
};

function fnc_median(values, context) {
    return false;
};

function fnc_stdev(values, context) {
    return false;
};

function fnc_range(values, context) {
    return false;
};

function fnc_minority(values, context) {
    return false;
};

function fnc_majority(values, context) {
    return false;
};

function fnc_q1(values, context) {
    return false;
};

function fnc_q3(values, context) {
    return false;
};

function fnc_iqr(values, context) {
    return false;
};

function fnc_min_length(values, context) {
    return false;
};

function fnc_max_length(values, context) {
    return false;
};

function fnc_concatenate(values, context) {
    return false;
};

function fnc_regexp_match(values, context) {
    return false;
};

function fnc_now(values, context) {
    return new Date().toISOString();
};

function fnc_age(values, context) {
    return false;
};

function fnc_year(values, context) {
    return false;
};

function fnc_month(values, context) {
    return false;
};

function fnc_week(values, context) {
    return false;
};

function fnc_day(values, context) {
    return false;
};

function fnc_hour(values, context) {
    return false;
};

function fnc_minute(values, context) {
    return false;
};

function fnc_second(values, context) {
    return false;
};

function fnc_day_of_week(values, context) {
    return false;
};

function fnc_lower(values, context) {
    if ( typeof values[0] != "string" ) { return false; } 
    return values[0].toLowerCase();
};

function fnc_upper(values, context) {
    if ( typeof values[0] != "string" ) { return false; } 
    return values[0].toUpperCase();
};

function fnc_title(values, context) {
    if ( typeof values[0] != "string" ) { return false; }
    return values[0].toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};

function fnc_trim(values, context) {
    if ( typeof values[0] != "string" ) { return false; } 
    return String(values[0]).trim();
};

function fnc_levenshtein(values, context) {
    return false;
};

function fnc_longest_common_substring(values, context) {
    return false;
};

function fnc_hamming_distance(values, context) {
    return false;
};

function fnc_soundex(values, context) {
    return false;
};

function fnc_char(values, context) {
    if ( isNaN(values[0]) || !values[0]) { return null; } return String.fromCodePoint(values[0]);
};

function fnc_wordwrap(values, context) {
    return false;
};

function fnc_length(values, context) {
    return false;
};

function fnc_replace(values, context) {
    return false;
};

function fnc_regexp_replace(values, context) {
    if ( !values[0] ) { return null; } return String(values[0]).replace(RegExp(values[1]),values[2]);
};

function fnc_regexp_substr(values, context) {
    if ( !values[0] ) { return null; }
    return String(values[0]).match(RegExp(values[1]))[0];
};

function fnc_substr(values, context) {
    var length = values[2]
    if ( !values[0] || isNaN(values[1])) { return false; }
    return String(values[0]).substr(values[1], length);
};

function fnc_concat(values, context) {
    return values.join(''); 
};

function fnc_strpos(values, context) {
   if (!values[0] || !values[1]) {return null}
   return String(values[0]).indexOf(String(values[1]))+1;
};

function fnc_left(values, context) {
    return false;
};

function fnc_right(values, context) {
    return false;
};

function fnc_rpad(values, context) {
    return false;
};

function fnc_lpad(values, context) {
    return false;
};

function fnc_format(values, context) {
    return false;
};

function fnc_format_number(values, context) {
    return false;
};

function fnc_format_date(values, context) {
    return false;
};

function fnc_color_rgb(values, context) {
    return false;
};

function fnc_color_rgba(values, context) {
    return false;
};

function fnc_ramp_color(values, context) {
    return false;
};

function fnc_color_hsl(values, context) {
    return false;
};

function fnc_color_hsla(values, context) {
    return false;
};

function fnc_color_hsv(values, context) {
    return false;
};

function fnc_color_hsva(values, context) {
    return false;
};

function fnc_color_cmyk(values, context) {
    return false;
};

function fnc_color_cmyka(values, context) {
    return false;
};

function fnc_color_part(values, context) {
    return false;
};

function fnc_darker(values, context) {
    return false;
};

function fnc_lighter(values, context) {
    return false;
};

function fnc_set_color_part(values, context) {
    return false;
};

function fnc_area(values, context) {
    return false;
};

function fnc_perimeter(values, context) {
    return false;
};

function fnc_x(values, context) {
    return false;
};

function fnc_y(values, context) {
    return false;
};

function fnc_z(values, context) {
    return false;
};

function fnc_m(values, context) {
    return false;
};

function fnc_point_n(values, context) {
    return false;
};

function fnc_start_point(values, context) {
    return false;
};

function fnc_end_point(values, context) {
    return false;
};

function fnc_nodes_to_points(values, context) {
    return false;
};

function fnc_segments_to_lines(values, context) {
    return false;
};

function fnc_make_point(values, context) {
    return false;
};

function fnc_make_point_m(values, context) {
    return false;
};

function fnc_make_line(values, context) {
    return false;
};

function fnc_make_polygon(values, context) {
    return false;
};

function fnc_x_min(values, context) {
    return false;
};

function fnc_x_max(values, context) {
    return false;
};

function fnc_y_min(values, context) {
    return false;
};

function fnc_y_max(values, context) {
    return false;
};

function fnc_geom_from_wkt(values, context) {
    return false;
};

function fnc_geom_from_gml(values, context) {
    return false;
};

function fnc_relate(values, context) {
    return false;
};

function fnc_intersects_bbox(values, context) {
    return false;
};

function fnc_disjoint(values, context) {
    return false;
};

function fnc_intersects(values, context) {
    return false;
};

function fnc_touches(values, context) {
    return false;
};

function fnc_crosses(values, context) {
    return false;
};

function fnc_contains(values, context) {
    return false;
};

function fnc_overlaps(values, context) {
    return false;
};

function fnc_within(values, context) {
    return false;
};

function fnc_translate(values, context) {
    return false;
};

function fnc_buffer(values, context) {
    return false;
};

function fnc_centroid(values, context) {
    return false;
};

function fnc_point_on_surface(values, context) {
    return false;
};

function fnc_reverse(values, context) {
    return false;
};

function fnc_exterior_ring(values, context) {
    return false;
};

function fnc_interior_ring_n(values, context) {
    return false;
};

function fnc_geometry_n(values, context) {
    return false;
};

function fnc_boundary(values, context) {
    return false;
};

function fnc_line_merge(values, context) {
    return false;
};

function fnc_bounds(values, context) {
    return false;
};

function fnc_num_points(values, context) {
    return false;
};

function fnc_num_interior_rings(values, context) {
    return false;
};

function fnc_num_rings(values, context) {
    return false;
};

function fnc_num_geometries(values, context) {
    return false;
};

function fnc_bounds_width(values, context) {
    return false;
};

function fnc_bounds_height(values, context) {
    return false;
};

function fnc_is_closed(values, context) {
    return false;
};

function fnc_convex_hull(values, context) {
    return false;
};

function fnc_difference(values, context) {
    return false;
};

function fnc_distance(values, context) {
    return false;
};

function fnc_intersection(values, context) {
    return false;
};

function fnc_sym_difference(values, context) {
    return false;
};

function fnc_combine(values, context) {
    return false;
};

function fnc_union(values, context) {
    return false;
};

function fnc_geom_to_wkt(values, context) {
    return false;
};

function fnc_geometry(values, context) {
    return false;
};

function fnc_transform(values, context) {
    return false;
};

function fnc_extrude(values, context) {
    return false;
};

function fnc_order_parts(values, context) {
    return false;
};

function fnc_closest_point(values, context) {
    return false;
};

function fnc_shortest_line(values, context) {
    return false;
};

function fnc_line_interpolate_point(values, context) {
    return false;
};

function fnc_line_interpolate_angle(values, context) {
    return false;
};

function fnc_line_locate_point(values, context) {
    return false;
};

function fnc_angle_at_vertex(values, context) {
    return false;
};

function fnc_distance_to_vertex(values, context) {
    return false;
};

function fnc_uuid(values, context) {
    return false;
};

function fnc_get_feature(values, context) {
    return false;
};

function fnc_layer_property(values, context) {
    return false;
};

function fnc_var(values, context) {
    return false;
};

function fnc_eval(values, context) {
    return false;
};

function fnc_attribute(values, context) {
    return false;
};

function fnc__specialcol_(values, context) {
    return false;
};

function fnc_project_color(values, context) {
    return false;
};


function exp_public_green_spaces_rule0_eval_expression(context) {
    // "subtype_fr" = 'Associé à la voirie'

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('subtype_fr')  == 'Associé à la voirie');
    } else {
        return (feature.get('subtype_fr')  == 'Associé à la voirie');
    }
}


function exp_public_green_spaces_rule1_eval_expression(context) {
    // "subtype_fr" = 'Bois'

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('subtype_fr')  == 'Bois');
    } else {
        return (feature.get('subtype_fr')  == 'Bois');
    }
}


function exp_public_green_spaces_rule2_eval_expression(context) {
    // "subtype_fr" = 'Cimetière'

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('subtype_fr')  == 'Cimetière');
    } else {
        return (feature.get('subtype_fr')  == 'Cimetière');
    }
}


function exp_public_green_spaces_rule3_eval_expression(context) {
    // "subtype_fr" = 'Etang et berge en milieu urbain'

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('subtype_fr')  == 'Etang et berge en milieu urbain');
    } else {
        return (feature.get('subtype_fr')  == 'Etang et berge en milieu urbain');
    }
}


function exp_public_green_spaces_rule4_eval_expression(context) {
    // "subtype_fr" = 'N/A'

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('subtype_fr')  == 'N/A');
    } else {
        return (feature.get('subtype_fr')  == 'N/A');
    }
}


function exp_public_green_spaces_rule5_eval_expression(context) {
    // "subtype_fr" = 'Non-aménagé'

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('subtype_fr')  == 'Non-aménagé');
    } else {
        return (feature.get('subtype_fr')  == 'Non-aménagé');
    }
}


function exp_public_green_spaces_rule6_eval_expression(context) {
    // "subtype_fr" = 'Parc et square'

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('subtype_fr')  == 'Parc et square');
    } else {
        return (feature.get('subtype_fr')  == 'Parc et square');
    }
}


function exp_md_road_occ_morning_rule0_eval_expression(context) {
    // "morning" < 0

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('morning')  < 0);
    } else {
        return (feature.get('morning')  < 0);
    }
}


function exp_md_road_occ_morning_rule1_eval_expression(context) {
    // "morning" >= 20.94 AND "morning" <= 34.13

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('morning')  >= 20.94) && (feature.get('morning')  <= 34.13));
    } else {
        return ((feature.get('morning')  >= 20.94) && (feature.get('morning')  <= 34.13));
    }
}


function exp_md_road_occ_morning_rule2_eval_expression(context) {
    // "morning" > 34.13 AND "morning" <= 43.62

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('morning')  > 34.13) && (feature.get('morning')  <= 43.62));
    } else {
        return ((feature.get('morning')  > 34.13) && (feature.get('morning')  <= 43.62));
    }
}


function exp_md_road_occ_morning_rule3_eval_expression(context) {
    // "morning" > 43.62 AND "morning" <= 52.63

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('morning')  > 43.62) && (feature.get('morning')  <= 52.63));
    } else {
        return ((feature.get('morning')  > 43.62) && (feature.get('morning')  <= 52.63));
    }
}


function exp_md_road_occ_morning_rule4_eval_expression(context) {
    // "morning" > 52.63 AND "morning" <= 65.21

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('morning')  > 52.63) && (feature.get('morning')  <= 65.21));
    } else {
        return ((feature.get('morning')  > 52.63) && (feature.get('morning')  <= 65.21));
    }
}


function exp_md_road_occ_morning_rule5_eval_expression(context) {
    // "morning" > 65.21 AND "morning" <= 87.44

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('morning')  > 65.21) && (feature.get('morning')  <= 87.44));
    } else {
        return ((feature.get('morning')  > 65.21) && (feature.get('morning')  <= 87.44));
    }
}


function exp_md_road_occ_evening_rule0_eval_expression(context) {
    // "evening" < 0

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('evening')  < 0);
    } else {
        return (feature.get('evening')  < 0);
    }
}


function exp_md_road_occ_evening_rule1_eval_expression(context) {
    // "evening" >= 20.94 AND "evening" <= 34.13

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('evening')  >= 20.94) && (feature.get('evening')  <= 34.13));
    } else {
        return ((feature.get('evening')  >= 20.94) && (feature.get('evening')  <= 34.13));
    }
}


function exp_md_road_occ_evening_rule2_eval_expression(context) {
    // "evening" > 34.13 AND "evening" <= 43.62

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('evening')  > 34.13) && (feature.get('evening')  <= 43.62));
    } else {
        return ((feature.get('evening')  > 34.13) && (feature.get('evening')  <= 43.62));
    }
}


function exp_md_road_occ_evening_rule3_eval_expression(context) {
    // "evening" > 43.62 AND "evening" <= 52.63

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('evening')  > 43.62) && (feature.get('evening')  <= 52.63));
    } else {
        return ((feature.get('evening')  > 43.62) && (feature.get('evening')  <= 52.63));
    }
}


function exp_md_road_occ_evening_rule4_eval_expression(context) {
    // "evening" > 52.63 AND "evening" <= 65.21

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('evening')  > 52.63) && (feature.get('evening')  <= 65.21));
    } else {
        return ((feature.get('evening')  > 52.63) && (feature.get('evening')  <= 65.21));
    }
}


function exp_md_road_occ_evening_rule5_eval_expression(context) {
    // "evening" > 65.21 AND "evening" <= 87.44

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('evening')  > 65.21) && (feature.get('evening')  <= 87.44));
    } else {
        return ((feature.get('evening')  > 65.21) && (feature.get('evening')  <= 87.44));
    }
}


function exp_md_households_size_rule0_eval_expression(context) {
    // "households" < 0

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('households')  < 0);
    } else {
        return (feature.get('households')  < 0);
    }
}


function exp_md_households_size_rule1_eval_expression(context) {
    // "households_size" >= 1.44879 AND "households_size" <= 1.83148

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('households_size')  >= 1.44877) && (feature.get('households_size')  <= 1.83148));
    } else {
        return ((feature.get('households_size')  >= 1.44877) && (feature.get('households_size')  <= 1.83148));
    }
}


function exp_md_households_size_rule2_eval_expression(context) {
    // "households_size" > 1.83148 AND "households_size" <= 2.11101

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('households_size')  > 1.83148) && (feature.get('households_size')  <= 2.11101));
    } else {
        return ((feature.get('households_size')  > 1.83148) && (feature.get('households_size')  <= 2.11101));
    }
}


function exp_md_households_size_rule3_eval_expression(context) {
    // "households_size" > 2.11101 AND "households_size" <= 2.38151

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('households_size')  > 2.11101) && (feature.get('households_size')  <= 2.38151));
    } else {
        return ((feature.get('households_size')  > 2.11101) && (feature.get('households_size')  <= 2.38151));
    }
}


function exp_md_households_size_rule4_eval_expression(context) {
    // "households_size" > 2.38151 AND "households_size" <= 2.69238

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('households_size')  > 2.38151) && (feature.get('households_size')  <= 2.69238));
    } else {
        return ((feature.get('households_size')  > 2.38151) && (feature.get('households_size')  <= 2.69238));
    }
}


function exp_md_households_size_rule5_eval_expression(context) {
    // "households_size" > 2.69238 AND "households_size" <= 3.625

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('households_size')  > 2.69238) && (feature.get('households_size')  <= 3.625));
    } else {
        return ((feature.get('households_size')  > 2.69238) && (feature.get('households_size')  <= 3.625));
    }
}


function exp_md_households_size_rule6_eval_expression(context) {
    // "households" IS NULL

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('households')  === null);
    } else {
        return (feature.get('households')  === null);
    }
}


function exp_md_densite_rule0_eval_expression(context) {
    // "densite" > 0 AND "densite" <= 3.4544

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('densite')  > 0) && (feature.get('densite')  <= 3.4544));
    } else {
        return ((feature.get('densite')  > 0) && (feature.get('densite')  <= 3.4544));
    }
}


function exp_md_densite_rule1_eval_expression(context) {
    // "densite" > 3.4544 AND "densite" <= 8.8538

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('densite')  > 3.4544) && (feature.get('densite')  <= 8.8538));
    } else {
        return ((feature.get('densite')  > 3.4544) && (feature.get('densite')  <= 8.8538));
    }
}


function exp_md_densite_rule2_eval_expression(context) {
    // "densite" > 8.8538 AND "densite" <= 15.1649

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('densite')  > 8.8538) && (feature.get('densite')  <= 15.1649));
    } else {
        return ((feature.get('densite')  > 8.8538) && (feature.get('densite')  <= 15.1649));
    }
}


function exp_md_densite_rule3_eval_expression(context) {
    // "densite" > 15.1649 AND "densite" <= 20.9955

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('densite')  > 15.1649) && (feature.get('densite')  <= 20.9955));
    } else {
        return ((feature.get('densite')  > 15.1649) && (feature.get('densite')  <= 20.9955));
    }
}


function exp_md_densite_rule4_eval_expression(context) {
    // "densite" > 20.9955 AND "densite" <= 34.7622

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('densite')  > 20.9955) && (feature.get('densite')  <= 34.7622));
    } else {
        return ((feature.get('densite')  > 20.9955) && (feature.get('densite')  <= 34.7622));
    }
}


function exp_md_densite_rule5_eval_expression(context) {
    // "population" IS NULL

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('population')  === null);
    } else {
        return (feature.get('population')  === null);
    }
}


function exp_md_noise_ln_rule0_eval_expression(context) {
    // "ln" >= 41.5 AND "ln" <= 45.35

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('ln')  >= 41.5) && (feature.get('ln')  <= 45.35));
    } else {
        return ((feature.get('ln')  >= 41.5) && (feature.get('ln')  <= 45.35));
    }
}


function exp_md_noise_ln_rule1_eval_expression(context) {
    // "ln" > 45.35 AND "ln" <= 49.36

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('ln')  > 45.35) && (feature.get('ln')  <= 49.36));
    } else {
        return ((feature.get('ln')  > 45.35) && (feature.get('ln')  <= 49.36));
    }
}


function exp_md_noise_ln_rule2_eval_expression(context) {
    // "ln" > 49.36 AND "ln" <= 52.85

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('ln')  > 49.36) && (feature.get('ln')  <= 52.85));
    } else {
        return ((feature.get('ln')  > 49.36) && (feature.get('ln')  <= 52.85));
    }
}


function exp_md_noise_ln_rule3_eval_expression(context) {
    // "ln" > 52.85 AND "ln" <= 57.7

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('ln')  > 52.85) && (feature.get('ln')  <= 57.7));
    } else {
        return ((feature.get('ln')  > 52.85) && (feature.get('ln')  <= 57.7));
    }
}


function exp_md_noise_ln_rule4_eval_expression(context) {
    // "ln" > 57.7 AND "ln" <= 63.77

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('ln')  > 57.7) && (feature.get('ln')  <= 63.77));
    } else {
        return ((feature.get('ln')  > 57.7) && (feature.get('ln')  <= 63.77));
    }
}


function exp_md_noise_lden_rule0_eval_expression(context) {
    // "lden" >= 49.29 AND "lden" <= 53.81

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('lden')  >= 49.29) && (feature.get('lden')  <= 53.81));
    } else {
        return ((feature.get('lden')  >= 49.29) && (feature.get('lden')  <= 53.81));
    }
}


function exp_md_noise_lden_rule1_eval_expression(context) {
    // "lden" > 53.81 AND "lden" <= 57.24

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('lden')  > 53.81) && (feature.get('lden')  <= 57.24));
    } else {
        return ((feature.get('lden')  > 53.81) && (feature.get('lden')  <= 57.24));
    }
}


function exp_md_noise_lden_rule2_eval_expression(context) {
    // "lden" > 57.24 AND "lden" <= 60.4

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('lden')  > 57.24) && (feature.get('lden')  <= 60.4));
    } else {
        return ((feature.get('lden')  > 57.24) && (feature.get('lden')  <= 60.4));
    }
}


function exp_md_noise_lden_rule3_eval_expression(context) {
    // "lden" > 60.4 AND "lden" <= 64.55

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('lden')  > 60.4) && (feature.get('lden')  <= 64.55));
    } else {
        return ((feature.get('lden')  > 60.4) && (feature.get('lden')  <= 64.55));
    }
}


function exp_md_noise_lden_rule4_eval_expression(context) {
    // "lden" > 64.55 AND "lden" <= 71.44

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('lden')  > 64.55) && (feature.get('lden')  <= 71.44));
    } else {
        return ((feature.get('lden')  > 64.55) && (feature.get('lden')  <= 71.44));
    }
}


function exp_md_surfaces_veg_rule0_eval_expression(context) {
    // "surfaces_veg" >= 4 AND "surfaces_veg" <= 21

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_veg')  >= 4) && (feature.get('surfaces_veg')  <= 21));
    } else {
        return ((feature.get('surfaces_veg')  >= 4) && (feature.get('surfaces_veg')  <= 21));
    }
}


function exp_md_surfaces_veg_rule1_eval_expression(context) {
    // "surfaces_veg" > 21 AND "surfaces_veg" <= 36

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_veg')  > 21) && (feature.get('surfaces_veg')  <= 36));
    } else {
        return ((feature.get('surfaces_veg')  > 21) && (feature.get('surfaces_veg')  <= 36));
    }
}


function exp_md_surfaces_veg_rule2_eval_expression(context) {
    // "surfaces_veg" > 36 AND "surfaces_veg" <= 53

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_veg')  > 36) && (feature.get('surfaces_veg')  <= 53));
    } else {
        return ((feature.get('surfaces_veg')  > 36) && (feature.get('surfaces_veg')  <= 53));
    }
}


function exp_md_surfaces_veg_rule3_eval_expression(context) {
    // "surfaces_veg" > 53 AND "surfaces_veg" <= 73

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_veg')  > 53) && (feature.get('surfaces_veg')  <= 73));
    } else {
        return ((feature.get('surfaces_veg')  > 53) && (feature.get('surfaces_veg')  <= 73));
    }
}


function exp_md_surfaces_veg_rule4_eval_expression(context) {
    // "surfaces_veg" > 73 AND "surfaces_veg" <= 97

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_veg')  > 73) && (feature.get('surfaces_veg')  <= 97));
    } else {
        return ((feature.get('surfaces_veg')  > 73) && (feature.get('surfaces_veg')  <= 97));
    }
}


function exp_md_surfaces_imp_rule0_eval_expression(context) {
    // "surfaces_imp" >= 2.28 AND "surfaces_imp" <= 28.5

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_imp')  >= 2.28) && (feature.get('surfaces_imp')  <= 28.5));
    } else {
        return ((feature.get('surfaces_imp')  >= 2.28) && (feature.get('surfaces_imp')  <= 28.5));
    }
}


function exp_md_surfaces_imp_rule1_eval_expression(context) {
    // "surfaces_imp" > 28.5 AND "surfaces_imp" <= 53.3

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_imp')  > 28.5) && (feature.get('surfaces_imp')  <= 53.3));
    } else {
        return ((feature.get('surfaces_imp')  > 28.5) && (feature.get('surfaces_imp')  <= 53.3));
    }
}


function exp_md_surfaces_imp_rule2_eval_expression(context) {
    // "surfaces_imp" > 53.3 AND "surfaces_imp" <= 70.1

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_imp')  > 53.3) && (feature.get('surfaces_imp')  <= 70.1));
    } else {
        return ((feature.get('surfaces_imp')  > 53.3) && (feature.get('surfaces_imp')  <= 70.1));
    }
}


function exp_md_surfaces_imp_rule3_eval_expression(context) {
    // "surfaces_imp" > 70.1 AND "surfaces_imp" <= 84.2

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_imp')  > 70.1) && (feature.get('surfaces_imp')  <= 84.2));
    } else {
        return ((feature.get('surfaces_imp')  > 70.1) && (feature.get('surfaces_imp')  <= 84.2));
    }
}


function exp_md_surfaces_imp_rule4_eval_expression(context) {
    // "surfaces_imp" > 84.2 AND "surfaces_imp" <= 98.6

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('surfaces_imp')  > 84.2) && (feature.get('surfaces_imp')  <= 98.6));
    } else {
        return ((feature.get('surfaces_imp')  > 84.2) && (feature.get('surfaces_imp')  <= 98.6));
    }
}

function exp_md_green_spaces_rule0_eval_expression(context) {
    // "green_spaces" >= 3.56 AND "green_spaces" <= 40.61

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('green_spaces')  >= 3.56) && (feature.get('green_spaces')  <= 40.61));
    } else {
        return ((feature.get('green_spaces')  >= 3.56) && (feature.get('green_spaces')  <= 40.61));
    }
}


function exp_md_green_spaces_rule1_eval_expression(context) {
    // "green_spaces" > 40.61 AND "green_spaces" <= 63.91

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('green_spaces')  > 40.61) && (feature.get('green_spaces')  <= 63.91));
    } else {
        return ((feature.get('green_spaces')  > 40.61) && (feature.get('green_spaces')  <= 63.91));
    }
}


function exp_md_green_spaces_rule2_eval_expression(context) {
    // "green_spaces" > 63.91 AND "green_spaces" <= 78.32

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('green_spaces')  > 63.91) && (feature.get('green_spaces')  <= 78.32));
    } else {
        return ((feature.get('green_spaces')  > 63.91) && (feature.get('green_spaces')  <= 78.32));
    }
}


function exp_md_green_spaces_rule3_eval_expression(context) {
    // "green_spaces" > 78.32 AND "green_spaces" <= 91.88

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('green_spaces')  > 78.32) && (feature.get('green_spaces')  <= 91.88));
    } else {
        return ((feature.get('green_spaces')  > 78.32) && (feature.get('green_spaces')  <= 91.88));
    }
}


function exp_md_green_spaces_rule4_eval_expression(context) {
    // "green_spaces" > 91.88 AND "green_spaces" <= 100

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('green_spaces')  > 91.88) && (feature.get('green_spaces')  <= 100));
    } else {
        return ((feature.get('green_spaces')  > 91.88) && (feature.get('green_spaces')  <= 100));
    }
}


function exp_md_green_spaces_rule5_eval_expression(context) {
    // "green_spaces" IS NULL

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('green_spaces')  === null);
    } else {
        return (feature.get('green_spaces')  === null);
    }
}

function exp_md_gardens_rel_rule0_eval_expression(context) {
    // "gardens_rel" < 0

    var feature = context.feature;
    
    if (feature.properties) {
        return (feature.get('gardens_rel')  < 0);
    } else {
        return (feature.get('gardens_rel')  < 0);
    }
}


function exp_md_gardens_rel_rule1_eval_expression(context) {
    // "gardens_rel" >= 4.08 AND "gardens_rel" <= 16.98

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('gardens_rel')  >= 4.08) && (feature.get('gardens_rel')  <= 16.98));
    } else {
        return ((feature.get('gardens_rel')  >= 4.08) && (feature.get('gardens_rel')  <= 16.98));
    }
}


function exp_md_gardens_rel_rule2_eval_expression(context) {
    // "gardens_rel" > 16.98 AND "gardens_rel" <= 29.8

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('gardens_rel')  > 16.98) && (feature.get('gardens_rel')  <= 29.8));
    } else {
        return ((feature.get('gardens_rel')  > 16.98) && (feature.get('gardens_rel')  <= 29.8));
    }
}


function exp_md_gardens_rel_rule3_eval_expression(context) {
    // "gardens_rel" > 29.8 AND "gardens_rel" <= 45.95

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('gardens_rel')  > 29.8) && (feature.get('gardens_rel')  <= 45.95));
    } else {
        return ((feature.get('gardens_rel')  > 29.8) && (feature.get('gardens_rel')  <= 45.95));
    }
}


function exp_md_gardens_rel_rule4_eval_expression(context) {
    // "gardens_rel" > 45.95 AND "gardens_rel" <= 66.87

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('gardens_rel')  > 45.95) && (feature.get('gardens_rel')  <= 66.87));
    } else {
        return ((feature.get('gardens_rel')  > 45.95) && (feature.get('gardens_rel')  <= 66.87));
    }
}


function exp_md_gardens_rel_rule5_eval_expression(context) {
    // "gardens_rel" > 66.87 AND "gardens_rel" <= 91.44

    var feature = context.feature;
    
    if (feature.properties) {
        return ((feature.get('gardens_rel')  > 66.87) && (feature.get('gardens_rel')  <= 91.44));
    } else {
        return ((feature.get('gardens_rel')  > 66.87) && (feature.get('gardens_rel')  <= 91.44));
    }
}