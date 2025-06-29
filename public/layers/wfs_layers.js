function checkAvailabilityWithTimeout(url, onSuccess, onFallback, timeout = 0) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    fetch(url, { method: 'HEAD', signal })
    .then(response => {
        clearTimeout(timeoutId);
        if (response.ok) {
        console.log(`Service disponible: ${url}`);
        onSuccess();
        } else {
        console.warn(`Service non OK (${response.status}), fallback`);
        onFallback();
        }
    })
    .catch(error => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
        console.warn('Timeout atteint, fallback');
        } else {
        console.warn('Erreur de connexion, fallback');
        }
        onFallback();
    });
}
  
function createWfsLayer(options) {
    const {
        typeName,
        title,
        popuplayertitle = '',
        style,
        leg,
        display,
        hoverStyle = null,
        opacity = 1.0,
        timeout = 2000,
        cluster = false,
        clusterDistance = 40
    } = options;

    const vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function (extent, resolution, projection) {
            const wfsLocal = `${localUrl}/geoserver/green_brussels/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=green_brussels:${typeName}&outputFormat=application/json&srsname=EPSG:3857`;
            const wfsUrl = `${serviceUrl}/geoserver/green_brussels/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=green_brussels:${typeName}&outputFormat=application/json&srsname=EPSG:3857`;

            function loadData(url) {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        const features = new ol.format.GeoJSON().readFeatures(data, {
                            dataProjection: 'EPSG:3857',
                            featureProjection: projection.getCode()
                        });
                        vectorSource.addFeatures(features);
                    })
                    .catch(err => {
                        console.error(`Erreur chargement données pour ${typeName}:`, err);
                    });
            }

            checkAvailabilityWithTimeout(
                wfsUrl,
                () => loadData(wfsUrl),
                () => loadData(wfsLocal),
                timeout
            );
        }
    });

    const source = cluster
        ? new ol.source.Cluster({
            distance: clusterDistance,
            source: vectorSource
        })
        : vectorSource;

    const layer = new ol.layer.Vector({
        source: source,
        title: title,
        popuplayertitle: popuplayertitle,
        interactive: true,
        style: style,
        leg: leg,
        display: display,
        hoverStyle: hoverStyle,
        opacity: opacity
    });

    return layer;
}

// === COUCHES ===
const lyr_municipalities = createWfsLayer({
    typeName: 'municipalities',
    title: 'Limites communales',
    popuplayertitle: 'Commune',
    style: style_transp,
    hoverStyle: 'blueHover',
    display: 'always_on',
    opacity: 1.0,
    interactive: true
});

const lyr_public_green_spaces = createWfsLayer({
    typeName: 'public_green_spaces',
    title: 'Espaces verts publics',
    popuplayertitle: 'Espace vert',
    style: style_transp,
    hoverStyle: 'greenHover',
    opacity: 1.0,
    interactive: true
});

var lyr_trees_be = createWfsLayer({
    typeName: 'trees_be',
    title: 'Arbres gérés par BE',
    popuplayertitle: 'Arbre',
    style: style_trees_be,
    leg: 'leg_trees',
    display: 'always_on',
    opacity: 1.0,
    interactive: true,
    cluster: true
}); 

const lyr_md_gardens_nb = createWfsLayer({
    typeName: 'md_green_spaces',
    title: 'Nombre total de jardins',
    popuplayertitle: 'Nombre de jardins privés',
    style: style_md_gardens_nb,
    leg: 'leg_md_gardens_nb',
    display: 'always_on',
    opacity: 1.0,
    interactive: true
});

const lyr_md_gardens_rel = createWfsLayer({
    typeName: 'md_green_spaces',
    title: 'Part des ménages disposant d\'un jardin',
    popuplayertitle: 'Part de jardins privés (%)',
    style: style_md_gardens_rel,
    leg: 'leg_md_gardens_rel',
    opacity: 1.0,
    interactive: true
});

const lyr_md_green_spaces = createWfsLayer({
    typeName: 'md_green_spaces',
    title: 'Accès aux espaces verts (%)',
    popuplayertitle: 'Part des ménages à proximité d\'un espace vert',
    style: style_md_green_spaces,
    leg: 'leg_md_green_spaces',
    opacity: 1.0,
    interactive: true
});

const lyr_md_surfaces_imp = createWfsLayer({
    typeName: 'md_green_spaces',
    title: 'Part des surfaces imperméables',
    popuplayertitle: 'Surfaces imperméables (%)',
    style: style_md_surfaces_imp,
    leg: 'leg_md_surfaces_imp',
    opacity: 1.0,
    interactive: true
});

const lyr_md_surfaces_veg = createWfsLayer({
    typeName: 'md_green_spaces',
    title: 'Part des surfaces végétalisées',
    popuplayertitle: 'Surfaces végétalisées (%)',
    style: style_md_surfaces_veg,
    leg: 'leg_md_surfaces_veg',
    opacity: 1.0,
    interactive: true
});

const lyr_md_densite = createWfsLayer({
    typeName: 'md_population',
    title: 'Densité de population',
    popuplayertitle: 'Densité (hab / km²)',
    style: style_md_densite,
    leg: 'leg_md_densite',
    opacity: 1.0,
    interactive: true
});

const lyr_md_households_size = createWfsLayer({
    typeName: 'md_population',
    title: 'Taille moyenne des ménages',
    popuplayertitle: 'Taille des ménages',
    style: style_md_households_size,
    leg: 'leg_md_households_size',
    opacity: 1.0,
    interactive: true
});

const lyr_md_noise_lden = createWfsLayer({
    typeName: 'md_noise',
    title: 'Pollution sonore (lden)',
    popuplayertitle: 'Bruit (db)',
    style: style_md_noise_lden,
    leg: 'leg_md_noise_lden',
    opacity: 1.0,
    interactive: true
});

const lyr_md_noise_ln = createWfsLayer({
    typeName: 'md_noise',
    title: 'Pollution sonore (ln)',
    popuplayertitle: 'Bruit (db)',
    style: style_md_noise_ln,
    leg: 'leg_md_noise_ln',
    opacity: 1.0,
    interactive: true
});

const lyr_md_road_occ_morning = createWfsLayer({
    typeName: 'md_road_occupancy',
    title: 'Taux d\'occupation de la voirie entre 8h et 9h',
    popuplayertitle: 'Occupation de la voirie (%)',
    style: style_md_road_occ_morning,
    leg: 'leg_md_road_occ_morning',
    opacity: 1.0,
    interactive: true
});

const lyr_md_road_occ_evening = createWfsLayer({
    typeName: 'md_road_occupancy',
    title: 'Taux d\'occupation de la voirie entre 17h et 18h',
    popuplayertitle: 'Occupation de la voirie (%)',
    style: style_md_road_occ_evening,
    leg: 'leg_md_road_occ_evening',
    opacity: 1.0,
    interactive: true
});