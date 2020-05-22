mapboxgl.accessToken = 'pk.eyJ1IjoiY29sbGk2NDg1IiwiYSI6ImNrMXNiZHQ1bzBlOTgzY28yMDdsamdncTkifQ.djpUCs34JkPsgWu70lUr_g';

// var dataURL = 'http://127.0.0.1:3000/v1/geojson/pole?geom_column=pole_position&columns=pole_id&filter=pole_id%20in%20(123%2C%20133%2C%20143%2C%20153)'
var baseURL = 'http://voyager.technology/pinellas/data/'
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    // style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [-82.63045481401142,27.829026662922715], // starting position [lng, lat]
    zoom: 14, // starting zoom
    minZoom: 12
});

map.on('load', function () {
    var bounds = '&bounds=' + [map.getBounds()["_sw"].lng, map.getBounds()["_sw"].lat, map.getBounds()["_ne"].lng, map.getBounds()["_ne"].lat].join()

    map.addSource('crash_cluster_source', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: baseURL + 'v1/geojson/crash?geom_column=geom&columns=eventyear&filter=eventyear%20%3E%3D%202016' + bounds,
        cluster: true,
        clusterMaxZoom: 15, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });


    // map.addSource('crash_cluster_source', {
    //     type: 'vector',
    //     tiles: [baseURL + 'mvt/crash/{z}/{x}/{y}?geom_column=geom&columns=HSMV,eventyear'],
    //     cluster: true,
    //     clusterMaxZoom: 18, // Max zoom to cluster points on
    //     clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    // });

    map.addLayer({
        id: 'crash_layer',
        source: {
            type: 'vector',
            tiles: [baseURL + 'mvt/crash/{z}/{x}/{y}?geom_column=geom&columns=HSMV,eventyear'],
        },
        'source-layer': 'crash',
        'filter': ['in', 'eventyear', 2016, 2017, 2018, 2019, 2020],
        minzoom: 15,
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': '#ffa500',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
            'circle-opacity': {
                stops: [
                    [15, 0],
                    [16, 1]
                ]
            }
        }
    });
    // map.addLayer({
    //     id: 'crash_heatmap',
    //     type: 'heatmap',
    //     source: {
    //         type: 'vector',
    //         tiles: [baseURL + 'mvt/crash/{z}/{x}/{y}?geom_column=geom&columns=HSMV,eventyear']
    //     },
    //     'source-layer': 'crash',
    //     'filter': ['in', 'eventyear', 2016, 2017, 2018, 2019, 2020],
    //     // filter: ['in', 'highestseverity', 'Fatal', 'Incapacitating'],
    //     // 'source-layer': 'crash_layer',
    //     maxzoom: 16,
    //     paint: {
    //         'heatmap-weight': {
    //             property: 'dbh',
    //             type: 'exponential',
    //             stops: [
    //                 [1, 0],
    //                 [62, 1]
    //             ]
    //         },
    //         // increase intensity as zoom level increases
    //         'heatmap-intensity': {
    //             stops: [
    //                 [11, 0.01],
    //                 [15, 0.5]
    //             ]
    //         },
    //         // assign color values be applied to points depending on their density
    //         'heatmap-color': [
    //             'interpolate',
    //             ['linear'],
    //             ['heatmap-density'],
    //             0, 'rgba(0,61,115,0)',
    //             // 0.2, 'rgb(208,209,230)',
    //             // 0.4, 'rgb(166,189,219)',
    //             0.5, 'rgb(7,135,164)',
    //             // 0.6, 'rgb(103,169,207)',
    //             // 0.8, 'rgb(20,60,100)',
    //             1, 'rgb(30,207,214)'
    //         ],
    //         // increase radius as zoom increases
    //         'heatmap-radius': {
    //             stops: [
    //                 [11, 15],
    //                 [15, 5]
    //             ]
    //         },
    //         // decrease opacity to transition into the circle layer
    //         'heatmap-opacity': {
    //             default: 1,
    //             stops: [
    //                 [15, 1],
    //                 [16, 0]
    //             ]
    //         }
    //     }
    // });

    map.addLayer({
        'id': 'clusters',
        'type': 'circle',
        'source': 'crash_cluster_source',
        'filter': ['has', 'point_count'],
        'paint': {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
            ],
            'circle-radius': 20
            //     'step',
            //     ['get', 'point_count'],
            //     20,
            //     100,
            //     30,
            //     750,
            //     40
            // ]
        }
    });
    map.addLayer({
        'id': 'cluster-count',
        'type': 'symbol',
        'source': 'crash_cluster_source',
        'filter': ['has', 'point_count'],
        'layout': {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.on('moveend', function(event) {
        console.log(map.getZoom())
        var bounds = '&bounds=' + [map.getBounds()["_sw"].lng, map.getBounds()["_sw"].lat, map.getBounds()["_ne"].lng, map.getBounds()["_ne"].lat].join()
        var dataURL = baseURL + 'v1/geojson/crash?geom_column=geom&columns=eventyear&filter=eventyear%20%3E%3D%202016';
        fetch(dataURL + bounds).then(response => {return response.json()}).then(data => {
            map.getSource('crash_cluster_source').setData(data);
        })
    })
    map.on('mouseenter', 'crash_layer', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'crash_layer', function () {
        map.getCanvas().style.cursor = '';
    });
    map.on('click', 'crash_layer', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var crashid = e.features[0].properties.hsmv;
        var crashInfoURL = baseURL + 'query/crash?columns=*&filter=hsmv%20%3D%20%27' + crashid + '%27';

        fetch(crashInfoURL).then(response => {return response.json()}).then(data => {
            var featureData = data[0];
            var html = '<h5>Crash Information</h5>';
            html += '<div style="overflow-y: scroll; overflow-x: hidden; max-height: 300px;">';
            html += '<table class="table table-striped">';
            for (var property in featureData) {
               if (featureData.hasOwnProperty(property)) {
                   var value = featureData[property];
                   if (value) {
                       html += '<tr><td>' + property + '</td><td>' + value.toString() + '</tr>';
                   }
               }
            }
            html += '</table></div>';

            new mapboxgl.Popup()
               .setLngLat(coordinates)
               .setMaxWidth('400px')
               .setHTML(html)
               .addTo(map);
       })
    });

    document.querySelectorAll('.visualizationToggle').forEach(element => {
        element.addEventListener('click', updateFilters);
    });

    function updateFilters() {
        this.classList.toggle('selected')

        let toggles = document.getElementsByClassName('visualizationToggle selected');
        let crashLayerFilter = ['in', 'eventyear'];

        for(let i = 0; i < toggles.length; i++)
        {
            let toggle = toggles[i];
            let dataLayerValue = toggle.getAttribute('data-layer-value');
            let dataLayer = toggle.getAttribute('data-layer');

            if (toggle.classList.contains('selected')) {
                crashLayerFilter.push(parseInt(dataLayerValue));
            }
        }

        map.setFilter('crash_layer', crashLayerFilter)
        map.setFilter('crash_heatmap', crashLayerFilter)
    };
});
