require({
    packages: [
        {
            name: 'dgrid',
            location: '//unpkg.com/dgrid@1.1.0/'
        },
        {
            name: 'dstore',
            location: '//unpkg.com/dojo-dstore@1.1.1/'
        }
    ]
},[
    'dgrid/Grid',
    'https://api.tiles.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.js',
    'dijit/ConfirmDialog',
    'dijit/Dialog',
    'dijit/dijit',
    'dijit/form/Button',
    'dijit/form/CheckBox',
    'dijit/form/DateTextBox',
    'dijit/form/NumberSpinner',
    'dijit/form/RadioButton',
    'dijit/form/HorizontalSlider',
    'dijit/form/HorizontalRule',
    'dijit/form/HorizontalRuleLabels',
    'dijit/form/TimeTextBox',
    'dijit/layout/AccordionContainer',
    'dijit/layout/BorderContainer',
    'dijit/layout/ContentPane',
    'dijit/layout/TabContainer',
    'dojo/_base/Color',
    'dojo/_base/event',
    'dojo/_base/fx',
    'dojo/dnd/Moveable',
    'dojo/dom',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/fx',
    'dojo/fx/Toggler',
    'dojo/mouse',
    'dojo/on',
    'dojo/promise/all',
    'dojo/query',
    'dojo/store/Memory',
    'dojo/window',
    'dojox/form/RangeSlider',
    'dojox/layout/FloatingPane',
    'dojox/charting/Chart',
    'dojox/charting/axis2d/Default',
    'dojox/charting/plot2d/Lines',
    'dojox/charting/plot2d/Pie',
    'dojox/charting/plot2d/ClusteredColumns',
    'dojox/charting/action2d/Highlight',
    'dojox/charting/action2d/MoveSlice',
    'dojox/charting/action2d/Tooltip',
    'dojox/charting/widget/Legend',
    'dojox/charting/widget/SelectableLegend',
    'dojox/charting/themes/Julie',
    'dojox/charting/themes/MiamiNice',

    'dojo/NodeList-traverse',
    'dojox/widget/Standby',
    'dojo/domReady!'
], function (

    Grid,
    mapboxgl,
    ConfirmDialog, Dialog, dijit, Button, CheckBox, DateTextBox, NumberSpinner, RadioButton, HorizontalSlider, HorizontalRule, HorizontalRuleLabels, TimeTextBox, AccordionContainer, BorderContainer, ContentPane, TabContainer,
    Color, event, fx,
    move,
    dom, domAttr, domClass, domConstruct, domGeom, domStyle,
    coreFx, Toggler,
    mouse,
    on,
    all,
    query,
    Memory,
    win,
    RangeSlider, FloatingPane, Chart, Default, Lines, Pie, ClusteredColumns, Highlight, MoveSlice, Tooltip, Legend, SelectableLegend, Julie, MiamiNice
) {
        // Main Map Server and Layers
        var baseURL = 'http://voyager.technology/pinellas/data/'
        // var baseURL = 'https://www.njvoyager.org/arcgis/';
        // var selectionLayersURL = baseURL + 'rest/services/Voyager20180807/MapServer';
        // var mapLayersURL = baseURL + 'rest/services/VoyagerBasemap/MapServer';
        // var segPolyURL = selectionLayersURL + '/0';
        // var unmatchedCrashPolyURL = selectionLayersURL + '/1';
        // var SRIQueryURL = selectionLayersURL + '/1';
        // var countyLayerURL = mapLayersURL + '/4';
        // var cityLayerURL = mapLayersURL + '/3';

        // Access SOE Services from ArcGIS Server
        // var baseServiceURL = selectionLayersURL + '/exts/VoyagerSOE/';
        // var crashClustersURL = baseServiceURL + 'CrashClusters';
        // var clusterDetailURL = baseServiceURL + 'ClusterDetail';
        // var canExportURL = baseServiceURL + 'CanExport';
        // var dataExportURL = baseServiceURL + 'ExportData';
        // var crashCountsURL = baseServiceURL + 'CrashCounts';
        // var crashListURL = baseServiceURL + 'CrashList';
        // var crashDetailURL = baseServiceURL + 'CrashDetail';
        // var crashReportsURL = baseServiceURL + 'CrashReports';
        // var crashRecordURL = baseServiceURL + 'CrashRecord';
        // var getPlaceXYURL = baseServiceURL + 'PlaceXY';
        var searchURL = baseURL + 'query/lookup_roadway?limit=20&columns=fullname&filter=';
        // var reportURL = baseServiceURL + 'Report';
        // var SRIBreakdownURL = baseServiceURL + 'SRIBreakdown';
        // var crashGraphURL = baseServiceURL + 'CrashGraph';
        // var crashReportsFromPolygonURL = baseServiceURL + 'CrashReportsFromPolygon';
        // var tokenURL = baseURL + 'tokens/generateToken';
        var requestScheduler;

        // Builds the tour at startup for the user's first time using
        // the app. Each step opens a dialog box that points to an element in the UI
        // and gives a brief description of the element's functionality.
        var welcomeTour = new Tour({
            name: 'newUserTour',
            steps: [
                {
                    orphan: true,
                    title: "Tutorial",
                    content: "Welcome to the Safety Voyager tutorial! The overview button below links to a video that gives a general overview of how to use the application to search for an SRI and do some custom querying.",
                    onShown: function (tour) {
                        var self = this;
                        settingsToggleButton.classList.remove('orangeButtonToggle');
                        if (filterMenuToggle.classList.contains('greenButtonToggle')) {
                            filterMenuToggle.click();
                            filterMenuToggle.classList.remove('orangeButtonToggle')
                        }
                        if (resultsButton.classList.contains('greenButtonToggle')) {
                            resultsButton.click();
                            resultsButton.classList.remove('orangeButtonToggle')
                        }
                        document.getElementById("overviewTutorialLink").addEventListener("click", function (event) {
                            tour.end();
                            var overviewTutorialDialog = new Dialog({
                                title: 'Report Progress Information',
                                style: 'width: 580px; height: 365px; font-size: small;',
                                onHide: function () {
                                    overviewTutorialDialog.destroy()
                                    tour.start(true);
                                }
                            });
                            domConstruct.create('div', {
                                innerHTML: '<video width="560px" height="320px" autoplay controls><source src="https://www.njvoyager.org/tutorial/NJVoyagerTutorial.mp4" type="video/mp4">Your browser does not support the video tag.</video>'
                            }, overviewTutorialDialog.containerNode)
                            overviewTutorialDialog.show();
                        });
                    },
                    template: '<div class="popover tour">\
                    <div class="arrow"></div>\
                        <h3 class="popover-title"></h3>\
                        <div class="popover-content"></div>\
                        <div class="popover-navigation">\
                            <a id="overviewTutorialLink" class="btn btn-sm btn-default">Tutorial Video</a>\
                            <button class="btn btn-sm btn-default" data-role="next">Next »</button>\
                            <button class="btn btn-sm btn-default" data-role="end">End Tour</button>\
                        </div>\
                </div>'
                },
                {
                    element: "#searchOmniBox",
                    title: "Search Bar",
                    content: "Start by entering a route, district, or municipality.",
                    placement: "bottom",
                    autoscroll: false
                },
                {
                    element: "#searchOmniBoxSearchType",
                    title: "Advanced Search Options",
                    content: "Toggle these options to filter your search. The search tutorial button below will prompt you to download a short video explaining how the omni box works.",
                    placement: "right",
                    autoscroll: false,
                    onShow: function (tour) {
                        searchOmniBoxSearchType.click();
                    },
                    onShown: function (tour) {
                        document.getElementById("advancedSearchTutorialLink").addEventListener("click", function (event) {
                            tour.end();
                            var overviewTutorialDialog = new Dialog({
                                title: 'Report Progress Information',
                                style: 'width: 580px; height: 360px; font-size: small;',
                                onHide: function () {
                                    overviewTutorialDialog.destroy();
                                    tour.start(true);
                                }
                            });
                            domConstruct.create('div', {
                                innerHTML: '<video width="560px" height="320px" autoplay controls><source src="https://www.njvoyager.org/tutorial/advancedsearch.mp4" type="video/mp4">Your browser does not support the video tag.</video>'
                            }, overviewTutorialDialog.containerNode);
                            overviewTutorialDialog.show();
                        });
                    },
                    onNext: function (tour) {
                        searchOmniBoxSearchType.click();
                    },
                    template: '<div class="popover tour">\
                    <div class="arrow"></div>\
                        <h3 class="popover-title"></h3>\
                        <div class="popover-content"></div>\
                        <div class="popover-navigation">\
                            <a id="advancedSearchTutorialLink" class="btn btn-sm btn-default">Tutorial Video</a>\
                            <div class="btn-group">\
                                <button class="btn btn-sm btn-default" data-role="prev">« Prev</button>\
                                <button class="btn btn-sm btn-default" data-role="next">Next »</button>\
                            </div>\
                            <button class="btn btn-default" data-role="end">End Tour</button>\
                        </div>\
                </div>'
                },
                {
                    title: "Advanced Map Visualizations Menu",
                    element: "#settingsPane",
                    content: "Click to display different map visualization options.",
                    placement: "right",
                    autoscroll: false,
                    onShow: function (tour) {
                        settingsToggleButton.click();
                    },
                    onPrev: function (tour) {
                        settingsToggleButton.click();
                    }
                },
                {
                    element: '.reportSelectionButton',
                    title: 'Crash Cluster Selection Tool',
                    content: 'This tool allows you to draw a polygon on the map to select crash clusters. The result will be tabulated in a dialog showing all crashes selected. <i>The tool is only enabled at zoom levels closer than the municipal aggregation point (zoom level 14), and limits the number of crashes returned to 500.</i>',
                    placement: 'right',
                    autoscroll: false
                },
                {
                    title: 'Ball Banking Overlay',
                    element: '#ballBankToggleButton',
                    content: 'When toggled, the ball banking survey information that has been collected will be overlaid on the map.',
                    placement: 'right',
                    autoscroll: false
                },
                {
                    title: 'AADT Overlay',
                    element: '#aadtToggleButton',
                    content: 'When toggled, you can rotate the map when holding down right click and panning the map.',
                    placement: 'right',
                    autoscroll: false,
                    onNext: function (tour) {
                        settingsToggleButton.click()
                        settingsToggleButton.classList.remove('orangeButtonToggle');
                        resultsButton.click();
                    }
                },
                {
                    title: 'Results Display',
                    content: 'Cluster or individual crash records will automatically display in the grid. An SRI must be selected to see the crashes grouped by 1/10 of a milepost along the selected SRI. In 3D mode the grid will only update when a filter is applied. The grid data can be exported to a CSV file.',
                    autoscroll: false,
                    orphan: true,
                    onNext: function (tour) {
                        resultsButton.click();
                    },
                    onPrev: function (tour) {
                        resultsButton.click();
                    }
                },
                {
                    element: '#filterMenuToggle',
                    title: 'Filter Menu',
                    content: 'Click to display various filters for crash clusters or an SRI search.',
                    placement: 'left',
                    autoscroll: false,
                    onShow: function (tour) {
                        filterMenuToggle.click();
                    },
                    onHidden: function (tour) {
                        filterMenuToggle.click();
                        filterMenuToggle.classList.remove('orangeButtonToggle');
                    },
                    onPrev: function (tour) {
                        filterMenuToggle.click();
                    },
                    onNext: function (tour) {
                        settingsToggleButton.click();
                    }
                },
                {
                    element: '#helpButton',
                    title: 'Restart Tutorial',
                    content: 'This is the end of the tutorial. To restart the tutorial, please click the Help Button.',
                    placement: 'right',
                    autoscroll: false,
                    onHidden: function (tour) {
                        settingsToggleButton.click();
                        settingsToggleButton.classList.remove('orangeButtonToggle')
                    },
                    onPrev: function (tour) {
                        settingsToggleButton.click();
                    }
                }
            ]
        });
        var additionalHints = new Tour({
            name: 'crashClusterTip',
            steps: [
                {
                    element: "#crashLocationsToggleButton",
                    title: "Crash Locations Toggle",
                    content: "You can activate the crash clusters to look at individual crash locations and the crashes associated with them.",
                    placement: 'right',
                    onShow: function (tour) {
                        toggleSettingsPane('visible');
                        crashLocationsToggleButton.classList.add('greenButtonToggle');
                    },
                    onHide: function (tour) {
                        crashLocationsToggleButton.classList.remove('greenButtonToggle');
                    },
                    onEnd: function (tour) {
                        localstorage.setobject('userguidance', 'false');
                    },
                    template: '<div class="popover tour">\
                    <div class="arrow"></div>\
                        <h3 class="popover-title"></h3>\
                        <div class="popover-content"></div>\
                        <div class="popover-navigation">\
                            <button class="btn btn-sm btn-default" data-role="end">Got it!</button>\
                        </div>\
                </div>'
                }
            ],
            onEnd: function (tour) {
                localStorage.setObject('userGuidance', 'false');
            }
        });

        // Button Effects for UI
        var whiteButtonEffect = {
            "background-color": "white",
            "transition": "background-color 0.3s ease",
            "-o-transition": "background-color 0.3s ease",
            "-webkit-transition": "background-color 0.3s ease",
            "-moz-transition": "background-color 0.3s ease"
        };
        var orangeButtonEffect = {
            'background-color': '#dbc473',
            'transition': 'background-color 0.3s ease',
            '-o-transition': 'background-color 0.3s ease',
            '-webkit-transition': 'background-color 0.3s ease',
            '-moz-transition': 'background-color 0.3s ease',
        };
        var redButtonEffect = {
            'background-color': 'red',
            'transition': 'background-color 0.3s ease',
            '-o-transition': 'background-color 0.3s ease',
            '-webkit-transition': 'background-color 0.3s ease',
            '-moz-transition': 'background-color 0.3s ease',
        };
        var greenButtonEffect = {
            'background-color': '#73dbc4',
            'transition': 'background-color 0.3s ease',
            '-o-transition': 'background-color 0.3s ease',
            '-webkit-transition': 'background-color 0.3s ease',
            '-moz-transition': 'background-color 0.3s ease',
        };
        var grayButtonEffect = {
            'background-color': 'light-gray',
            'transition': 'background-color 0.3s ease',
            '-o-transition': 'background-color 0.3s ease',
            '-webkit-transition': 'background-color 0.3s ease',
            '-moz-transition': 'background-color 0.3s ease',
        };
        var filterStructure = {
            // Defines the filter categories and respective filter items.
            // Defines the layout of the filters in the Filter tab. Codes for selected fi-
            // lters will be extracted when constructing URL queries.
            menus: [
                // {
                //     flyout: { id: 'crashLocationFlyout', title: 'Crash Location Details' },
                //     toggleNode: 'filtersDiv',
                //     toggleIcon: 'locationFilter',
                //     crashClusterCapable: true,
                //     widgets: [{ widgetType: 'location' }]
                // }, // Crash Location Details
                {
                    flyout: { id: 'crashDateFlyout', title: 'Temporal Crash Details' },
                    toggleNode: 'filtersDiv',
                    toggleIcon: 'dateFilter',
                    crashClusterCapable: true,
                    clearAll: true,
                    widgets: [
                        { widgetType: 'date' }
                    ]
                }, // Temporal Crash Details
                // {
                //     flyout: { id: 'crashMagnitudeFlyout', title: 'Crash Magnitude Filters' },
                //     toggleNode: 'filtersDiv',
                //     toggleIcon: 'crashMagnitudeFilter',
                //     crashClusterCapable: true,
                //     clearAll: false,
                //     menus: [
                //         {
                //             flyout: { id: 'crashMagnitudeFilter1', title: 'Severity' },
                //             toggleNode: 'crashMagnitudeFlyout',
                //             toggleText: 'severityToggle',
                //             fieldName: 'Severity_Code',
                //             crashClusterCapable: true,
                //             clearAll: true,
                //             values: [
                //                 { code: 'F', description: 'Fatality' },
                //                 { code: 'I', description: 'Injury' },
                //                 { code: 'P', description: 'Property Damage Only' }
                //             ]
                //         }, // Crash Severity
                //         {
                //             flyout: { id: 'crashMagnitudeFilter2', title: 'Alcohol Involved' },
                //             toggleNode: 'crashMagnitudeFlyout',
                //             toggleText: 'alcoholInvolvedToggle',
                //             fieldName: 'Alcohol_Involved',
                //             crashClusterCapable: true,
                //             clearAll: false,
                //             values: [
                //                 { code: 'Y', description: 'Alcohol Involved' }
                //             ]
                //         }, // Alcohol Involved
                //         {
                //             flyout: { id: 'crashMagnitudeFilter20', title: 'At Intersection' },
                //             toggleNode: 'crashMagnitudeFlyout',
                //             toggleText: 'atIntersectionToggle',
                //             fieldName: 'Intersection',
                //             crashClusterCapable: true,
                //             clearAll: false,
                //             values: [
                //                 { code: 'Y', description: 'At Intersection' },
                //             ]
                //         }, // At Intersection
                //         { // what is teh code for this?
                //             flyout: { id: 'crashMagnitudeFilter21', title: 'Hit and Run' },
                //             toggleNode: 'crashMagnitudeFlyout',
                //             toggleText: 'hitAndRunToggle',
                //             fieldName: 'hit_run',
                //             crashClusterCapable: true,
                //             clearAll: false,
                //             values: [
                //                 { code: '0', description: 'Hit and Run' },
                //             ]
                //         }, // Hit and Run
                //         {
                //             flyout: { id: 'crashMagnitudeFilter3', title: 'Hazardous Materials' },
                //             toggleNode: 'crashMagnitudeFlyout',
                //             toggleText: 'hazardousMaterialInvolvedToggle',
                //             fieldName: 'Hazmat_Involved',
                //             crashClusterCapable: true,
                //             clearAll: false,
                //             values: [
                //                 { code: 'Y', description: 'Hazardous Material Involved' },
                //             ]
                //         }, // Hazardous Materials
                //         {
                //             flyout: { id: 'crashMagnitudeFilter4', title: 'Vehicle(s) Involved' },
                //             toggleNode: 'crashMagnitudeFlyout',
                //             toggleText: 'numberVehiclesToggle',
                //             fieldName: 'Tot_Veh_Involved',
                //             crashClusterCapable: true,
                //             clearAll: true,
                //             values: [
                //                 { code: '1', description: '1 Vehicle' },
                //                 { code: '2', description: '2 Vehicles' },
                //                 { code: '3', description: '3 Vehicles' },
                //                 { code: '4', description: '4 Vehicles' },
                //                 { code: '5', description: '5+ Vehicles' },
                //             ]
                //         } // Vehicle(s) Involved
                //     ]
                // }, // Crash Magnitude Filters
                { // this field was taken from the pedestrian table and flattened into the accident table
                    flyout: { id: 'crashSeverityFlyout', title: 'Crash Severity' },
                    fieldName: 'highestseverity',
                    toggleNode: 'filtersDiv',
                    toggleIcon: 'crashMagnitudeFilter',
                    crashClusterCapable: true,
                    clearAll: true,
                    values: [
                        { code: '\'Fatal\'', description: 'Fatality' },
                        { code: '\'Incapacitating\'', description: 'Incapacitating' },
                        { code: '\'Non-Incapacitating\'', description: 'Non-Incapacitating' },
                        { code: '\'Possible\'', description: 'Possible' },
                        { code: '\'None\'', description: 'None' }
                    ]
                }, // Crash Severity
                { // this field was taken from the pedestrian table and flattened into the accident table
                    flyout: { id: 'pedCyclistFlyout', title: 'Pedestrian/Cyclist Involved' },
                    toggleNode: 'filtersDiv',
                    toggleIcon: 'pedestrianCyclistFilter',
                    crashClusterCapable: true,
                    clearAll: true,
                    values: [
                        { fieldName: 'pedestrian', description: 'Pedestrian Involved' },
                        { fieldName: 'bike', description: 'Cyclist Involved' }
                    ]
                }, // Pedestrian/Cyclist Involved
                {
                    toggleNode: 'filtersDiv',
                    toggleIcon: 'clearAllFilters',
                    toolTip: 'Clear All Filters',
                    crashClusterCapable: true,
                    widgets: [
                        { widgetType: 'clearAllFilters' }
                    ]
                }  // Clear All Widgets
            ]
        };
        var crashList = {
            title: "Get Crash Breakdown",
            id: "getCrashList",
            image: "img/crashBreakdown.png"
        };

        // Map Layers

        mapboxgl.accessToken = 'pk.eyJ1IjoiY29sbGk2NDg1IiwiYSI6ImNrMXNiZHQ1bzBlOTgzY28yMDdsamdncTkifQ.djpUCs34JkPsgWu70lUr_g';

        var map = new mapboxgl.Map({
            container: 'map', // container id
            // style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            // style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
            center: [-82.63045481401142,27.89], // starting position [lng, lat]
            // zoom: 15, // starting zoom
            zoom: 10, // starting zoom
            // minZoom: 12,
            logoPosition: 'bottom-right'
        });


        function updateClusters() {
            if (map.getZoom() >= 13 && map.getZoom() <= 16) {
                var filterArray = [];
                var columns = ['eventyear','hsmv','eventonstreet','totalinjuries','highestseverity','pedestrian']
                var filterConstructor = new FilterConstructor();
                Object.keys(filterConstructor.content).forEach(function(key) {
                    let value = filterConstructor.content[key];
                    if (value) {
                        if (value.indexOf(',') >= 0) {
                            filterArray.push(`${encodeURIComponent(key)} in (${encodeURIComponent(value)})`);
                        }
                        else {
                            filterArray.push(`${encodeURIComponent(key)} = ${encodeURIComponent(value)}`);
                        }
                    }
                });
                var filter = `filter=${filterArray.join(' and ')}`;
                var bounds = '&bounds=' + [map.getBounds()["_sw"].lng, map.getBounds()["_sw"].lat, map.getBounds()["_ne"].lng, map.getBounds()["_ne"].lat].join();

                if (map.getLayoutProperty('muni_cluster_layer', 'visibility') === 'visible') {
                    if (map.getSource('crash_cluster_source')){
                        map.getSource('crash_cluster_source').setData(`${baseURL}v1/geojson/crash_pinellas?geom_column=geom&columns=${columns.join(',')}&${filter}${bounds}`);
                    } else {
                        map.addSource('crash_cluster_source', {
                            type: 'geojson',
                            data: `${baseURL}v1/geojson/crash_pinellas?geom_column=geom&columns=${columns.join(',')}&${filter}${bounds}`,
                            cluster: true,
                            clusterMaxZoom: 15, // Max zoom to cluster points on
                            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
                        });
                        map.addLayer({
                            'id': 'clusters',
                            'type': 'circle',
                            'source': 'crash_cluster_source',
                            'filter': ['has', 'point_count'],
                            minzoom: 13,
                            maxzoom: 16,
                            'paint': {
                                'circle-radius': 15,
                                'circle-color': {
                                    property: 'point_count',
                                    stops: [
                                        [0, '#7CFC00'],
                                        [300, '#ff0000']
                                    ]
                                },
                                'circle-stroke-width': 1,
                                'circle-stroke-color': '#fff'
                            }
                        });
                        map.addLayer({
                            'id': 'cluster_count',
                            'type': 'symbol',
                            'source': 'crash_cluster_source',
                            minzoom: 13,
                            maxzoom: 16,
                            'filter': ['has', 'point_count'],
                            'layout': {
                                'text-field': '{point_count}',
                                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                                'text-size': 12
                            }
                        });
                        map.addLayer({
                            'id': 'cluster_individual',
                            'type': 'circle',
                            minzoom: 13,
                            maxzoom: 16,
                            'source': 'crash_cluster_source',
                            'filter': [
                                'all',
                                ['!=', ['get', 'cluster'], true]
                            ],
                            'paint': {
                                'circle-color': '#7CFC00',
                                'circle-radius': 15,
                                'circle-stroke-width': 1,
                                'circle-stroke-color': '#fff'
                            }
                        });
                        map.addLayer({
                            'id': 'cluster_count_individual',
                            'type': 'symbol',
                            'source': 'crash_cluster_source',
                            minzoom: 13,
                            maxzoom: 16,
                            'filter': [
                                'all',
                                ['!=', ['get', 'cluster'], true]
                            ],
                            'layout': {
                                'text-field': '1',
                                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                                'text-size': 12
                            }
                        });
                    }
                }
            }
        }


        map.on('load', function () {
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

            map.addSource('muni_cluster_source', {
                type: 'geojson',
                data: `${baseURL}muniClusters/crash_pinellas?filter=eventyear>=2016`,
            });
            map.addSource('pinellas_muni_source', {
                type: 'geojson',
                data: `${baseURL}v1/geojson/merged_zip_code?geom_column=geom&columns=mailingcity`,
            });
            map.addSource('crash_pinellas_source', {
                type: 'vector',
                tiles: [`${baseURL}mvt/crash_pinellas/{z}/{x}/{y}?geom_column=geom&columns=hsmv,eventyear,highestseverity&filter=eventyear>=2016`]
            })

            map.addLayer({
                id: 'pinellas_muni_layer',
                source: 'pinellas_muni_source',
                type: 'line',
                maxzoom: 15,
                paint: {
                    'line-color': 'rgba(0, 0, 0, 1)',
                    'line-width': 1
                },
                layout: {
                    'visibility': 'visible'
                }
            })
            map.addLayer({
                id: 'muni_cluster_layer',
                source: 'muni_cluster_source',
                maxzoom: 13,
                type: 'circle',
                paint: {
                    'circle-radius': 15,
                    'circle-color': {
                        property: 'cluster_count',
                        stops: [
                            [0, '#7CFC00'],
                            [30000, '#ff0000']
                        ]
                    },
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
                },
                layout: {
                    'visibility': 'visible'
                }
            });
            map.addLayer({
                'id': 'muni_cluster_count',
                'type': 'symbol',
                'source': 'muni_cluster_source',
                maxzoom: 13,
                'layout': {
                    'visibility': 'visible',
                    'text-field': '{cluster_count}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
            map.addLayer({
                id: 'crash_layer',
                source: 'crash_pinellas_source',
                'source-layer': 'crash_pinellas',
                visibility: 'visible',
                minzoom: 16,
                type: 'circle',
                paint: {
                    'circle-radius': 5,
                    'circle-color': {
                        type: 'categorical',
                        property: 'highestseverity',
                        stops: [
                            ['Fatal', '#d92027'],
                            ['Incapacitating', '#f4ea8e'],
                            ['Non-Incapacitating', '#5fdde5'],
                            ['Non-incapacitating', '#5fdde5'],
                            ['None', '#79d70f'],
                            ['Possible', '#0E8EC8']
                        ]
                    },
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
                    'circle-opacity': {
                        stops: [
                            [16, 0],
                            [17, 1]
                        ]
                    }
                },
                layout: {
                    'visibility': 'visible'
                }
            });
            map.addLayer({
                id: 'crash_heatmap',
                type: 'heatmap',
                source: 'crash_pinellas_source',
                'source-layer': 'crash_pinellas',
                maxzoom: 16,
                paint: {
                    'heatmap-weight': {
                        property: 'dbh',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [62, 1]
                        ]
                    },
                    // increase intensity as zoom level increases
                    'heatmap-intensity': {
                        stops: [
                            [11, 0.01],
                            [15, 0.5]
                        ]
                    },
                    // assign color values be applied to points depending on their density
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0, 'rgba(0,61,115,0)',
                        // 0.2, 'rgb(208,209,230)',
                        // 0.4, 'rgb(166,189,219)',
                        0.5, 'rgb(7,135,164)',
                        // 0.6, 'rgb(103,169,207)',
                        // 0.8, 'rgb(20,60,100)',
                        1, 'rgb(30,207,214)'
                    ],
                    // increase radius as zoom increases
                    'heatmap-radius': {
                        stops: [
                            [11, 15],
                            [15, 5]
                        ]
                    },
                    // decrease opacity to transition into the circle layer
                    'heatmap-opacity': {
                        default: 1,
                        stops: [
                            [15, 1],
                            [16, 0]
                        ]
                    }
                },
                layout: {
                    'visibility': 'none'
                }
            });

            map.on('click', function(event) {
                hideDismissableUIElements(event);
            });
            map.on('moveend', function(event) {
                updateClusters();
            })

            map.on('click', 'route_histogram_layer', function (e) {
                var selectedCrashes = JSON.parse(e.features[0].properties.selectedcrashes);
                var columns = ['eventyear','hsmv','eventonstreet','totalinjuries','highestseverity','pedestrian'];
                fetch(`${baseURL}query/crash_pinellas?columns=${columns.join(',')}&filter=hsmv in (${selectedCrashes.join(',')})`).then(response => {return response.json()}).then(selectedCrashData => {

                    new CrashGroupingDialog(null, null, selectedCrashData, null);


                    // var html = '<h5>Crash Information</h5>';
                    // html += '<div style="overflow-y: scroll; overflow-x: hidden; max-height: 300px;">';
                    // html += '<table class="table table-striped">';
                    // for (var feature of selectedCrashData) {
                    //    html += '<tr><td>' + feature.hsmv + '</td><td>' + feature.highestseverity + '</td><td>' + feature.eventlocationonroadway + '</tr>';
                    // }
                    // html += '</table></div>';
                    //
                    // new mapboxgl.Popup()
                    //     .setLngLat(e.lngLat)
                    //     .setMaxWidth('400px')
                    //     .setHTML(html)
                    //     .addTo(map);
                })
            });
            map.on('mouseenter', 'route_histogram_layer', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'route_histogram_layer', function () {
                map.getCanvas().style.cursor = '';
            });

            map.on('click', 'crash_layer', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                fetch(`${baseURL}query/crash_pinellas?columns=*&filter=hsmv='${e.features[0].properties.hsmv}'`)
                .then(response => {return response.json()})
                .then(selectedCrashData => {
                    var featureData = selectedCrashData[0];
                    var html = '<div class="clusterTitle">Crash Information</div>';
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

                    new mapboxgl.Popup({className: 'muniCluster'})
                    .setLngLat(coordinates)
                    .setMaxWidth('400px')
                    .setHTML(html)
                    .addTo(map);
                })
            });
            map.on('mouseenter', 'crash_layer', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'crash_layer', function () {
                map.getCanvas().style.cursor = '';
            });

            map.on('click', 'muni_cluster_layer', function (e) {
                var clusterProperties = e.features[0].properties;
                var html = `<div class="clusterTitle">${clusterProperties.mailingcity.toLowerCase()}</div>`;
                html += `<div style="padding: 5px;">Crashes: ${clusterProperties.cluster_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

                new mapboxgl.Popup({className: 'muniCluster'})
                    .setLngLat(e.lngLat)
                    .setMaxWidth('400px')
                    .setHTML(html)
                    .addTo(map);
            });
            map.on('mouseenter', 'muni_cluster_layer', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'muni_cluster_layer', function () {
                map.getCanvas().style.cursor = '';
            });

            map.on('click', 'clusters', function (e) {
                var crash_cluster_source = map.getSource('crash_cluster_source');
                var cluster = e.features[0]
                crash_cluster_source.getClusterLeaves(cluster.id, cluster.properties.point_count, 0, function(err, aFeatures){
                    new CrashGroupingDialog(null, null, aFeatures.map(crash => { return crash.properties }), null);
                })
            });
            map.on('mouseenter', 'clusters', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', function () {
                map.getCanvas().style.cursor = '';
            });

            map.on('click', 'cluster_individual', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                fetch(`${baseURL}query/crash_pinellas?columns=*&filter=hsmv='${e.features[0].properties.hsmv}'`)
                .then(response => {return response.json()})
                .then(selectedCrashData => {
                    var featureData = selectedCrashData[0];
                    var html = '<div class="clusterTitle">Crash Information</div>';
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

                    new mapboxgl.Popup({className: 'muniCluster'})
                        .setLngLat(coordinates)
                        .setMaxWidth('400px')
                        .setHTML(html)
                        .addTo(map);
                })
            });
            map.on('mouseenter', 'cluster_individual', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'cluster_individual', function () {
                map.getCanvas().style.cursor = '';
            });

            document.querySelectorAll('.visualizationToggle').forEach(element => {
                element.addEventListener('click', updateFilters);
            });
        });

        // Home Button
        var homeButton = domConstruct.create('a', {
            id: 'homeButton',
            className: 'omniElement hidden',
            title: 'Return to the Safety Voyager Menu',
            innerHTML: '<span class="icon icon-home" href="./SafetyMenu"></span>',
            href: './SafetyMenu'
        }, document.body);

        // Search Box Components
        var searchOmniBox = domConstruct.create('div', {
            id: 'searchOmniBox',
            title: 'Enter Route Number For a List of Selections',
            className: 'omniElement hidden',
            innerHTML: ''
        }, document.body);
        var searchOmniInput = domConstruct.create('input', {
            id: 'searchInput',
            type: 'search',
            placeholder: 'Search by Road',
            onkeyup: function (event) {
                var self = this;
                if (event.code === 'ArrowDown') {
                    if (document.querySelector('.searchOmniBoxResults').classList.contains('hidden')) {
                        console.log();
                    } else {
                        this.blur();
                        // I want to be able to arrow through the search results, hit enter and go to the result
                        //document.getElementsByClassName('searchOmniBoxResultElement')[0].focus()
                    }
                }
                else {
                    if (this.value && this.value !== '') {
                        var filter = `fullname LIKE '%${this.value.toUpperCase()}' OR fullname LIKE '${this.value.toUpperCase()}%' OR fullname LIKE '%${this.value.toUpperCase()}%'`;
                        document.querySelector('.searchHanger').classList.remove('hidden');
                        clearTimeout(self.timeoutTracker);
                        self.timeoutTracker = setTimeout(function () {
                            fetch(searchURL + encodeURIComponent(filter)).then(response => { return response.json(); }).then(searchResults => {
                                // if (response.requestOptions.query.SearchText === self.value) {
                                    var filteredQueryResults = [];
                                    var count = 0;
                                    document.querySelector('.searchTypeOptions').classList.remove('roundedBottom');
                                    document.querySelector('.searchOmniBoxResults').classList.remove('hidden');
                                    query('.searchOmniBoxResultElement').forEach(function (node) { domConstruct.destroy(node); });


                                    if (searchResults.length > 0) {
                                        for (let result of searchResults) {
                                            result.ResultType = 'RTE';
                                            omniResultWidget(result, searchOmniBoxResults, searchOmniBox);
                                        }
                                    //     while (filteredQueryResults.length < 20 && response.data.SearchResults[count]) {
                                    //         var currentResult = response.data.SearchResults[count];
                                    //         filteredQueryResults.push(currentResult);
                                    //         count++;
                                    //     }
                                    //     for (var i = 0; i < filteredQueryResults.length; i++) {
                                    //
                                    //     }
                                    }
                                    else {
                                        console.log('no results from muni, county, or SRI searches!');
                                    }
                                    // if (document.querySelector('.caseNumberFilter.greenButtonToggle')) { // this will add a generic search by case number entry at the end of the search list results
                                    // } else {
                                    //     omniResultWidget({
                                    //         ResultType: 'Case Number Search',
                                    //         ResultText: self.value + '...',
                                    //         ResultID: self.value
                                    //     }, searchOmniBoxResults, searchOmniBox);
                                    // }
                                    // if (document.querySelector('.googlePlaceFilter.greenButtonToggle')) { // this will add a generic search google geocoder entry at the end of the search list results
                                    // } else {
                                    //     omniResultWidget({
                                    //         ResultType: 'Address Search',
                                    //         ResultText: self.value + '...',
                                    //         ResultID: self.value
                                    //     }, searchOmniBoxResults, searchOmniBox);
                                    // }
                                // }
                            }, errorHandler);
                        }, 1000);
                    } else {
                        document.querySelector('.searchOmniBoxResults').classList.add('hidden');
                    }
                }
            },
            onclick: function (event) {
                if (query('.searchOmniBoxResultElement').length > 0 && this.value) {
                    document.querySelector('.searchHanger').classList.remove('hidden');
                    document.querySelector('.searchOmniBoxResults').classList.remove('hidden');
                    document.querySelector('.searchTypeOptions').classList.remove('roundedBottom');
                }
            }
        }, searchOmniBox);



        document.getElementById("searchInput").addEventListener("search", function (event) {
            if (this.value === '') {
                query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });

                map.setLayoutProperty('route_histogram_layer', 'visibility', 'none');
                map.setLayoutProperty('crash_heatmap', 'visibility', 'none');
                map.setLayoutProperty('muni_cluster_layer', 'visibility', 'visible');
                map.setLayoutProperty('muni_cluster_count', 'visibility', 'visible');
                if (map.getSource('crash_cluster_source')) {
                    map.setLayoutProperty('clusters', 'visibility', 'visible');
                    map.setLayoutProperty('cluster_count', 'visibility', 'visible');
                    map.setLayoutProperty('cluster_individual', 'visibility', 'visible');
                    map.setLayoutProperty('cluster_count_individual', 'visibility', 'visible');
                } else {
                    updateClusters();
                }
            }
        });




        var searchOmniBoxSearchType = domConstruct.create('div', {
            id: 'searchOmniBoxSearchType',
            className: 'omniElement hidden',
            title: 'Toggle search categories',
            onclick: function (event) {
                if (document.querySelector('.searchTypeOptions').classList.contains('hidden')) {
                    document.querySelector('.searchHanger').classList.remove('hidden');
                    document.querySelector('.searchTypeOptions').classList.remove('hidden')
                    if (document.querySelector('.searchOmniBoxResults').classList.contains('hidden')) {
                        document.querySelector('.searchTypeOptions').classList.add('roundedBottom');
                    } else {
                        document.querySelector('.searchTypeOptions').classList.remove('roundedBottom');
                    }
                }
                else {
                    document.querySelector('.searchTypeOptions').classList.add('hidden')
                    query('.filtericonbutton:not(.crashFilterSelected):not(.filterDisable)').style("background-color", "white");
                    query('.crashfilterflyout').style("display", "none");
                }
            }
        }, document.body);
        var searchHanger = domConstruct.create('div', { className: 'searchHanger' }, document.body);
        var searchTypeOptions = domConstruct.create('div', {
            className: 'searchTypeOptions hidden',
            innerHTML: ''
        }, searchHanger);
        var searchOmniBoxResults = domConstruct.create('div', {
            className: 'searchOmniBoxResults hidden',
            innerHTML: ''
        }, searchHanger);
        //
        // Filter Side Menu
        var filtersDiv = domConstruct.create('div', { id: 'filtersDiv' }, document.body);
        var filtersDivBorder = domConstruct.create('div', { id: 'filtersDivBorder' }, filtersDiv);
        var filterMenuToggle = domConstruct.create('a', {
            id: 'filterMenuToggle',
            className: 'hidden',
            title: 'Toggle for Filter Menu',
            onclick: function (event) {
                if (domStyle.get('filtersDiv', 'display') === 'none') {
                    this.classList.add('greenButtonToggle');
                    this.classList.remove('whiteButtonToggle');
                    this.classList.remove('orangeButtonToggle');
                    if (domStyle.get('resultsDiv', 'opacity') === '0' || domStyle.get('resultsDiv', 'opacity') === '') {
                        domStyle.set(filtersDivBorder, 'height', '100%');
                    } else {
                        var windowHeight = win.getBox().h;
                        var resultsHeight = resultsDiv.offsetHeight;
                        domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
                    }
                    domStyle.set('filtersDiv', 'display', 'block');
                    fx.animateProperty({
                        node: 'filtersDiv',
                        properties: {
                            opacity: 1
                        },
                        onEnd: function () {
                            domStyle.set('resultsDiv', 'width', (domStyle.get('resultsDiv', 'width') - 60) + 'px');
                            domStyle.set('filterSummary', 'max-width', (domStyle.get('resultsDiv', 'width') - domStyle.get('crashCountSummary', 'width') - 113) + 'px');
                            domStyle.set(resultsGrid.domNode, 'margin-right', 0);
                        }
                    }).play();
                    var elements = document.getElementsByClassName('esri-attribution');
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.width = (domStyle.get('resultsDiv', 'width') - 60) + 'px';
                    }
                }
                else {
                    this.classList.remove('greenButtonToggle');
                    this.classList.add('orangeButtonToggle');
                    query('.filterIconButton:not(.crashFilterSelected):not(.filterDisable)').style("background-color", "white");
                    query('.crashFilterFlyout').style("display", "none");
                    fx.animateProperty({
                        node: 'filtersDiv',
                        properties: {
                            opacity: 0
                        },
                        onEnd: function () {
                            domStyle.set('filtersDiv', 'display', 'none');
                            domStyle.set('resultsDiv', 'width', '100%');
                            domStyle.set('filterSummary', 'max-width', (domStyle.get('resultsDiv', 'width') - domStyle.get('crashCountSummary', 'width') - 128) + 'px');
                            domStyle.set(resultsGrid.domNode, 'margin', '15px 15px 15px 64px');
                            var elements = document.getElementsByClassName('esri-attribution');
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].style.width = '100%';
                            }
                        }
                    }).play();
                }
            },
            onmouseenter: function (event) {
                if (!(this.classList.contains('greenButtonToggle'))) {
                    this.classList.add('orangeButtonToggle');
                    this.classList.remove('whiteButtonToggle');
                }
            },
            onmouseleave: function (event) {
                if (this.classList.contains('greenButtonToggle')) {
                    this.classList.remove('orangeButtonToggle');
                    this.classList.remove('whiteButtonToggle');
                }
                else {
                    this.classList.remove('greenButtonToggle');
                    this.classList.remove('orangeButtonToggle');
                    this.classList.add('whiteButtonToggle');
                }
            }
        }, document.body);

        // Settings Side Menu
        var settingsDiv = domConstruct.create('div', {
            className: 'settingsPane',
            id: 'settingsPane',
            innerHTML: ''
        }, document.body);
        var settingsToggleButton = domConstruct.create('div', {
            className: 'settingsToggleButton whiteButtonToggle hidden',
            id: 'settingsToggleButton',
            title: 'Advanced Map Visualization Options',
            innerHTML: '',
            onclick: toggleSettingsPane,
            onmouseenter: function (event) {
                if (!(this.classList.contains('greenButtonToggle'))) {
                    this.classList.add('orangeButtonToggle');
                    this.classList.remove('whiteButtonToggle');
                }
            },
            onmouseleave: function (event) {
                this.classList.remove('orangeButtonToggle');
                this.classList.add('whiteButtonToggle');
            }
        }, document.body);
        // var reportSelectionToggleButton = domConstruct.create('div', {
        //     className: 'reportSelectionButton settingsIconButtonFirst',
        //     title: 'Crash Cluster Selection Tool\n1.) Click points on map to add vertexes.\n2.) Double click to end the selection.',
        //     innerHTML: '',
        //     onclick: function (event) {
        //         this.classList.remove('orangeButtonToggle');
        //         this.classList.remove('whiteButtonToggle');
        //         this.classList.add('greenButtonToggle');
        //
        //         var draw = new Draw({ view: flatView });
        //         var action = draw.create('polyline', { mode: 'hybrid' });
        //
        //         function drawPolygon(vertices, eventType) {
        //             flatView.graphics.removeAll();
        //             var polygon = new Polygon({
        //                 rings: vertices,
        //                 spatialReference: flatView.spatialReference
        //             });
        //             var graphic = new Graphic({
        //                 geometry: polygon,
        //                 symbol: {
        //                     type: 'simple-fill', // autocasts as SimpleFillSymbol
        //                     color: [108, 180, 238, 0.5],
        //                     style: 'solid',
        //                     outline: { // autocasts as SimpleLineSymbol
        //                         color: [50, 50, 50],
        //                         width: 2
        //                     }
        //                 }
        //             });
        //
        //             flatView.graphics.add(graphic);
        //         }
        function crashResultsWidget(crashData) {
            // crashClusterWidget: dialog that displays rows of crashes w-
            // ithin a crash cluster.
            // @param {object} crashData: response.data
            var self = this;
            var crashResultsWidgetDialog = new Dialog({
                title: 'Detailed Crash Information (' + crashData.length + ' Crashes)',
                style: "min-width: 805px; font-size: small;",
                onHide: function () {
                    reportSelectionToggleButton.classList.remove('greenButtonToggle');
                    reportSelectionToggleButton.classList.remove('orangeButtonToggle');
                    crashResultsWidgetDialog.destroy();
                    // flatView.graphics.removeAll();
                }
            });
            var crashVariableDiv = domConstruct.create('div', {
                className: 'fullSpan'
            }, crashResultsWidgetDialog.containerNode);
            var gridDiv = domConstruct.create('div', {
                className: 'detailGrid'
            }, crashResultsWidgetDialog.containerNode);
            // columns in crash grid

            var detailGrid = new Grid({
                columns: [
                    { label: 'Case Number', field: 'Case_Number' },
                    { label: 'Document Locator #', field: 'DLN' },
                    {
                        label: 'Download',
                        field: 'URL',
                        formatter: function (item) {
                            return '<a href="' + item + '" target="_blank">Download Original Report</a>';
                        }
                    }
                ]
            }, gridDiv);
            crashResultsWidgetDialog.show();
            detailGrid.renderArray(crashData);
            detailGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.enter), function (event) {
                domStyle.set(detailGrid.row(event).element, 'font-weight', 'bold')
                domStyle.set(detailGrid.row(event).element, 'background-color', 'lightgrey')
            });
            detailGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.leave), function (event) {
                domStyle.set(detailGrid.row(event).element, 'font-weight', 'normal')
                domStyle.set(detailGrid.row(event).element, 'background-color', 'white')
            });
            detailGrid.on('.dgrid-cell:dblclick', function (event) {
                var cell = detailGrid.cell(event);
                crashDetailWidget(cell.row.data.Case_Number, cell.row.data.Municipality, cell.row.data.County, cell.row.data.Year);
            });
        }


        //
        //         action.on("vertex-add", function (event) { drawPolygon(event.vertices, "vertex-add"); });
        //         action.on("cursor-update", function (event) { drawPolygon(event.vertices); });
        //         action.on("vertex-remove", function (event) { drawPolygon(event.vertices); });
        //         action.on("draw-complete", function (event) {
        //             var polygon = new Polygon({
        //                 rings: event.vertices,
        //                 spatialReference: flatView.spatialReference
        //             });
        //             var filter = new FilterConstructor({
        //                 XMin: flatView.extent.xmin,
        //                 XMax: flatView.extent.xmax,
        //                 YMin: flatView.extent.ymin,
        //                 YMax: flatView.extent.ymax,
        //                 polygon: JSON.stringify(polygon.rings)
        //             });
        //
        //             esriRequest(crashReportsFromPolygonURL, { query: filter.content }).then(function (response) {
        //                 var i = response.data.Crashes.length;
        //                 crashGroupingWidget(false, false, response.data)
        //                 while (i--) {
        //                     var location = response.data.Crashes[i];
        //                     if (location.URL) {
        //                         var point = new Point({
        //                             x: location.X,
        //                             y: location.Y,
        //                             spatialReference: 3857
        //                         });
        //                         var markerSymbol = new SimpleMarkerSymbol({
        //                             size: 20,
        //                             color: [0, 0, 255],
        //                             outline: { // autocasts as new SimpleLineSymbol()
        //                                 color: [255, 255, 255],
        //                                 width: 2
        //                             }
        //                         });
        //                         var pointGraphic = new Graphic({
        //                             geometry: point,
        //                             symbol: markerSymbol
        //                         });
        //                         flatView.graphics.add(pointGraphic);
        //                     }
        //                 }
        //             });
        //         });
        //     },
        //     onmouseenter: function (event) {
        //         if (!(this.classList.contains('greenButtonToggle'))) {
        //             this.classList.add('orangeButtonToggle')
        //             this.classList.remove('whiteButtonToggle')
        //         }
        //     },
        //     onmouseleave: function (event) {
        //         this.classList.remove('orangeButtonToggle')
        //         this.classList.add('whiteButtonToggle')
        //     }
        // }, settingsDiv);
        var basemapToggleButton = domConstruct.create('div', {
            className: 'basemapToggleButton settingsIconButtonFirst',
            title: 'Toggle between Line-Drawn Map and Satellite Imagery',
            innerHTML: '',
            onclick: function (event) {
                var crash_heatmap = map.getLayer('crash_heatmap');
                var clusters = map.getLayer('clusters');
                var cluster_count = map.getLayer('cluster_count');
                var muni_cluster_layer = map.getLayer('muni_cluster_layer');
                var muni_cluster_count = map.getLayer('muni_cluster_count');

                // toggle layer visibility by changing the layout object's visibility property
                if (crash_heatmap.visibility === 'visible') {
                    map.setLayoutProperty('crash_heatmap', 'visibility', 'none');
                    map.setLayoutProperty('muni_cluster_layer', 'visibility', 'visible');
                    map.setLayoutProperty('muni_cluster_count', 'visibility', 'visible');
                    if (map.getSource('crash_cluster_source')) {
                        map.setLayoutProperty('clusters', 'visibility', 'visible');
                        map.setLayoutProperty('cluster_count', 'visibility', 'visible');
                        map.setLayoutProperty('cluster_individual', 'visibility', 'visible');
                        map.setLayoutProperty('cluster_count_individual', 'visibility', 'visible');
                    }
                } else {
                    map.setLayoutProperty('crash_heatmap', 'visibility', 'visible');
                    map.setLayoutProperty('muni_cluster_layer', 'visibility', 'none');
                    map.setLayoutProperty('muni_cluster_count', 'visibility', 'none');
                    if (map.getSource('crash_cluster_source')) {
                        map.setLayoutProperty('clusters', 'visibility', 'none');
                        map.setLayoutProperty('cluster_count', 'visibility', 'none');
                        map.setLayoutProperty('cluster_individual', 'visibility', 'none');
                        map.setLayoutProperty('cluster_count_individual', 'visibility', 'none');
                    }
                }
            }
        }, settingsDiv);
        // var crashLocationsToggleButton = domConstruct.create('div', {
        //     id: 'crashLocationsToggleButton',
        //     className: 'settingsIconButton greenButtonToggle',
        //     title: 'Toggle for Crash Location Cluster Mapping Layer',
        //     innerHTML: '',
        //     onclick: function (event) {
        //         // crash locations layer off - SRI grid on, cluster grid off
        //         if (this.classList.contains('greenButtonToggle')) {
        //             this.classList.remove('greenButtonToggle')
        //             this.classList.add('orangeButtonToggle')
        //             crashPointLayer.visible = false;
        //             graphicsLayer.visible = true;
        //             dimensionToggleButton.classList.remove('disabled')
        //             reportSelectionToggleButton.classList.add('disabled')
        //             // Tests to see whether there is a route currently selected.
        //             if (searchOmniBox.locationFilterWidget.getAllWidgetSelections() === '') {
        //                 clusterGrid.refresh();
        //                 crashCountDiv.innerHTML = 'Crash Count: 0';
        //             }
        //             else {
        //                 reportOne.classList.remove('disabled');
        //                 if (flatViewDiv.classList.contains('active')) {
        //                     flatViewDiv.classList.remove('active');
        //                     flatViewDiv.classList.add('hideMap');
        //                     roundViewDiv.classList.remove('hideMap');
        //                 } else {
        //                     flatViewDiv.classList.add('hideMap');
        //                     roundViewDiv.classList.remove('hideMap');
        //                     dimensionToggleButton.classList.add('greenButtonToggle')
        //                 }
        //                 crashCountDiv.style.visibility = 'visible';
        //                 crashCountDiv.innerHTML = 'Crash Count: ' + crashCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");; // display total number of crashes from SRI route
        //                 var sriOverlayLayerHandle = sriOverlayLayer.layerView.watch('suspended', function (layerSuspended, layerWasSuspended) {
        //                     if (layerSuspended === false && layerWasSuspended === true) {
        //                         //console.log(layerSuspended, layerWasSuspended)
        //                     }
        //                 })
        //                 sriOverlayLayer.layerView.watch('updating', function (layerSuspended, layerWasSuspended) {
        //                     //console.log(layerSuspended, layerWasSuspended)
        //                     if (layerSuspended === false && layerWasSuspended === true) {
        //                     }
        //                 })
        //                 sriOverlayLayer.layerView.watch('visible', function (layerSuspended, layerWasSuspended) {
        //                     //console.log(layerSuspended, layerWasSuspended)
        //                     if (layerSuspended === false && layerWasSuspended === true) {
        //                     }
        //                 })
        //                 if (areaReport.classList.contains('greenButtonToggle')) {
        //                 }
        //                 else {
        //                     columnChooser.classList.remove('disabled');
        //                     clusterGrid.domNode.classList.add('hidden');
        //                     resultsGrid.domNode.classList.remove('hidden');
        //                     resultsGrid.refresh();
        //                     resultsGrid.renderArray(crashData); // render grid and data on results grid
        //                 }
        //             }
        //         }
        //         else { // crash locations layer on - SRI grid off, cluster grid on
        //             this.classList.remove('whiteButtonToggle')
        //             this.classList.remove('orangeButtonToggle')
        //             this.classList.add('greenButtonToggle')
        //             dimensionToggleButton.classList.remove('greenButtonToggle')
        //             dimensionToggleButton.classList.remove('whiteButtonToggle')
        //             reportSelectionToggleButton.classList.remove('disabled')
        //
        //             if (flatViewDiv.classList.contains('hideMap')) {
        //                 flatViewDiv.classList.remove('hideMap');
        //                 roundViewDiv.classList.add('hideMap');
        //             } else {
        //                 flatViewDiv.classList.add('active');
        //             }
        //             crashPointLayer.visible = true;
        //             graphicsLayer.visible = false;
        //             columnChooser.classList.remove('whiteButtonToggle');
        //             printGrid.classList.remove('whiteButtonToggle');
        //             reportOne.classList.remove('whiteButtonToggle');
        //             columnChooser.classList.add('disabled');
        //             reportOne.classList.add('disabled');
        //             filterMenuToggle.classList = '';
        //             updateMapGraphics(null, false, 'crashLocationsToggleButton');
        //         }
        //     },
        //     onmouseenter: function (event) {
        //         if (!(this.classList.contains('greenButtonToggle'))) {
        //             this.classList.add('orangeButtonToggle')
        //             this.classList.remove('whiteButtonToggle')
        //         }
        //     },
        //     onmouseleave: function (event) {
        //         this.classList.remove('orangeButtonToggle')
        //         this.classList.add('whiteButtonToggle')
        //     }
        // }, settingsDiv);
        // var ballBankToggleButton = domConstruct.create('div', {
        //     id: 'ballBankToggleButton',
        //     className: 'settingsIconButton',
        //     title: 'Toggle for Ball Banking Mapping Layer',
        //     innerHTML: '',
        //     onclick: function (event) {
        //         if (generalMapLayers.findSublayerById(0).visible === true) {
        //             this.classList.remove('greenButtonToggle');
        //             this.classList.add('orangeButtonToggle');
        //             generalMapLayers.findSublayerById(0).visible = false;
        //         }
        //         else {
        //             this.classList.remove('whiteButtonToggle');
        //             this.classList.remove('orangeButtonToggle');
        //             this.classList.add('greenButtonToggle');
        //             generalMapLayers.findSublayerById(0).visible = true;
        //         }
        //     },
        //     onmouseenter: function (event) {
        //         if (!(this.classList.contains('greenButtonToggle'))) {
        //             this.classList.add('orangeButtonToggle')
        //             this.classList.remove('whiteButtonToggle')
        //         }
        //     },
        //     onmouseleave: function (event) {
        //         this.classList.remove('orangeButtonToggle')
        //         this.classList.add('whiteButtonToggle')
        //     }
        // }, settingsDiv);
        // var aadtToggleButton = domConstruct.create('div', {
        //     id: 'aadtToggleButton',
        //     className: 'settingsIconButton',
        //     title: 'Toggle for AADT Mapping Layer',
        //     innerHTML: '',
        //     onclick: function (event) {
        //         if (generalMapLayers.findSublayerById(1).visible === true) {
        //             this.classList.remove('greenButtonToggle');
        //             this.classList.add('orangeButtonToggle');
        //             generalMapLayers.findSublayerById(1).visible = false;
        //         }
        //         else {
        //             this.classList.remove('whiteButtonToggle');
        //             this.classList.remove('orangeButtonToggle');
        //             this.classList.add('greenButtonToggle');
        //             generalMapLayers.findSublayerById(1).visible = true;
        //         }
        //     },
        //     onmouseenter: function (event) {
        //         if (!(this.classList.contains('greenButtonToggle'))) {
        //             this.classList.add('orangeButtonToggle')
        //             this.classList.remove('whiteButtonToggle')
        //         }
        //     },
        //     onmouseleave: function (event) {
        //         this.classList.remove('orangeButtonToggle')
        //         this.classList.add('whiteButtonToggle')
        //     }
        // }, settingsDiv);
        // var helpButton = domConstruct.create('div', {
        //     id: 'helpButton',
        //     className: 'settingsIconButton',
        //     title: 'Restart Tutorial',
        //     innerHTML: '',
        //     onclick: function (event) {
        //         localStorage.setObject('userGuidance', 'true');
        //         settingsToggleButton.click();
        //         welcomeTour.restart();
        //     },
        //     onmouseenter: function (event) {
        //         this.classList.add('orangeButtonToggle')
        //         this.classList.remove('whiteButtonToggle')
        //     },
        //     onmouseleave: function (event) {
        //         this.classList.remove('orangeButtonToggle')
        //         this.classList.add('whiteButtonToggle')
        //     }
        // }, settingsDiv);
        // var tiltToggleButton = domConstruct.create('div', {
        //     id: 'tiltToggleButton',
        //     className: 'settingsIconButton',
        //     title: 'Toggle 3D Tilt in 3D View',
        //     innerHTML: '',
        //     onclick: function (event) {
        //         // Get the camera tilt and add a small number for numerical inaccuracies
        //         var tilt = roundView.camera.tilt + 1e-3;
        //         // Switch between 3 levels of tilt
        //         if (tilt >= 80) {
        //             tilt = 0;
        //         } else if (tilt >= 40) {
        //             tilt = 80;
        //         } else {
        //             tilt = 40;
        //         }
        //         roundView.goTo({
        //             tilt: tilt
        //         });
        //     }
        // }, settingsDiv);
        // var dimensionToggleButton = domConstruct.create('div', {
        //     className: 'dimensionToggleButton settingsIconButton disabled',
        //     style: 'display: none;',
        //     id: 'dimToggleButton',
        //     title: 'Toggle Between Two and Three Dimensional Map Views',
        //     innerHTML: '',
        //     onclick: function (event) {
        //         if (this.classList.contains('orangeButtonToggle') || this.classList.contains('whiteButtonToggle')) {
        //             this.classList.remove('whiteButtonToggle');
        //             this.classList.remove('orangeButtonToggle');
        //             this.classList.add('greenButtonToggle');
        //             flatViewDiv.classList.add('hideMap')
        //             roundViewDiv.classList.remove('hideMap')
        //         }
        //         else {
        //             this.classList.remove('greenButtonToggle');
        //             this.classList.add('orangeButtonToggle');
        //             flatViewDiv.classList.remove('hideMap')
        //             roundViewDiv.classList.add('hideMap')
        //         }
        //     },
        //     onmouseenter: function (event) {
        //         if (!this.classList.contains('greenButtonToggle')) {
        //             this.classList.add('orangeButtonToggle')
        //             this.classList.remove('whiteButtonToggle')
        //         }
        //     },
        //     onmouseleave: function (event) {
        //         if (!this.classList.contains('greenButtonToggle')) {
        //             this.classList.remove('orangeButtonToggle')
        //             this.classList.add('whiteButtonToggle')
        //         }
        //     }
        // }, settingsDiv);

        //var crashReportToggleButton = domConstruct.create('div', {
        //    className: 'crashReportToggleButton settingsIconButton',
        //    title: 'Show only records that have a crash report associated with them.',
        //    innerHTML: '',
        //    onclick: function (event) {
        //        if (this.classList.contains('orangeButtonToggle') || this.classList.contains('whiteButtonToggle')) {
        //            this.classList.remove('whiteButtonToggle');
        //            this.classList.remove('orangeButtonToggle');
        //            this.classList.add('greenButtonToggle');
        //            permanentFilters['crashReportPresent'] = true;
        //        }
        //        else {
        //            this.classList.remove('greenButtonToggle');
        //            this.classList.add('orangeButtonToggle');
        //            permanentFilters['crashReportPresent'] = false;
        //        }
        //    },
        //    onmouseenter: function (event) {
        //        if (!this.classList.contains('greenButtonToggle')) {
        //            this.classList.add('orangeButtonToggle')
        //            this.classList.remove('whiteButtonToggle')
        //        }
        //    },
        //    onmouseleave: function (event) {
        //        if (!this.classList.contains('greenButtonToggle')) {
        //            this.classList.remove('orangeButtonToggle')
        //            this.classList.add('whiteButtonToggle')
        //        }
        //    }
        //}, settingsDiv);
        //
        // Results Grid (Tables and Functionality)
        var resultsButton = domConstruct.create('a', {
            id: 'resultsButton',
            className: 'hidden',
            title: 'Toggle Results Display',
            onclick: function () {
                if (domStyle.get('resultsDiv', 'opacity') > 0) {
                    this.classList.remove('greenButtonToggle');
                    this.classList.add('whiteButtonToggle');
                    domStyle.set(filtersDivBorder, 'height', '100%');
                    fx.animateProperty({
                        node: 'resultsDiv',
                        properties: {
                            opacity: 0
                        },
                        onEnd: function () {
                            fx.animateProperty({
                                node: 'resultsDiv',
                                properties: {
                                    height: 64
                                }
                            }).play();
                            fx.animateProperty({
                                node: 'resultsButton',
                                properties: {
                                    bottom: 28
                                }
                            }).play();
                        }
                    }).play();
                    var elements = document.getElementsByClassName('esri-attribution');
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.bottom = '0';
                    }
                }
                else {
                    this.classList.add('greenButtonToggle');
                    this.classList.remove('whiteButtonToggle');
                    this.classList.remove('orangeButtonToggle');
                    var obj = domGeom.position('resultsDiv');
                    if (areaReport.classList.contains('greenButtonToggle')) {
                        fx.animateProperty({
                            node: 'resultsDiv',
                            properties: {
                                opacity: 1,
                                height: 364
                            },
                            onEnd: function (event) {
                                var windowHeight = win.getBox().h;
                                var resultsHeight = resultsDiv.offsetHeight;
                                var elements = document.getElementsByClassName('esri-attribution');
                                for (var i = 0; i < elements.length; i++) { elements[i].style.bottom = (resultsHeight) + 'px'; }
                                domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
                                if (typeof areaReport.areaMetricWidget === 'undefined') {
                                    areaReport.areaMetricWidget = new areaTemporalMetricDialog(areaGraphDiv);
                                }
                                else {
                                    areaReport.areaMetricWidget.domNode.style.display = 'block';
                                }
                                areaReport.areaMetricWidget.updateGraphs('widget creation results pane open');
                            }
                        }).play();
                        fx.animateProperty({
                            node: this,
                            properties: {
                                bottom: 350 - (domGeom.position(this).y - obj.y + domGeom.position(this).h)
                            }
                        }).play();
                    }
                    else {
                        fx.animateProperty({
                            node: 'resultsDiv',
                            properties: {
                                opacity: 1,
                                height: 310
                            },
                            onEnd: function () {
                                var windowHeight = win.getBox().h;
                                var resultsHeight = resultsDiv.offsetHeight;
                                var elements = document.getElementsByClassName('esri-attribution');
                                for (var i = 0; i < elements.length; i++) {
                                    elements[i].style.bottom = (resultsHeight) + 'px';
                                }
                                domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
                            }
                        }).play();
                        fx.animateProperty({
                            node: this,
                            properties: {
                                bottom: 297 - (domGeom.position(this).y - obj.y + domGeom.position(this).h)
                            }
                        }).play();
                    }
                }
            },
            onmouseenter: function (event) {
                if (!(this.classList.contains('greenButtonToggle'))) {
                    this.classList.add('orangeButtonToggle')
                    this.classList.remove('whiteButtonToggle')
                }
            },
            onmouseleave: function (event) {
                this.classList.remove('orangeButtonToggle')
                this.classList.add('whiteButtonToggle')
            }
        }, document.body);
        var resultsDiv = domConstruct.create('div', { id: 'resultsDiv' }, document.body);
        var resultsGridDiv = domConstruct.create('div', { id: 'resultsGridDiv' }, resultsDiv);
        var resultsGrid = new Grid({ // define SRI table in the ResultsGrid
            columns: [ // hidden attribute to modify visibility of initial results grid
                { id: 'SRI', label: "State Route Identifier", field: "SRI", hidden: false },
                { id: 'MP', label: "Mile Post", field: "MP", hidden: false },
                { id: 'CrashCount', label: "Crashes at Mile Post", field: "CrashCount", hidden: false },
                //{
                //    id: 'KABCOWeightedScore',
                //    label: "KABCO Weighted Score",
                //    field: "KABCOWeightedScore",
                //    hidden: false,
                //    formatter: function (value, object) {
                //        if (value) {
                //            return Number.parseFloat(value).toFixed(2);
                //        }
                //        else {
                //            return "";
                //        }
                //    }
                //},
                //{
                //    id: 'KAWeightedScore',
                //    label: "KA Weighted Score",
                //    field: "KAWeightedScore",
                //    hidden: false,
                //    formatter: function (value, object) {
                //        if (value) {
                //            return Number.parseFloat(value).toFixed(2);
                //        }
                //        else {
                //            return "";
                //        }
                //    }
                //},
                //{ id: 'K', label: "K", field: "K", hidden: true },
                //{ id: 'A', label: "A", field: "A", hidden: true },
                //{ id: 'B', label: "B", field: "B", hidden: true },
                //{ id: 'C', label: "C", field: "C", hidden: true },
                //{ id: 'O', label: "O", field: "O", hidden: true }
            ]
        }, resultsGridDiv);
        var clusterGridDiv = domConstruct.create('div', { id: 'clusterGridDiv' }, resultsDiv);
        var clusterGrid = new Grid({
            // clusterGrid defines the table scheme for the cluster node
            // data. Table resides in the Results Grid */
            columns: [
                { id: 'Name', label: "Name", field: "Name" },
                { id: 'ClusterType', label: "Cluster Type", field: "ClusterType" },
                { id: 'Count', label: "Count", field: "Count" },
            ]
        }, clusterGridDiv);
        var areaGraphDiv = domConstruct.create('div', { id: 'areaGraphDiv' }, resultsDiv);
        var filterBox = domConstruct.create('div', {
            id: 'filterSummary',
            className: 'filterTextBox',
            title: 'List of filters currently applied.',
            style: 'visibility: hidden;'
        }, resultsDiv, 'first');
        var crashCountDiv = domConstruct.create('div', {
            id: 'crashCountSummary',
            className: 'filterTextBox',
            title: 'Total number of crashes determined by filters applied.',
            innerHTML: 'Crash Count: 0',
            style: 'visibility: hidden;'
        }, resultsDiv, 'first');
        var resultsFunctionality = domConstruct.create('div', {
            className: 'resultsFunctionality'
        }, resultsDiv);
        var dataExport = domConstruct.create('div', {
            id: 'dataExport',
            className: 'resultsFunctionalityButton',
            title: 'Export raw crash data with filters to a compressed ZIP file.',
            onclick: function (event) {
                var self = this;
                var downloadErrorDialog = new Dialog({
                    title: 'Download Error',
                    style: 'width: 500px; font-size: small;',
                    onHide: function () {
                        downloadErrorDialog.destroy();
                    }
                });
                var downloadErrorContent = domConstruct.create('div', {
                    className: 'downloadParagraph'
                }, downloadErrorDialog.containerNode);
                if (searchOmniBox.locationFilterWidget.currentRouteData) {
                    if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
                        var filter = new FilterConstructor({
                            exportType: 'extent',
                            ZoomLevel: Math.round(flatView.zoom),
                            XMin: flatView.extent.xmin,
                            XMax: flatView.extent.xmax,
                            YMin: flatView.extent.ymin,
                            YMax: flatView.extent.ymax
                        });
                    }
                    else { // data export doesn't use extents for routes
                        var filter = new FilterConstructor({
                            exportType: 'SRI',
                            SRI: searchOmniBox.locationFilterWidget.currentRouteData.SRI,
                            XMin: mapCenter.xmin,
                            XMax: mapCenter.xmax,
                            YMin: mapCenter.ymin,
                            YMax: mapCenter.ymax
                        });
                    }
                }
                else {
                    var filter = new FilterConstructor({
                        exportType: 'extent',
                        ZoomLevel: Math.round(flatView.zoom),
                        XMin: flatView.extent.xmin,
                        XMax: flatView.extent.xmax,
                        YMin: flatView.extent.ymin,
                        YMax: flatView.extent.ymax
                    });
                }
                if (filter.content.mun_mu) {
                    var codesSubmitted = filter.content.mun_mu.split(',');
                    codesSubmitted.forEach(replaceDashes);
                    filter.content.mun_mu = codesSubmitted.toString();
                }
                self.classList.add('working');
                esriRequest(dataExportURL, { query: filter.content }).then(function (response) {
                    self.classList.remove('working');
                    if (response.data) {
                        if (response.data.Permissions === 'false') {
                            downloadErrorContent.innerHTML = 'You currently do not have export permissions for this application. Please contact <a href="mailto:admin@njvoyager.com">admin@njvoyager.com</a> to request data export permissions.';
                            downloadErrorDialog.show();
                        } else {
                            var recordsReturned = response.data.Count;
                            var recordsReturnedInt = parseInt(recordsReturned);
                            var fileDownloadLink = response.data.URL;
                            var downloadCompleteDialog = new Dialog({
                                title: 'Data Export Creation Complete',
                                style: 'width: 500px; font-size: small;',
                                onHide: function () {
                                    downloadCompleteDialog.destroy()
                                }
                            });
                            var recordCount = domConstruct.create('div', {
                                className: 'downloadParagraph',
                            }, downloadCompleteDialog.containerNode);
                            var disclaimerText = domConstruct.create('div', {
                                className: 'downloadParagraph',
                                innerHTML: 'The data provided in the aforementioned file is not guaranteed by NJDOT to be correctly geocoded. It is intended for personal and preliminary use and NJDOT does not accept responsibility for any decisions made based on the locations assigned in Safety Voyager. <br>'
                            }, downloadCompleteDialog.containerNode);
                            var disclaimerDialogDismissButton = domConstruct.create('button', {
                                className: 'disclaimerButton',
                                innerHTML: 'I have read and understood the terms of the disclosure statement.',
                                onclick: function (event) {
                                    window.location = fileDownloadLink;
                                    downloadCompleteDialog.destroy();
                                }
                            }, downloadCompleteDialog.containerNode);
                            if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
                                if (clusterCrashCount > 50000) {
                                    recordCount.innerHTML = '50,000 records have been written to the file. This is the maximum that the system allows through this interface. If more records are required, contact NJDOT directly.'
                                }
                                else if (clusterCrashCount < recordsReturnedInt) {
                                    recordCount.innerHTML = recordsReturned.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' records have been written to the file. Additional crash records have been included in this export that were not symbolized on the map. Please take extra care in using this data for analysis.';
                                }
                                else if (clusterCrashCount > recordsReturnedInt) {
                                    recordCount.innerHTML = recordsReturned.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' records have been written to the file. Please note that this does not match the data visualized on the map perfectly (likely due to miscoded data). As such, please take extra care in using this data for analysis.';
                                }
                                else {
                                    recordCount.innerHTML = recordsReturned.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' records have been written to the file.';
                                }
                            }
                            else {
                                if (crashCount > 50000) {
                                    recordCount.innerHTML = '50,000 records have been written to the file. This is the maximum that the system allows through this interface. If more records are required, contact NJDOT directly.'
                                }
                                else if (crashCount < recordsReturnedInt) {
                                    recordCount.innerHTML = recordsReturned.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' records have been written to the file. Additional crash records have been included in this export that were not symbolized on the map. Please take extra care in using this data for analysis.';
                                }
                                else if (crashCount > recordsReturnedInt) {
                                    recordCount.innerHTML = recordsReturned.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' records have been written to the file. Please note that this does not match the data visualized on the map perfectly (likely due to miscoded data). As such, please take extra care in using this data for analysis.';
                                }
                                else {
                                    recordCount.innerHTML = recordsReturned.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' records have been written to the file.';
                                }
                            }
                            downloadCompleteDialog.show();
                        }
                    }
                    else {
                        downloadErrorContent.innerHTML = 'You currently do not have export permissions for this application. Please contact <a href="mailto:admin@njvoyager.com">admin@njvoyager.com</a> to request data export permissions.';
                        downloadErrorDialog.show();
                    }
                }, errorHandler);
            },
            onmouseenter: function (event) {
                this.classList.add('orangeButtonToggle')
                this.classList.remove('whiteButtonToggle')
            },
            onmouseleave: function (event) {
                this.classList.remove('orangeButtonToggle')
                this.classList.add('whiteButtonToggle')
            }
        }, resultsFunctionality);
        var printGrid = domConstruct.create('div', {
            id: 'exportToExcel',
            className: 'resultsFunctionalityButton hidden',
            title: 'Export the data displayed in the results grid to a CSV file.',
            onmouseenter: function (event) {
                this.classList.add('orangeButtonToggle');
                this.classList.remove('whiteButtonToggle');
            },
            onmouseleave: function (event) {
                this.classList.remove('orangeButtonToggle');
                this.classList.add('whiteButtonToggle');
            }
        }, resultsFunctionality);
        var areaReport = domConstruct.create('div', {
            id: 'areaReportButton',
            className: 'resultsFunctionalityButton',
            style: 'display: none;',
            title: 'Show matched crash data with active filters applied.',
            onclick: function (event) {
                var self = this;
                if (clusterGrid.domNode.classList.contains('hidden') && resultsGrid.domNode.classList.contains('hidden')) {
                    this.classList.remove('greenButtonToggle');
                    this.classList.add('orangeButtonToggle');
                    self.areaMetricWidget.domNode.classList.add('hidden');
                    fx.animateProperty({
                        node: 'resultsDiv',
                        properties: {
                            height: 315
                        },
                        onEnd: function (event) {
                            var windowHeight = win.getBox().h;
                            var resultsHeight = resultsDiv.offsetHeight;
                            var elements = document.getElementsByClassName('esri-attribution');
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].style.bottom = (resultsHeight) + 'px';
                            }
                            domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
                            if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
                                clusterGrid.domNode.classList.remove('hidden');
                            }
                            else {
                                resultsGrid.domNode.classList.remove('hidden');
                                columnChooser.classList.remove('disabled');
                            }
                        }
                    }).play();
                    fx.animateProperty({
                        node: 'resultsButton',
                        properties: {
                            bottom: 266
                        }
                    }).play();
                }
                else {
                    this.classList.add('greenButtonToggle')
                    this.classList.remove('orangeButtonToggle')
                    columnChooser.classList.add('disabled');
                    clusterGrid.domNode.classList.add('hidden');
                    resultsGrid.domNode.classList.add('hidden');
                    fx.animateProperty({
                        node: 'resultsDiv',
                        properties: {
                            height: 364
                        },
                        onEnd: function (event) {
                            var windowHeight = win.getBox().h;
                            var resultsHeight = resultsDiv.offsetHeight;
                            var elements = document.getElementsByClassName('esri-attribution');
                            for (var i = 0; i < elements.length; i++) { elements[i].style.bottom = (resultsHeight) + 'px'; }
                            domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
                            if (typeof self.areaMetricWidget === 'undefined') {
                                self.areaMetricWidget = new areaTemporalMetricDialog(areaGraphDiv);
                            }
                            else {
                                self.areaMetricWidget.domNode.classList.remove('hidden');
                            }
                            self.areaMetricWidget.updateGraphs('results pane button');
                        }
                    }).play();
                    fx.animateProperty({
                        node: 'resultsButton',
                        properties: {
                            bottom: 315
                        }
                    }).play();
                }
            },
            onmouseenter: function (event) {
                if (this.classList.contains('greenButtonToggle')) {
                    //do nothing!
                }
                else {
                    this.classList.add('orangeButtonToggle')
                    this.classList.remove('whiteButtonToggle')
                }
            },
            onmouseleave: function (event) {
                if (this.classList.contains('greenButtonToggle')) {
                    //do nothing!
                }
                else {
                    this.classList.remove('orangeButtonToggle')
                    this.classList.add('whiteButtonToggle')
                }
            }
        }, resultsFunctionality);
        var columnChooser = domConstruct.create('div', {
            className: 'columnChooser resultsFunctionalityButton disabled',
            title: 'Select grid columns to display.',
            onclick: function(event) { new ColumnChooser() },
            onmouseenter: function (event) {
                this.classList.add('orangeButtonToggle')
                this.classList.remove('whiteButtonToggle')
            },
            onmouseleave: function (event) {
                this.classList.remove('orangeButtonToggle')
                this.classList.add('whiteButtonToggle')
            }
        }, resultsFunctionality);
        var reportOne = domConstruct.create('div', {
            id: 'reportOne',
            className: 'resultsFunctionalityButton disabled hidden',
            title: 'SRI Segment Report',
            onclick: function (event) {
                var self = this;
                var filter = new FilterConstructor();
                var reportProgressDialog = new Dialog({
                    title: 'Report Progress Information',
                    style: 'width: 300px; font-size: small;',
                    onHide: function () {
                        reportProgressDialog.destroy()
                    }
                });
                var reportProgressDialogContent = domConstruct.create('div', {
                    innerHTML: 'Report generation in progress. The document will open in a separate browser window or tab depending on your user settings.'
                }, reportProgressDialog.containerNode)
                this.style.backgroundImage = 'url("img/simpleSpinner.gif")';
                this.style.backgroundSize = '20px';

                filter.content.ReportType = 'segment';
                filter.content.XMin = flatView.extent.xmin;
                filter.content.XMax = flatView.extent.xmax;
                filter.content.YMin = flatView.extent.ymin;
                filter.content.YMax = flatView.extent.ymax;


                reportProgressDialog.show();
                esriRequest(reportURL, { query: filter.content }).then(
                    function (response) {
                        reportProgressDialog.destroy();
                        self.style.backgroundImage = 'url("img/report1.png")';
                        self.style.backgroundSize = '34px';
                        var win = window.open(response.data.Report.replace('http://', 'https://'), '_blank');
                        win.focus();
                    },
                    function (error) {
                        reportProgressDialogContent.innerHTML = 'The server timed out returning the requested information. Please try again latter as the server might be under heavy use.'
                        self.style.backgroundImage = 'url("img/report1.png")';
                        self.style.backgroundSize = '34px';
                    }
                )
            },
            onmouseenter: function (event) {
                this.classList.add('orangeButtonToggle')
                this.classList.remove('whiteButtonToggle')
            },
            onmouseleave: function (event) {
                this.classList.remove('orangeButtonToggle')
                this.classList.add('whiteButtonToggle')
            }
        }, resultsFunctionality);
        var reportTwo = domConstruct.create('div', {
            id: 'reportTwo',
            style: 'display: none;',
            className: 'resultsFunctionalityButton',
            title: 'Top 50 segments in current extent & filter',
            onclick: function (event) {
                var self = this;
                var filter = new FilterConstructor({
                    ReportType: 'extent',
                    XMin: flatView.extent.xmin,
                    XMax: flatView.extent.xmax,
                    YMin: flatView.extent.ymin,
                    YMax: flatView.extent.ymax
                });
                var reportProgressDialog = new Dialog({
                    title: 'Report Progress Information',
                    style: 'width: 300px; font-size: small;',
                    onHide: function () {
                        reportProgressDialog.destroy()
                    }
                });
                self.classList.add('working');
                domConstruct.create('div', {
                    innerHTML: 'Report generation in progress. The document will open in a seperate browser window or tab depending on your user settings.'
                }, reportProgressDialog.containerNode)
                reportProgressDialog.show();
                esriRequest(reportURL, { query: filter.content }).then(function (response) {
                    reportProgressDialog.destroy()
                    self.classList.remove('working');
                    var win = window.open(response.data.Report, '_blank');
                    win.focus();
                }, function (error) {
                    if (error.httpCode === 498) {
                        var redirectDialog = new Dialog({
                            title: "Credentials Timed Out",
                            content: "Your session has expired. In order to continue using Safety Voyager you must sign in again. Closing this dialog will redirect to the login where you will be able to sign in again.",
                            style: "width: 400px",
                            closable: true,
                            onHide: function () {
                                redirectDialog.destroy();
                                window.location = 'safetyLogin.html';
                            }
                        });
                        redirectDialog.show();
                    }
                })
            },
            onmouseenter: function (event) {
                this.classList.add('orangeButtonToggle');
                this.classList.remove('whiteButtonToggle');
            },
            onmouseleave: function (event) {
                this.classList.remove('orangeButtonToggle');
                this.classList.add('whiteButtonToggle');
            }
        }, resultsFunctionality);
        // var dataExport = domConstruct.create('div', {
        //    id: 'dlnExport',
        //    className: 'resultsFunctionalityButton',
        //    title: 'Export DLN records to a compressed ZIP file.',
        //    //var self = this;
        //    onclick: function (event) {
        //        var self = this;
        //        self.classList.add('working');
        //        ///////////////////////////////////////////SELECTION BOX ?????????????????????????????????????????????????????????????????
        //        //const area = Polygon.fromExtent(view.extent);
        //        //const graphic = new Graphic({
        //        //    geometry: area,
        //        //    symbol: { type: "simple-fill" }
        //        //});
        //        //view.graphics.add(graphic);
        //        //////////////////////////////////////////////
        //        require([
        //            "esri/core/urlUtils",
        //            "esri/identity/IdentityManager",
        //            "esri/request"
        //        ], function (urlUtils, esriId, esriRequest) {
        //            baseServiceURL3 = 'https://www.njvoyager.org/arcgis/rest/services/Voyager20180807/MapServer/exts/Server/GetCrashesFromBoundbox';
        //            urlUtils.addProxyRule({
        //                urlPrefix: "https://18.233.71.68/arcgis/rest/services",
        //                proxyUrl: "http://ny1-1821l/DotNet/proxy.ashx"
        //            });
        //            var baseServiceURL3 = 'https://www.njvoyager.org/arcgis/rest/services/Voyager20180807/MapServer/exts/Server/GetCrashesFromBoundbox';
        //            filterSelections = {
        //                User: 'sgutesa@gpinet.com',
        //                XMin: flatView.extent.xmin,
        //                XMax: flatView.extent.xmax,
        //                YMin: flatView.extent.ymin,
        //                YMax: flatView.extent.ymax,
        //            };
        //            esriRequest(baseServiceURL3, { query: filterSelections }).then(function (response) {
        //                self.classList.remove('working');
        //                var downloadCompleteDialog = new Dialog({
        //                    title: 'Data Export Creation Complete',
        //                    style: 'width: 500px; font-size: small;',
        //                    onHide: function () {
        //                        downloadCompleteDialog.destroy()
        //                    }
        //                });
        //                var disclaimerText = domConstruct.create('div', {
        //                    className: 'downloadParagraph',
        //                    innerHTML: 'The data provided in the aforementioned file is not guaranteed by NJDOT to be correctly geocoded. It is intended for personal and preliminary use and NJDOT does not accept responsibility for any decisions made based on the locations assigned in Safety Voyager. <br>'
        //                }, downloadCompleteDialog.containerNode);
        //                var disclaimerDialogDismissButton = domConstruct.create('button', {
        //                    className: 'disclaimerButton',
        //                    innerHTML: 'I have read and understood the terms of the disclosure statement.',
        //                    onclick: function (event) {
        //                        //var fileDownloadLink = response.data.filename[0];
        //                        //window.location = fileDownloadLink;
        //                        downloadCompleteDialog.destroy();
        //                    }
        //                }, downloadCompleteDialog.containerNode);
        //                downloadCompleteDialog.show();
        //            });
        //        });
        //    },
        //    onmouseenter: function (event) {
        //        this.classList.add('orangeButtonToggle')
        //        this.classList.remove('whiteButtonToggle')
        //    },
        //    onmouseleave: function (event) {
        //        this.classList.remove('orangeButtonToggle')
        //        this.classList.add('whiteButtonToggle')
        //    }
        // }, resultsFunctionality);
        //
        // var crashData = [];
        // var crashCount = 0;
        // var clusterCrashCount = 0;
        //
        // function synchronizeView(view, others) {
        //     others = Array.isArray(others) ? others : [others];
        //
        //     var viewpointWatchHandle;
        //     var viewStationaryHandle;
        //     var otherInteractHandlers;
        //     var scheduleId;
        //     var timeoutTracker;
        //
        //     var clear = function () {
        //         if (otherInteractHandlers) {
        //             otherInteractHandlers.forEach(function (handle) {
        //                 handle.remove();
        //             });
        //         }
        //         viewpointWatchHandle && viewpointWatchHandle.remove();
        //         viewStationaryHandle && viewStationaryHandle.remove();
        //         scheduleId && clearTimeout(scheduleId);
        //         otherInteractHandlers = viewpointWatchHandle =
        //             viewStationaryHandle = scheduleId = null;
        //     };
        //
        //     var interactWatcher = view.watch('interacting,animation',
        //         function (newValue) {
        //             if (!newValue) {
        //                 clearTimeout(timeoutTracker);
        //                 timeoutTracker = setTimeout(function () { updateMapGraphics(false, false, 'interactWatcher'); }, 1000);
        //                 return;
        //             }
        //             if (viewpointWatchHandle || scheduleId) {
        //                 return;
        //             }
        //
        //             // start updating the other views at the next frame
        //             scheduleId = setTimeout(function () {
        //                 scheduleId = null;
        //                 viewpointWatchHandle = view.watch('viewpoint',
        //                     function (newValue) {
        //                         others.forEach(function (otherView) {
        //                             otherView.viewpoint = newValue;
        //                         });
        //                     });
        //             }, 0);
        //
        //             // stop as soon as another view starts interacting, like if the user starts panning
        //             otherInteractHandlers = others.map(function (otherView) {
        //                 return watchUtils.watch(otherView,
        //                     'interacting,animation',
        //                     function (value) {
        //                         if (value) {
        //                             clear();
        //                         }
        //                     });
        //             });
        //
        //             // or stop when the view is stationary again
        //             viewStationaryHandle = watchUtils.whenTrue(view, 'stationary', clear);
        //         });
        //
        //     return {
        //         remove: function () {
        //             this.remove = function () { };
        //             clear();
        //             interactWatcher.remove();
        //         }
        //     }
        // };
        // function synchronizeViews(views) {
        //     var handles = views.map(function (view, idx, views) {
        //         var others = views.concat();
        //         others.splice(idx, 1);
        //         return synchronizeView(view, others);
        //     });
        //
        //     return {
        //         remove: function () {
        //             this.remove = function () { };
        //             handles.forEach(function (h) {
        //                 h.remove();
        //             });
        //             handles = null;
        //         }
        //     }
        // }
        // function forEach(array, callback, scope) {
        //     for (var i = 0; i < array.length; i++) {
        //         callback.call(scope, i, array[i]); // passes back stuff we need
        //     }
        // };
        // function RequestScheduler() {
        //     var self = this;
        //     this.equals = function (x, y) {
        //         if (x === y) return true;
        //         // if both x and y are null or undefined and exactly the same
        //         if (!(x instanceof Object) || !(y instanceof Object)) return false;
        //         // if they are not strictly equal, they both need to be Objects
        //         if (x.constructor !== y.constructor) return false;
        //         // they must have the exact same prototype chain, the closest we can do is
        //         // test there constructor.
        //         for (var p in x) {
        //             if (!x.hasOwnProperty(p)) continue;
        //             // other properties were tested using x.constructor === y.constructor
        //             if (!y.hasOwnProperty(p)) return false;
        //             // allows to compare x[ p ] and y[ p ] when set to undefined
        //             if (x[p] === y[p]) continue;
        //             // if they have the same strict value or identity then they are equal
        //             if (typeof (x[p]) !== "object") return false;
        //             // Numbers, Strings, Functions, Booleans must be strictly equal
        //             if (!Object.equals(x[p], y[p])) return false;
        //             // Objects and Arrays must be tested recursively
        //         }
        //         for (p in y) {
        //             if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
        //             // allows x[ p ] to be set to undefined
        //         }
        //         return true;
        //     };
        //     this.isLastRequest = function (request) {
        //         if (self._LastRequest && request) {
        //             if (self.equals(self._LastRequest, request)) {
        //                 var workingElements = document.querySelectorAll('.working');
        //                 if (workingElements.forEach) {
        //                     document.querySelectorAll('.working').forEach(function (element) { element.classList.remove('working'); });
        //                 }
        //                 else {
        //                     forEach(workingElements, function (element) { element.classList.remove('working'); }); // replaced due to Bug 357
        //                 }
        //                 return true;
        //             }
        //             else { return false; }
        //         }
        //         else {
        //             self.LastRequest = request;
        //             return true;
        //         }
        //     };
        //     Object.defineProperty(self, 'LastRequest', {
        //         get: function () {
        //             return self._LastRequest;
        //         },
        //         set: function (request) {
        //             if (request) {
        //                 self._LastRequest = request;
        //             }
        //         }
        //     });
        // }
        function errorHandler(error) {
            console.error(error);
            if (error.httpCode === 498 || error.details.error.details.httpStatus === 498) {
                var redirectDialog = new Dialog({
                    title: "Credentials Timed Out",
                    content: "Your session has expired. In order to continue using Safety Voyager you must sign in again. Closing this dialog will redirect to the login where you will be able to sign in again.",
                    style: "width: 400px",
                    closable: true,
                    onHide: function () {
                        redirectDialog.destroy();
                        window.location = 'safetyLogin.html';
                    }
                });
                redirectDialog.show();
            }
        }
        // function replaceDashes(text, index, array) {
        //     if (text.indexOf('-') > -1) {
        //         array[index] = text.split('-')[0];
        //     }
        // }
        function hideDismissableUIElements(event) {
            query('.crashFilterFlyout').style({
                'display': 'none',
                'overflow-y': 'hidden',
                'height': 'auto'
            });
            query('.filterIconButton:not(.crashFilterSelected):not(.filterDisable)').style(whiteButtonEffect);
            query('.filterTextButton:not(.crashFilterSelected):not(.filterDisable)').style(whiteButtonEffect);
            var searchChildren = document.querySelector('.searchHanger').children;
            for (var i = 0; i < searchChildren.length; i++) {
                searchChildren[i].classList.add('hidden');
            }
        }
        // function dataUpdateWidget(attachPoint) {
        //     // This widget informs the user of the latest changes to the data.
        //     // If the data has been updated in the last 7 days it will add an alert to the icon.
        //     // A script file called updatesContent.js stores information about the update.
        //     // The file data structure and functionality could be updated to include multiple updates.
        //     var self = this;
        //     var timer;
        //     var updatesBox = domConstruct.create('div', {
        //         id: 'updatesBox'
        //     }, attachPoint);
        //     var updatesBoxHeader = domConstruct.create('div', {
        //         id: 'updatesBoxHeader',
        //         innerHTML: updatesText.title,
        //     }, updatesBox);
        //     var updatesBoxContent = domConstruct.create('div', {
        //         id: 'updatesBoxContent',
        //         innerHTML: updatesText.text,
        //     }, updatesBox);
        //     var updatesButton = domConstruct.create('div', {
        //         id: 'updatesButton',
        //         className: 'hidden',
        //         title: 'Display Updates',
        //         onclick: function () {
        //             if (domStyle.get('updatesBox', 'display') === 'none') {
        //                 self.handleUpdatesBox();
        //             }
        //             else {
        //                 hideUpdatesBox();
        //             }
        //         },
        //         onmouseenter: function (event) {
        //             if (!(this.classList.contains('greenButtonToggle'))) {
        //                 this.classList.add('orangeButtonToggle')
        //                 this.classList.remove('whiteButtonToggle')
        //             }
        //         },
        //         onmouseleave: function (event) {
        //             this.classList.remove('orangeButtonToggle')
        //             this.classList.add('whiteButtonToggle')
        //         }
        //     }, attachPoint);
        //     function showUpdateBox() {
        //         $('#updatesBox').fadeIn('fast');
        //     }
        //     function hideUpdatesBox() {
        //         $('#updatesBox').fadeOut('fast');
        //         clearTimeout(timer);
        //     }
        //     function hideUpdatesBoxTimer() {
        //         timer = setTimeout(function () {
        //             $('#updatesBox').fadeOut('fast');
        //         }, 8000);
        //     }
        //     function checkUpdateAge(targetDate) {
        //         var updateDate = updatesText.dateSaved;
        //         var nextWeek = updateDate.setDate(updateDate.getDate() + 7);
        //         if (nextWeek < Date.parse(targetDate)) { return true; }
        //         else { return false; }
        //     }
        //     function setUpdatesIcon() {
        //         var today = new Date();
        //         domStyle.set(updatesButton, 'background-image', checkUpdateAge(today) ? 'url(img/alertIcon.png)' : 'url(img/alertIconImportant.png)');
        //     }
        //     this.handleUpdatesBox = function () {
        //         showUpdateBox();
        //         hideUpdatesBoxTimer();
        //     }
        //     setUpdatesIcon();
        // }
        function toggleSettingsPane(event) {
            // Function created to toggle the settings pane outside of the settings
            // toggle button to allow for external control.
            if (domStyle.get(settingsDiv, 'display') === 'none' || event === 'visible') {
                settingsToggleButton.classList.add('greenButtonToggle');
                settingsToggleButton.classList.remove('orangeButtonToggle');
                domStyle.set(settingsDiv, 'display', 'block');
                fx.animateProperty({
                    node: settingsDiv,
                    properties: {
                        opacity: 1
                    }
                }).play();
            }
            else {
                settingsToggleButton.classList.remove('greenButtonToggle');
                settingsToggleButton.classList.add('orangeButtonToggle');
                fx.animateProperty({
                    node: settingsDiv,
                    properties: {
                        opacity: 0
                    },
                    onEnd: function () {
                        domStyle.set(settingsDiv, 'display', 'none');
                    }
                }).play();
            }
        }
        // function createTimeoutDialog() {
        //     // Dialog window that appears when a query from a selected f-
        //     // ilter takes too long or times out. Function is called when selecting filte-
        //     // rs for the crash clusters mode.
        //     timeoutDialog = new Dialog({
        //         title: "Filter Timed Out",
        //         content: "Your query timed out.  This can happen when larger dataset are requested from the server or the server is busy.  Please zoom in a bit or try again in a few minutes.",
        //         style: "width: 400px",
        //         closable: true,
        //         onHide: function () {
        //             timeoutDialog.destroy();
        //         }
        //     });
        //     timeoutDialog.show();
        // }
        function updateMapGraphics(checkbox, zoomToResults, sender, permanentFilters) {
            // updateMapGraphics refreshes the crash cluster layer if fil-
            // ters are chosen or if the user pans the map. Clusters will refresh in the
            // new area that is panned. Also refreshes the cluster grid data.
            // @param {element} checkbox The checkbox corresponding the the selected filt-
            // er or button for year, month, day checkbox can be empty if only cluster gr-
            // id layer refreshing is needed, such as for map panning.
            // define variables for cluster grid
            // console.log(checkbox, zoomToResults, sender);
            //var csvContent = "data:text/csv;charset=utf-8,";
            var columns = [];
            var labels = [];
            // displays Crash Breakdown window when a cluster is clicked on
            var crashBreakDown = {
                title: 'Crash Breakdown',
                id: 'getCrashBreakdown',
                image: 'img/crashBreakdown.png'
            };
            var streetViewLoader = {
                title: 'Street View (Approx. Loc.)',
                id: 'loadStreetView',
                image: 'img/maps_street_view.png'
            };
            var filterConstructor = new FilterConstructor();
            var clusterTesterDebug = function (location) {
                if (location.ClusterType === 'Cluster') {
                    var filter = new FilterConstructor(location);
                    if (filter.content.mun_mu) {
                        var codesSubmitted = filter.content.mun_mu.split(',');
                        codesSubmitted.forEach(replaceDashes);
                        filter.content.mun_mu = codesSubmitted.toString()
                    }
                    esriRequest(clusterDetailURL, { query: filter.content }).then(function (response) {
                        if (response.requestOptions.query.Count === response.data.Crashes.length) {
                        }
                        else {
                            //console.dir(response.requestOptions.query);
                            console.log(response.requestOptions.query.Count, response.data.Crashes.length)
                        }
                    }, errorHandler);
                }
            };
            function graphicsUpdateHandler(filterConstructor) {
                filter.content.ZoomLevel = Math.round(flatView.zoom);
                if (areaReport.classList.contains('greenButtonToggle')) {
                    //areaReport.areaMetricWidget.updateGraphs('omni click address, county');
                }
                if (flatView.zoom > 13) {
                    if (flatViewDiv.classList.contains('hideMap')) {
                        reportSelectionToggleButton.classList.add('disabled');
                    }
                    else {
                        reportSelectionToggleButton.classList.remove('disabled');
                    }
                }
                else {
                    reportSelectionToggleButton.classList.add('disabled');
                }
                esriRequest(crashClustersURL, { query: filter.content }).then(function (response) {
                    // remove all indicators that filters are still being processed
                    if (checkbox && typeof checkbox === 'object') {
                        if (checkbox.domNode) {
                            var workingElements = checkbox.domNode.querySelectorAll('.working');
                            workingElements.forEach(function (node) {
                                node.classList.remove('working');
                            });
                        }
                        else if (checkbox.classList) {
                            if (checkbox.classList.length > 0) {
                                checkbox.classList.remove('crashFilterWorking');
                                checkbox.classList.remove('working');
                            }
                            else {
                                checkbox.parentNode.removeChild(checkbox);
                            }
                        }
                    }
                    if (response.data.Error) {
                        // if the query takes too long or times out, display the Timeout dialog and stop query
                        createTimeoutDialog();
                    }
                    else if (parseFloat(response.data.CrashFilter.XMax) === flatView.extent.xmax) {
                        document.querySelector('.settingsToggleButton').style.backgroundImage = 'url("img/settingsToggleButton.png")';
                        crashPointLayer.removeAll(); // remove old crash clusters on display
                        // if query returns data, create crash clusters on the map. Also process data to create the clusters grid

                        if (response.data['Comparison Locations']) {
                            var heightAdjust = 2;
                            var clusterData = [];
                            clusterCrashCount = 0;
                            //for (var i = 0; i < response.data.Locations.length; i++) {
                            var i = response.data['Comparison Locations'].length;
                            while (i--) {
                                var location = response.data['Comparison Locations'][i];
                                var point = new Point({
                                    x: location.X,
                                    y: location.Y,
                                    z: heightAdjust * location.NormalCount,
                                    spatialReference: 3857
                                });
                                var textSymbol = new TextSymbol({
                                    color: 'white',
                                    text: location.Count > 1000 ? (Math.round(location.Count / 1000) * 1000).toString().slice(0, -3) + 'K' : location.Count.toString(),
                                    yoffset: -3,
                                    font: { // autocast as esri/symbols/Font
                                        size: 8,
                                        family: "sans-serif",
                                        weight: "normal"
                                    }
                                });
                                var markerSymbol = new SimpleMarkerSymbol({
                                    size: 30,
                                    color: 'blue',
                                    outline: { // autocasts as new SimpleLineSymbol()
                                        color: [255, 255, 255],
                                        width: 2
                                    }
                                });
                                var textGraphic = new Graphic({
                                    geometry: point,
                                    symbol: textSymbol,
                                    attributes: location,
                                    popupTemplate: new PopupTemplate({
                                        //featureNavigationEnabled: false,
                                        title: 'Crash Aggregation Point',
                                        content: location.ClusterType !== 'Cluster' ? '{ClusterType}: {Name}' : '',
                                        overwriteActions: true,
                                        actions: location.ClusterType === 'Cluster' ? location.ClusterID > -2 ? [crashBreakDown, streetViewLoader] : [crashBreakDown] : []
                                    })
                                });
                                var pointGraphic = new Graphic({
                                    geometry: point,
                                    symbol: markerSymbol,
                                    attributes: location,
                                    popupTemplate: new PopupTemplate({
                                        //featureNavigationEnabled: false,
                                        title: 'Crash Aggregation Point',
                                        content: location.ClusterType !== 'Cluster' ? '{ClusterType}: {Name}' : '',
                                        overwriteActions: true,
                                        actions: location.ClusterType === 'Cluster' ? location.ClusterID > -2 ? [crashBreakDown, streetViewLoader] : [crashBreakDown] : []
                                    })
                                });
                                //clusterTesterDebug(location); // The function checks if the query and response indicate the same number of crashes (Task 342)
                                crashPointLayer.add(pointGraphic);
                                crashPointLayer.add(textGraphic);
                                // calculate the crash count based on the crash clusters viewable on the map and display in Results Grid
                                clusterCrashCount += location.Count;
                                clusterData.unshift({
                                    ClusterId: location.ClusterId,
                                    Name: location.Name,
                                    ClusterType: (location.ClusterType === 'Cluster' ? 'Cluster' : location.ClusterType),
                                    Count: location.Count,
                                    X: location.X,
                                    Y: location.Y,
                                    geometry: pointGraphic
                                });
                            }
                            crashCountDiv.style.visibility = 'visible';
                            crashCountDiv.innerHTML = 'Crash Count: ' + clusterCrashCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            if (areaReport.classList.contains('greenButtonToggle')) {
                                areaReport.areaMetricWidget.pauseGraphs(true);
                                areaReport.areaMetricWidget.updateGraphs('update map graphics');
                            }
                            else {
                                // MAKE THE CLUSTER GRID VISIBLE HERE AND THE RESULTS GRID INVISIBLE
                                clusterGrid.domNode.classList.remove('hidden');
                                resultsGrid.domNode.classList.add('hidden');
                                clusterGrid.refresh();
                                clusterGrid.renderArray(clusterData);
                                clusterGrid.set('sort', [{ property: 'Count', descending: true }])
                                // Process Cluster Grid data from clusterData array for report generation
                                // define columns and labels for CSV file: Name, Cluster Type, Count
                                Object.keys(clusterGrid.columns).forEach(function (key) {
                                    columns.push(clusterGrid.columns[key].field);
                                    labels.push(clusterGrid.columns[key].label);
                                });
                                var columnString = labels.join(",");
                            }
                        }
                        if (response.data.Locations) {
                            var heightAdjust = 2;
                            var clusterData = [];
                            clusterCrashCount = 0;
                            //for (var i = 0; i < response.data.Locations.length; i++) {
                            var i = response.data.Locations.length;
                            while (i--) {
                                var location = response.data.Locations[i];
                                var point = new Point({
                                    x: location.X,
                                    y: location.Y,
                                    z: heightAdjust * location.NormalCount,
                                    spatialReference: 3857
                                });
                                var textSymbol = new TextSymbol({
                                    color: 'black',
                                    text: location.Count > 1000 ? (Math.round(location.Count / 1000) * 1000).toString().slice(0, -3) + 'K' : location.Count.toString(),
                                    yoffset: -3,
                                    font: { // autocast as esri/symbols/Font
                                        size: 8,
                                        family: "sans-serif",
                                        weight: "normal"
                                    }
                                });
                                var markerSymbol = new SimpleMarkerSymbol({
                                    size: 20,
                                    color: location.Color,
                                    outline: { // autocasts as new SimpleLineSymbol()
                                        color: [255, 255, 255],
                                        width: 2
                                    }
                                });
                                var textGraphic = new Graphic({
                                    geometry: point,
                                    symbol: textSymbol,
                                    attributes: location,
                                    popupTemplate: new PopupTemplate({
                                        //featureNavigationEnabled: false,
                                        title: 'Crash Aggregation Point',
                                        content: location.ClusterType !== 'Cluster' ? '{ClusterType}: {Name}' : '',
                                        overwriteActions: true,
                                        actions: location.ClusterType === 'Cluster' ? location.ClusterID > -2 ? [crashBreakDown, streetViewLoader] : [crashBreakDown] : []
                                    })
                                });
                                var pointGraphic = new Graphic({
                                    geometry: point,
                                    symbol: markerSymbol,
                                    attributes: location,
                                    popupTemplate: new PopupTemplate({
                                        //featureNavigationEnabled: false,
                                        title: 'Crash Aggregation Point',
                                        content: location.ClusterType !== 'Cluster' ? '{ClusterType}: {Name}' : '',
                                        overwriteActions: true,
                                        actions: location.ClusterType === 'Cluster' ? location.ClusterID > -2 ? [crashBreakDown, streetViewLoader] : [crashBreakDown] : []
                                    })
                                });
                                //clusterTesterDebug(location); // The function checks if the query and response indicate the same number of crashes (Task 342)
                                crashPointLayer.add(pointGraphic);
                                crashPointLayer.add(textGraphic);
                                // calculate the crash count based on the crash clusters viewable on the map and display in Results Grid
                                clusterCrashCount += location.Count;
                                clusterData.unshift({
                                    ClusterId: location.ClusterId,
                                    Name: location.Name,
                                    ClusterType: (location.ClusterType === 'Cluster' ? 'Cluster' : location.ClusterType),
                                    Count: location.Count,
                                    X: location.X,
                                    Y: location.Y,
                                    geometry: pointGraphic
                                });
                            }
                            crashCountDiv.style.visibility = 'visible';
                            crashCountDiv.innerHTML = 'Crash Count: ' + clusterCrashCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            if (areaReport.classList.contains('greenButtonToggle')) {
                                areaReport.areaMetricWidget.pauseGraphs(true);
                                areaReport.areaMetricWidget.updateGraphs('update map graphics');
                            }
                            else {
                                // MAKE THE CLUSTER GRID VISIBLE HERE AND THE RESULTS GRID INVISIBLE
                                clusterGrid.domNode.classList.remove('hidden');
                                resultsGrid.domNode.classList.add('hidden');
                                clusterGrid.refresh();
                                clusterGrid.renderArray(clusterData);
                                clusterGrid.set('sort', [{ property: 'Count', descending: true }])
                                // Process Cluster Grid data from clusterData array for report generation
                                // define columns and labels for CSV file: Name, Cluster Type, Count
                                Object.keys(clusterGrid.columns).forEach(function (key) {
                                    columns.push(clusterGrid.columns[key].field);
                                    labels.push(clusterGrid.columns[key].label);
                                });
                                var columnString = labels.join(",");
                            }
                        }
                    }
                }, errorHandler);
            }
            // if Crash Locations Button is on, display crash clusters on map, display Clusters Grid in Results Grid, and process cluster data for report generation

            var filterArray = [];
            Object.keys(filterConstructor.content).forEach(function(key) {
                let value = filterConstructor.content[key];
                if (value) {
                    if (value.indexOf(',') >= 0) {
                        filterArray.push(`${encodeURIComponent(key)} in (${encodeURIComponent(value)})`);
                    }
                    else {
                        filterArray.push(`${encodeURIComponent(key)} = ${encodeURIComponent(value)}`);
                    }
                }
            })

            var filter = `filter=${filterArray.join(' and ')}`;

            var bounds = '&bounds=' + [map.getBounds()["_sw"].lng, map.getBounds()["_sw"].lat, map.getBounds()["_ne"].lng, map.getBounds()["_ne"].lat].join()

            if (map.getSource('crash_cluster_source')) {
                map.getSource('crash_cluster_source').setData(`${baseURL}v1/geojson/crash_pinellas?geom_column=geom&columns=eventyear,hsmv,eventonstreet&${filter}${bounds}`);
            }
            map.getSource('muni_cluster_source').setData(`${baseURL}muniClusters/crash_pinellas?${filter}`);
            map.getSource('crash_pinellas_source').tiles = [`${baseURL}mvt/crash_pinellas/{z}/{x}/{y}?geom_column=geom&columns=hsmv,eventyear,highestseverity&${filter}`]
            map.style.sourceCaches['crash_pinellas_source'].clearTiles()
            map.style.sourceCaches['crash_pinellas_source'].update(map.transform)
            map.triggerRepaint()


            if (map.getSource('crash_cluster_source')) {
                map.getSource('crash_cluster_source').setData(`${baseURL}v1/geojson/crash_pinellas?geom_column=geom&columns=eventyear,hsmv,eventonstreet&${filter}${bounds}`);
            }

            fetch(`${baseURL}routeHistogram/centerline_buffer?geom_column=wkb_geometry&routeName=${searchOmniInput.value}&${filter}`).then(response => {return response.json()}).then(centerlineFeatures => {
                if (map.getSource('route_histogram_source')) {
                    map.getSource('route_histogram_source').setData(centerlineFeatures)
                    setNewFillExtrusionSymbology(centerlineFeatures, 'route_histogram_layer', 'count');
                }
            })



            if (checkbox && typeof checkbox === 'object') {
                if (checkbox.domNode) {
                    var workingElements = checkbox.domNode.querySelectorAll('.working');
                    workingElements.forEach(function (node) {
                        node.classList.remove('working');
                    });
                }
                else if (checkbox.classList) {
                    if (checkbox.classList.length > 0) {
                        checkbox.classList.remove('crashFilterWorking');
                        checkbox.classList.remove('working');
                    }
                    else {
                        checkbox.parentNode.removeChild(checkbox);
                    }
                }
            }

            // map.addSource('muni_cluster_source', {
            //     type: 'geojson',
            //     data: `${baseURL}muniClusters/crash_pinellas?filter=eventyear>=2016`,
            // });



            // if (flatView.extent && crashPointLayer.visible === true) {
            //     if (permanentFilters) {
            //         filter = new FilterConstructor(permanentFilters);
            //     }
            //     else {
            //         filter = new FilterConstructor();
            //     }
            //     document.querySelector('.settingsToggleButton').style.backgroundImage = 'url("img/simpleSpinner.gif")';
            //     if (filter.content.mun_mu && filter.content.mun_mu.split(',').length === 1 && zoomToResults) {
            //         // Zoom to municipality only if a single instance is selected.
            //         if (filter.content.mun_mu.split(',')[0].indexOf('-') > -1) {
            //             var queryTask = new QueryTask({ url: countyLayerURL });
            //             var countyQuery = new superQuery();
            //             var combiCode = filter.content.mun_mu.split(',')[0];
            //             var fipsCode = combiCode.split('-')[1];
            //             crashPointLayer.visible = true;
            //             countyQuery.returnGeometry = true;
            //             countyQuery.outFields = [""];
            //             countyQuery.where = 'FIPSCO = \'' + fipsCode + '\'';
            //             queryTask.execute(countyQuery).then(function (results) {
            //                 if (results.features.length > 0) {
            //                     flatView.goTo(results.features[0].geometry.extent).then(function () {
            //                         var polygon = new Polygon(results.features[0].geometry);
            //                         var fillSymbol = new SimpleFillSymbol({
            //                             style: 'none',
            //                             outline: new SimpleLineSymbol({
            //                                 color: 'blue',
            //                                 width: 3
            //                             })
            //                         });
            //                         var polygonGraphic = new Graphic({
            //                             geometry: polygon,
            //                             symbol: fillSymbol
            //                         });
            //                         flashParcelsGraphicLayer.removeAll();
            //                         flashParcelsGraphicLayer.add(polygonGraphic);
            //                         setTimeout(function () {
            //                             flashParcelsGraphicLayer.removeAll();
            //                         }, 2000);
            //                     })
            //                 }
            //             }, errorHandler);
            //         }
            //         else if (filter.content.mun_mu.split(',')[0].length === 4) {
            //             var queryTask = new QueryTask({ url: cityLayerURL });
            //             var munQuery = new superQuery();
            //             crashPointLayer.visible = true;
            //             munQuery.returnGeometry = true;
            //             munQuery.outFields = [""];
            //             munQuery.where = 'SSN = \'' + filter.content.mun_mu.split(',')[0] + '\'';
            //             queryTask.execute(munQuery).then(function (results) {
            //                 if (results.features.length > 0) {
            //                     flatView.goTo(results.features[0].geometry.extent).then(function () {
            //                         var polygon = new Polygon(results.features[0].geometry);
            //                         var fillSymbol = new SimpleFillSymbol({
            //                             style: 'none',
            //                             outline: new SimpleLineSymbol({
            //                                 color: 'blue',
            //                                 width: 3
            //                             })
            //                         });
            //                         var polygonGraphic = new Graphic({
            //                             geometry: polygon,
            //                             symbol: fillSymbol
            //                         });
            //                         flashParcelsGraphicLayer.removeAll();
            //                         flashParcelsGraphicLayer.add(polygonGraphic);
            //                         setTimeout(function () {
            //                             flashParcelsGraphicLayer.removeAll();
            //                         }, 2000);
            //                     })
            //                 }
            //             }, errorHandler);
            //         }
            //         else {
            //             filter.content.XMin = flatView.extent.xmin;
            //             filter.content.XMax = flatView.extent.xmax;
            //             filter.content.YMin = flatView.extent.ymin;
            //             filter.content.YMax = flatView.extent.ymax;
            //             graphicsUpdateHandler(filter);
            //         }
            //     } else {
            //         if (filter.content.mun_mu) {
            //             var codesSubmitted = filter.content.mun_mu.split(',');
            //             codesSubmitted.forEach(replaceDashes);
            //             filter.content.mun_mu = codesSubmitted.toString()
            //         }
            //         filter.content.XMin = flatView.extent.xmin;
            //         filter.content.XMax = flatView.extent.xmax;
            //         filter.content.YMin = flatView.extent.ymin;
            //         filter.content.YMax = flatView.extent.ymax;
            //         graphicsUpdateHandler(filter);
            //     }
            // }
        }
        function sortMapByValue(map, filterValue) {
            // sortMapByValue sorts the contents of map in order by earli-
            // est to latest year. @param {array} map. @return {array} an array of
            var tupleArray = [];
            for (var key in map) tupleArray.push([key, map[key]]);
            if (filterValue === 'year') {
                return tupleArray.sort(function (a, b) { return b[0] - a[0] });
            }
            else if (filterValue === 'acc_dow') {
                sorting = ['M', 'TU', 'W', 'TH', 'F', 'SA', 'SU'];
                return tupleArray.map(function (item) {
                    var n = sorting.indexOf(item[0]);
                    sorting[n] = '';
                    return [n, item]
                }).sort().map(function (j) { return j[1] })
            }
            else {
                return tupleArray.sort(function (a, b) { return b[1] - a[1] });
            }
        }
        // function matchMapSort(sortedMap, unsortedMap) {
        //     var tupleArray = [];
        //     for (var i = 0; i < sortedMap.length; i++) {
        //         if (unsortedMap[sortedMap[i][0]]) {
        //             tupleArray.push([sortedMap[i][0], unsortedMap[sortedMap[i][0]]])
        //         }
        //         else {
        //             tupleArray.push([sortedMap[i][0], 0])
        //         }
        //     }
        //     return tupleArray;
        // }
        function FilterConstructor(inputContent) {
            // FilterConstructor creates the default parameters needed for
            // a URL query, with defaults being "". Additional parameters can be specified
            // through the parameter inputContent. Also displays the selected filters in
            // the Results Grid.
            // @param {object} inputContent Additional parameters added to the URL query.
            // Format- Field (str): Value (var)
            var self = this;
            var addFilterList = function (menu, filter) {
                self.contentString ? self.contentString : self.contentString = ''; // contentString is the str where the selected filters will be appended to and displayed int he Results Grid
                filter ? filter : filter = {};
                // filter.f = 'json';
                if (menu.menus) {
                    for (var i = 0; i < menu.menus.length; i++) {
                        var submenu = menu.menus[i];
                        if (submenu.fieldName) {
                            var fields = [];
                            var selectedValues = [];
                            var checkboxElements = document.getElementById(submenu.flyout.id).getElementsByClassName('filterCheckButton');
                            var selectedCheckboxElements = document.getElementById(submenu.flyout.id).getElementsByClassName('crashFilterSelected filterCheckButton');
                            if (selectedCheckboxElements.length === submenu.values.length && submenu.parentCode) { // if all filters are selected and there is a parent code
                                selectedValues.push(submenu.parentCode.toString());
                                fields.push(submenu.description);
                            }
                            else {
                                for (var k = 0; k < checkboxElements.length; k++) {
                                    var checkboxElement = checkboxElements.item(k);
                                    if (checkboxElement.classList.contains('crashFilterSelected')) {
                                        if (submenu.values[k].fieldName) {
                                            filter[submenu.values[k].fieldName] = "1";
                                        }
                                        else {
                                            selectedValues.push(submenu.values[k].code);
                                            fields.push(submenu.values[k].description);
                                        }
                                    }
                                }
                            }
                            if (filter[submenu.fieldName]) {
                                selectedValues.length > 0 ? filter[submenu.fieldName] += ',' + selectedValues.toString() : filter[submenu.fieldName];
                            }
                            else {
                                filter[submenu.fieldName] = selectedValues.toString();
                            }
                            if (selectedCheckboxElements.length === submenu.values.length) {
                                self.contentString += submenu.flyout.title + ', ';
                            } else if (selectedCheckboxElements.length > 2) {
                                self.contentString += fields.length > 0 ? submenu.flyout.title + ':(' + fields.length + '), ' : '';
                            } else {
                                self.contentString += fields.length > 0 ? submenu.flyout.title + ':(' + fields.join(',') + '), ' : '';
                            }
                        }
                        // when years, dates, or days are selected, display each month in the "selected filters" area in the Results Grid
                        else if (submenu.widgets) {
                            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // these values will appear in the selected filters area
                            for (var k = 0; k < submenu.widgets.length; k++) {
                                var widget = submenu.widgets[k];
                                var selections;
                                if (widget.widgetType === 'date') {
                                    selections = widget.widget.getAllWidgetSelections();
                                    firstTime = true;
                                    for (selection in selections) {
                                        filter[selection] = selections[selection];
                                        if (filter[selection]) {
                                            if (firstTime) {
                                                if (parseInt(filter[selection], 10) >= 1 && parseInt(filter[selection], 10) <= 12) {
                                                    self.contentString += 'Date: ' + filter[selection] + ', ';
                                                }
                                                else {
                                                    self.contentString += 'Date: ' + filter[selection] + ', ';
                                                    firstTime = false;
                                                }
                                            }
                                            // if a month is selected, need to convert month numbers into text
                                            else {
                                                if (parseInt(filter[selection], 10) >= 1 && parseInt(filter[selection], 10) <= 12) {
                                                    var monthStr = '';
                                                    var monthArr = filter[selection].split(",").map(Number);    // need to convert filter[selection] (str) into a vector of month numbers
                                                    for (var l = 0; l < monthArr.length; l++) {     // loop over the month numbers in the array, convert then into actual names and append to "selected filters" string
                                                        someMonth = months[monthArr[l] - 1];
                                                        self.contentString += someMonth + ', ';
                                                    }
                                                }
                                                else {
                                                    self.contentString += filter[selection] + ', ';
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (widget.widgetType === 'location') {
                                    var selections = widget.widget.getAllWidgetSelections();

                                    if (selections) {
                                        //if (inputContent) {
                                        //    selections = {};
                                        //    for (var selection in inputContent) {
                                        //        if (inputContent.hasOwnProperty(selection)) {
                                        //            if (selection === 'SRI') {
                                        //                selections[selection] = inputContent[selection];
                                        //            }
                                        //            else if (selection === 'mp_start') {
                                        //                selections[selection] = inputContent[selection];
                                        //            }
                                        //            else if (selection === 'mp_end') {
                                        //                selections[selection] = inputContent[selection];
                                        //            }
                                        //        }
                                        //    }
                                        //}

                                        for (var selection in selections) {
                                            if (selections.hasOwnProperty(selection)) {
                                                filter[selection] = selections[selection];
                                            }
                                        }

                                        if (selections.SRI && selections.mp_start && selections.mp_end) {
                                            self.contentString += 'SRI: ' + selections.SRI + ' [' + selections.mp_start + '-' + selections.mp_end + '], ';
                                        }
                                        else if (selections.SRI && selections.mp_start) {
                                            self.contentString += 'SRI: ' + selections.SRI + ' [' + selections.mp_start + '-' + widget.widget.currentRouteData.maxMP + '], ';
                                        }
                                        else if (selections.SRI && selections.mp_end) {
                                            self.contentString += 'SRI: ' + selections.SRI + ' [' + widget.widget.currentRouteData.minMP + '-' + selections.mp_end + ']';
                                        }
                                        else if (selections.SRI) {
                                            self.contentString += 'SRI: ' + selections.SRI;
                                        }
                                        else {
                                            console.log('improper route information specified!');
                                        }
                                    }
                                    else {
                                        console.log('no route information specified!');
                                    }
                                }
                                else if (widget.widgetType === 'table') {
                                    var fields = [];
                                    var selectedValues = [];
                                    var checkboxElements = document.getElementById(submenu.flyout.id).getElementsByClassName('filterCheckButton');
                                    var selectedCheckboxElements = document.getElementById(submenu.flyout.id).getElementsByClassName('crashFilterSelected filterCheckButton');

                                    for (var k = 0; k < checkboxElements.length; k++) {
                                        var checkboxElement = checkboxElements.item(k);
                                        if (checkboxElement.classList.contains('crashFilterSelected')) {
                                            if (submenu.values[k].fieldName) {
                                                filter[submenu.values[k].fieldName] = "1";
                                            }
                                            else {
                                                selectedValues.push(submenu.values[k].code);
                                                fields.push(submenu.values[k].description);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if (submenu.menus) {
                            addFilterList(submenu, filter);
                        }

                    }
                }
                else { }
                var filterString = self.contentString.replace(/(^,)|(, $)/g, "");
                filterBox.innerHTML = filterString;
                if (filterString.length > 0) {
                    filterBox.style.visibility = 'visible';
                }
                else {
                    filterBox.style.visibility = 'hidden';
                }
                return filter;
            };
            this.content = addFilterList(filterStructure, inputContent);
            // this.content.User = esriId.credentials[0].userId;
            this.contentString = '';
        }
        // function showGeometry(geometry) {
        //     // showExtentBox displays an orange box that incases the SRI
        //     // route from the first point to last point on the route. If a route is broken
        //     // into many pieces, the box will still incase the whole route. Used for debu-
        //     // gging purposes only.
        //     // @param {object} response.data
        //     // @return {number} extent box diagonal distance
        //     //console.dir(geometry);
        //     var returnInfo = '';
        //     var graphicToDraw;
        //     if (geometry.type === 'point') {
        //         var projectedPoint = webMercatorUtils.xyToLngLat(geometry.x, geometry.y);
        //         var pointMarker = new Point({
        //             latitude: projectedPoint[1],
        //             longitude: projectedPoint[0]
        //         });
        //         var markerSymbol = new SimpleMarkerSymbol({
        //             color: [226, 119, 40],
        //             outline: { // autocasts as new SimpleLineSymbol()
        //                 color: [255, 255, 255],
        //                 width: 2
        //             }
        //         });
        //         graphicToDraw = new Graphic({
        //             geometry: pointMarker,
        //             symbol: markerSymbol
        //         });
        //     } else if (geometry.type === 'extent') {
        //         var projectedMin = webMercatorUtils.xyToLngLat(geometry.xmin, geometry.ymin);
        //         var projectedMax = webMercatorUtils.xyToLngLat(geometry.xmax, geometry.ymax);
        //         var polyline = new Polyline({
        //             paths: [
        //                 [projectedMin[0], projectedMin[1]],
        //                 [projectedMin[0], projectedMax[1]],
        //                 [projectedMax[0], projectedMax[1]],
        //                 [projectedMax[0], projectedMin[1]],
        //                 [projectedMin[0], projectedMin[1]]
        //             ]
        //         })
        //         var lineSymbol = new SimpleLineSymbol({
        //             color: [226, 119, 40],
        //             width: 4
        //         });
        //         graphicToDraw = new Graphic({
        //             geometry: polyline,
        //             symbol: lineSymbol,
        //         });
        //         returnInfo = Math.sqrt((geometry.xmax - geometry.xmin) * (geometry.xmax - geometry.xmin) + (geometry.xmax - geometry.xmin) * (geometry.xmax - geometry.xmin));
        //     }
        //     testingLayer.add(graphicToDraw);
        //     return returnInfo;
        // }
        // function isBetween(value, lowValue, highValue) {
        //     // isBetween is used to determine if a value is in between two
        //     // other values. i.e. - is 2 between 1 and 5?
        //     // @param {number} value: value used to test if a number is between lowValue and highValue
        //     //        {number} lowValue: lower boundary number
        //     //        {number} highValue: higher boundary number
        //     // @return {bool}
        //     return ((value >= lowValue) && (value <= highValue))
        // }
        // function displaySearchResults(response, identifier, mpFilterZoom, updateGraphics) {
        //     // displaySearchResults zooms to a SRI route and displays both 3D SRI route data and SRI table in the Results Grid after a search is made.
        //     // When filters are applied/unapplied, the SRI data is updated on screen. Additionally, function processes the SRI table data to be exported to Excel CSV format.
        //     // @param {object} response: response.data or self.currentRoutedata
        //     //        {number} identifier: doesn't do anything in function, for debugging purposes only
        //     //        {bool} mpFilterZoom: (true) if mileposts are specified in the SRI view, zoom into the new milepost extents; (false) don't zoom
        //     var begPoint;
        //     var lastPoint;
        //     response.minMP = Math.floor(response.minMP * 10) / 10; // this will round down to the nearest 10th of a mile so that it is captured by the table filter
        //     if (typeof (mpFilterZoom) === 'undefined') mpFilterZoom = false; // true only if user is inputting min and max MP to filter. Used to bypass full zoom of a whole route
        //     crashCount = 0;
        //     // display text when a milepost is clicked on
        //     var crashList = {
        //         title: "Get Crash Breakdown",
        //         id: "getCrashList",
        //         image: "img/crashBreakdown.png"
        //     };
        //     /*  calculateOrthogonal determines the center point of the route and selects the appropriate zoom number to zoom into the extent.
        //     * @param {object} firstPoint: geometry data of the 1st point of the extent
        //     * {object} lastPoint: geometry data of the last point of the extent
        //     */
        //     var calculateOrthoganol = function (response) {
        //         var zoomVal;
        //         var getFirstPoint = function (geometries) {
        //             var firstPoint = response.geometries[0];
        //             for (var i = 0; i < response.geometries.length; i++) {
        //                 var attributes = response.attributes[i];
        //                 var milePost = parseFloat(attributes.MP);
        //                 if (milePost === response.minMP) {
        //                     firstPoint = response.geometries[i];
        //                 }
        //             }
        //             return firstPoint;
        //         };
        //         var getLastPoint = function (geometries) {
        //             var lastPoint = response.geometries[response.geometries.length - 1];
        //             for (var i = 0; i < response.geometries.length; i++) {
        //                 var attributes = response.attributes[i];
        //                 var milePost = parseFloat(attributes.MP);
        //                 if (milePost === response.maxMP) {
        //                     lastPoint = response.geometries[i];
        //                 }
        //             }
        //             return lastPoint;
        //         };
        //         var start = Polygon.fromJSON(getFirstPoint(response.geometries)).centroid;
        //         var end = Polygon.fromJSON(getLastPoint(response.geometries)).centroid;
        //         var distance = start.distance(end);
        //         var theta = Math.atan2(end.x - start.x, end.y - start.y) * 180 / Math.PI;
        //         var projectedPoint = webMercatorUtils.xyToLngLat((start.x + end.x) / 2, (start.y + end.y) / 2);
        //         if (domClass.contains(dimensionToggleButton, 'disabled')) {
        //             if (domClass.contains(crashLocationsToggleButton, 'greenButtonToggle')) { }
        //             else {
        //                 dimensionToggleButton.classList.remove('disabled');
        //                 dimensionToggleButton.classList.add('greenButtonToggle');
        //                 domClass.toggle(flatViewDiv, 'hideMap');
        //                 domClass.toggle(roundViewDiv, 'hideMap');
        //             }
        //         }
        //         // select appropriate zoom. zoomVal is based on trial and error testing on what zoom looked appropriate depending on route distance
        //         if (isBetween(distance, 0, 5050)) { zoomVal = 15; }
        //         else if (isBetween(distance, 5051, 10000)) { zoomVal = 14; }
        //         else if (isBetween(distance, 10001, 35500)) { zoomVal = 13; }
        //         else if (isBetween(distance, 35501, 69000)) { zoomVal = 12; }
        //         else { zoomVal = 11; }
        //         // define the center point of the route extents, and apply zoom, heading, and tilt parameters to the view
        //         roundView.goTo({
        //             center: [projectedPoint[0], projectedPoint[1]],
        //             zoom: zoomVal,
        //             heading: theta > 0 ? theta - 90 : theta + 90,
        //             tilt: 60,
        //         }).then(function () {
        //             flatView.viewpoint = roundView.viewpoint;
        //         });
        //     };
        //     // reinstantiate and clear out SRI data variables from previous search
        //     crashData = [];
        //     var polygonList = [];
        //     var initialCrashCount = Math.max.apply(Math, response.attributes.map(function (o) { return o.CrashCount; }));
        //     var maxCrashCount = initialCrashCount;
        //     //var csvContent = "data:text/csv;charset=utf-8,";
        //     var columns = [];
        //     var labels = [];
        //     if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
        //     } else {
        //         // MAKE THE RESULTS GRID VISIBLE HERE AND THE CLUSTER GRID INVISIBLE
        //         //clusterGridDiv.style.display = 'none';
        //         //resultsGridDiv.style.display = 'block';
        //         clusterGrid.domNode.classList.add('hidden');
        //         resultsGrid.domNode.classList.remove('hidden');
        //     }
        //     resultsGrid.refresh();
        //     // determine if route should be zoomed into or not
        //     if (mpFilterZoom === true) { calculateOrthoganol(response); }
        //     // display Results Grid if it is not displayed already
        //     if (domStyle.get('resultsDiv', 'opacity') === 0) {
        //         var obj = domGeom.position('resultsDiv');
        //         fx.animateProperty({
        //             node: 'resultsDiv',
        //             properties: {
        //                 opacity: 1,
        //                 height: 310
        //             },
        //             onEnd: function () {
        //                 var windowHeight = win.getBox().h;
        //                 var resultsHeight = resultsDiv.offsetHeight;
        //                 resultsButton.classList.remove('orangeButtonToggle')
        //                 resultsButton.classList.remove('whiteButtonToggle')
        //                 resultsButton.classList.add('greenButtonToggle')
        //                 domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
        //                 if (JSON.parse(localStorage.getObject('userGuidance')) || localStorage.getObject('userGuidance') === null) {
        //                     additionalHints.init();
        //                     additionalHints.restart();
        //                 }
        //             }
        //         }).play();
        //         fx.animateProperty({
        //             node: 'resultsButton',
        //             properties: {
        //                 bottom: 297 - (domGeom.position('resultsButton').y - obj.y + domGeom.position('resultsButton').h)
        //             }
        //         }).play();
        //     }
        //     // process SRI table data into CSV format
        //     Object.keys(resultsGrid.columns).forEach(function (key) {
        //         columns.push(resultsGrid.columns[key].field);
        //         labels.push(resultsGrid.columns[key].label);
        //     });
        //     var columnString = labels.join(",");
        //     //csvContent += columnString + "\n";
        //     response.minMP ? response.minMP : response.minMP = Math.min.apply(Math, response.attributes.map(function (o) { return o.MP; }));
        //     response.maxMP ? response.maxMP : response.maxMP = Math.max.apply(Math, response.attributes.map(function (o) { return o.MP; }));
        //     var lowestPoint = 0;
        //     var highestPoint = 0;
        //     var lowestMP = response.minMP;
        //     var highestMP = response.maxMP;
        //     if (updateGraphics) {
        //         graphicsLayer.removeAll();
        //     }
        //     for (var i = 0; i < response.geometries.length; i++) {
        //         var geometry = response.geometries[i];
        //         // Add a z coordinate to the data to test if the stack looks good.
        //         // the commented code below will enable the underlying data block to show
        //         // unmatched data. eventually this will be done server side.
        //         var attributes = response.attributes[i];
        //         var milePost = parseFloat(attributes.MP);
        //         if (milePost === response.minMP) { begPoint = i; }
        //         if (milePost === response.maxMP) { lastPoint = i; }
        //         if (parseFloat(response.minMP) <= milePost && milePost <= parseFloat(response.maxMP)) {
        //             // get the lowest point in case begPoint comes back as undefined. used for zooming purposes if user inputs MP that doesnt exist
        //             if (milePost < lowestMP) {
        //                 lowestMP = milePost;
        //                 lowestPoint = i;
        //             }
        //             // get the highest point in case lastPoint comes back as undefined. used for zooming purposes if user inputs MP that doesnt exist
        //             if (milePost > highestMP) {
        //                 highestMP = milePost;
        //                 highestPoint = i;
        //             }
        //             var crashArray = [];
        //             if (updateGraphics) {
        //                 // return hasZ and Z elevation to give room for the unmatched data
        //                 var polygon = Polygon.fromJSON(geometry);   // points that define the line
        //                 var symbol = new PolygonSymbol3D({
        //                     symbolLayers: [new ExtrudeSymbol3DLayer({
        //                         size: attributes.CrashCount * 10 + 50,  // 100,000 meters in height
        //                         material: { color: determineCrashColor(attributes.CrashCount, maxCrashCount, 0.8) }
        //                     })]
        //                 });
        //                 var polygonGraphic = new Graphic({ // for the 3d crash bar`s
        //                     geometry: polygon,
        //                     symbol: symbol,
        //                     attributes: attributes,
        //                     popupTemplate: new PopupTemplate({
        //                         title: "State Route: {SRI}", // The title of the popup will be the name of the pipeline
        //                         content: "{*}", // Displays a table of all the attributes in the popup
        //                         overwriteActions: true,
        //                         actions: [crashList]
        //                     })
        //                 });
        //                 // sri poly
        //                 var fillColor = determineCrashColor(attributes.CrashCount, initialCrashCount, false);
        //                 var fillSymbol = new SimpleFillSymbol({
        //                     color: fillColor,
        //                     outline: { // autocasts as new SimpleLineSymbol()
        //                         color: fillColor,
        //                         width: 3
        //                     }
        //                 });
        //                 var flatPolygonGraphic = new Graphic({
        //                     geometry: polygon,
        //                     symbol: fillSymbol,
        //                     attributes: attributes,
        //                     popupTemplate: new PopupTemplate({
        //                         title: "State Route: {SRI}", // The title of the popup will be the name of the pipeline
        //                         content: "{*}", // Displays a table of all the attributes in the popup
        //                         overwriteActions: true,
        //                         actions: [crashList]
        //                     })
        //                 });
        //                 graphicsLayer.add(polygonGraphic);
        //                 graphicsLayer.add(flatPolygonGraphic);
        //             }
        //             for (var k = 0; k < columns.length; k++) {
        //                 var columnName = columns[k];
        //                 crashArray.push(attributes[columnName] || 0);
        //             };
        //             //csvContent += crashArray.join(",") + "\n"
        //             crashCount += attributes.CrashCount;
        //             crashData.push({
        //                 detailLink: { SRI: attributes.SRI, MP: attributes.MP },
        //                 SRI: attributes.SRI,
        //                 MP: parseFloat(attributes.MP),
        //                 CrashCount: attributes.CrashCount,
        //                 //K: attributes.K,
        //                 //A: attributes.A,
        //                 //B: attributes.B,
        //                 //C: attributes.C,
        //                 //O: attributes.O,
        //                 //KABCOWeightedScore: attributes.KABCOWeightedScore,
        //                 //KAWeightedScore: attributes.KAWeightedScore,
        //                 geometry: geometry, // it might be more efficient to use the polygon that were created
        //                 dddPolygon: symbol
        //             });
        //         }
        //     }
        //     // if user inputs min or max MP, define zoom parameters and zoom to the new extent
        //     if (mpFilterZoom) { calculateOrthoganol(response); }
        //     crashCountDiv.style.visibility = 'visible';
        //     crashCountDiv.innerHTML = 'Crash Count: ' + crashCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");; // display crash count in Results Grid
        //     if (polygonList.length > 0) {
        //         var extent = new Extent({
        //             xmin: Math.min.apply(Math, polygonList.map(function (o) { return o.extent.xmin; })),
        //             xmax: Math.max.apply(Math, polygonList.map(function (o) { return o.extent.xmax; })),
        //             ymin: Math.min.apply(Math, polygonList.map(function (o) { return o.extent.ymin; })),
        //             ymax: Math.max.apply(Math, polygonList.map(function (o) { return o.extent.ymax; })),
        //             spatialReference: polygonList[0].spatialReference.wkid
        //         });
        //     }
        //     // export SRI data to CSV file
        //     //printGrid.onclick = function (event) {
        //     //    var encodedUri = encodeURI(csvContent);
        //     //    var a = document.createElement('a');
        //     //    document.body.appendChild(a);
        //     //    a.download = 'gridExport.csv'
        //     //    a.href = encodedUri;
        //     //    a.click();
        //     //}
        //     // sort MP data to be increasing order
        //     crashData.sort(function (a, b) { return a.MP - b.MP; });
        //     resultsGrid.renderArray(crashData); // render SRI data into table and display in Results Grid
        // }
        // function calculateInjuries(responseObj) {
        //     // calculateInjuries: calcs the value of a specific code for
        //     // cluster breakdown: killed, incapacitated, injuries, and pain. returns an a-
        //     // rray with total counts for each code: (index 0) killed, (1) incapacitated,
        //     // (2) moderate injury, (3) complaint of pain, (4) ped killed, (5) ped incapa-
        //     // citaed, (6) ped moderate injury, (7) ped complaint of pain
        //     // @param {object} responseObj: response data
        //     // @return {array of 8 numbers} counts: array of the total number of injuries
        //     // per category defined */
        //     var data = responseObj.data.crash;
        //     var counts = [0, 0, 0, 0, 0, 0, 0, 0];
        //     for (var i = 0; i < data.Occupants.length; i++) {
        //         if (data.Occupants[i].physcl_cndtn_code === '03') {  // Moderate Injury
        //             counts[2] += 1;
        //         }
        //         else if (data.Occupants[i].physcl_cndtn_code === '01') { // killed
        //             counts[0] += 1;
        //         }
        //         else if (data.Occupants[i].physcl_cndtn_code === '02') { // incap
        //             counts[1] += 1;
        //         }
        //         else if (data.Occupants[i].physcl_cndtn_code === '04') { //complaint_of_pain
        //             counts[3] += 1;
        //         }
        //     }
        //     for (j = 0; j < data.Pedestrians.length; j++) {
        //         if (data.Pedestrians[j].physcl_cndtn_code === '03') {  // Moderate Injury
        //             counts[6] += 1;
        //         }
        //         else if (data.Pedestrians[j].physcl_cndtn_code === '01') { // killed
        //             counts[4] += 1;
        //         }
        //         else if (data.Pedestrians[j].physcl_cndtn_code === '02') { // incap
        //             counts[5] += 1;
        //         }
        //         else if (data.Pedestrians[j].physcl_cndtn_code === '04') { //complaint_of_pain
        //             counts[7] += 1;
        //         }
        //     }
        //     return counts;
        // }
        // function reorderTabs(tabsArray) {
        //     // reorderTabs: Moves Vehicles tabs after Crash Data.
        //     // @param {object} tabsArray: array of tabs from response.data
        //     // @return {object} tabsArray with veh tabs moved to the beginning
        //     var firstVehTab;        // ind of first veh tab
        //     var lastVehTab;         // ind of last veh tab
        //     var foundFirst = false;
        //     var foundLast = false;
        //     for (i = 0; i < tabsArray.length; i++) {
        //         var tabTitle = tabsArray[i].title;
        //         // find the index the first Vehicle tab is on
        //         if (!foundFirst) {
        //             if (tabTitle.substring(0, tabTitle.indexOf('(')) === 'Vehicles') { // parse title, see if it is a veh tab
        //                 foundFirst = true;
        //                 firstVehTab = i;
        //             }
        //         }
        //         // find the index of the last vehicle tab
        //         if (foundFirst && !foundLast) {
        //             if (tabTitle.substring(0, tabTitle.indexOf('(')) !== 'Vehicles') { // if theres a ped tab after the last veh tab
        //                 lastVehTab = i - 1;
        //                 foundLast = true;
        //             }
        //         }
        //     }
        //     Array.prototype.move = function (old_index, new_index) {
        //         if (new_index >= this.length) {
        //             var k = new_index - this.length;
        //             while ((k--) + 1) {
        //                 this.push(undefined);
        //             }
        //         }
        //         this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        //         return this; // for testing purposes
        //     };
        //     // move all vehicle tabs to the beginning after Crash Data tab
        //     var insertInd = 0;
        //     for (i = firstVehTab; i < lastVehTab + 1; i++) {
        //         tabsArray.move(i, insertInd);
        //         insertInd += 1;
        //     }
        // }
        // function crashDetailWidget(caseNumber, municipality, county, year) {
        //     // crashDetailWidget: displays a dialog of SRI crash data inc-
        //     // luding Vehicles, Drivers, Occupants, and Pedestrians for a certain MP.
        //     // @param {number} caseNumber: SRI case number
        //     //        {string} municipality: SRI muni
        //     //        {string} county
        //     //        {number} year
        //     //console.log(caseNumber, municipality, county, year);
        //     var filter = {
        //         CaseNumber: caseNumber,
        //         Municipality: municipality,
        //         County: county,
        //         Year: year,
        //         User: esriId.credentials[0].userId,
        //         'f': 'json'
        //     };
        //     var crashDetailDialog = new Dialog({
        //         title: "Detailed Crash Information",
        //         style: "width: 850px; min-height: 470px; font-size: small;",
        //         onHide: function () {
        //             crashDetailDialog.destroy()
        //         }
        //     });
        //     var crashDataTabContainer = new dijit.layout.TabContainer({
        //         'style': {
        //             'height': '100%',
        //             'width': '100%',
        //             'font-size': 'small',
        //         },
        //         useMenu: false,
        //         useSlider: false,
        //         controllerWidget: dijit.layout.TabController,
        //         doLayout: false,
        //     }).placeAt(crashDetailDialog.containerNode);
        //     var tabs = [];
        //     function parseObject(objectToParse, category) {
        //         // parseObject: parses data into relevant tabs and adds to the tab container
        //         // @params {object} objectToParse: response.data
        //         // {string} category: title of tab
        //         var firstHit = false;
        //         var lastHit = false;
        //         var keyValuePairs = [];
        //         var crashData;
        //         var vehicle = [];
        //         var driver = [];
        //         var occ = [];
        //         var ped = [];
        //         /* newTab: creates a table for tab data and displays it in the detailGrid
        //         @params {string} title
        //         {string} values
        //         @return {layout} tab
        //         */
        //         function newTab(title, values) {
        //             var tab = new dijit.layout.ContentPane({ "title": title });
        //             var detailGrid = new Grid({
        //                 columns: [
        //                     { label: "Field", field: "field" },
        //                     { label: "Value", field: "value" }
        //                 ]
        //             });
        //             tab.set("content", detailGrid.domNode);
        //             convertTableCodes(filters, values); // function is defined in filters.js
        //             detailGrid.renderArray(values);
        //             return tab;
        //         };
        //         for (var key in objectToParse) {
        //             if (objectToParse.hasOwnProperty(key)) {
        //                 if (typeof objectToParse[key] === 'object' && objectToParse[key]) {
        //                     if (typeof +key === 'number' && (+key % 1) === 0) {
        //                         var keyValue = parseInt(key, 10) + 1;
        //                         parseObject(objectToParse[key], category + '(' + keyValue + ')');
        //                     }
        //                     else {
        //                         parseObject(objectToParse[key], key);
        //                     }
        //                 }
        //                 else if (typeof objectToParse[key] === 'array') {
        //                     break;
        //                 }
        //                 else {
        //                     keyValuePairs.push({ field: key.replace(/[_]/g, ' '), value: objectToParse[key] });
        //                 }
        //             }
        //         }
        //         if (keyValuePairs.length > 0) {
        //             tabs.push(newTab(category, keyValuePairs));
        //         }
        //     }
        //     esriRequest(crashDetailURL, { query: filter }).then(function (response) {
        //         var clusterData = response.data.crash
        //         var injuryCounts = calculateInjuries(response) // calc injuries
        //         var pt = new Point({
        //             x: clusterData.X,
        //             y: clusterData.Y,
        //             z: 5000,
        //             spatialReference: new SpatialReference({
        //                 wkid: 3857
        //             })
        //         });
        //         delete clusterData.error; // deletes the error row in Detail Crash Information dialog
        //         // for each of these fields, replace with the correct calculated number from injuryCounts
        //         clusterData.killed = injuryCounts[0];
        //         clusterData.incapacitated = injuryCounts[1];
        //         clusterData.moderateInjury = injuryCounts[2];
        //         clusterData.complaintOfPain = injuryCounts[3];
        //         clusterData.pedestrianKilled = injuryCounts[4];
        //         clusterData.pedestrianIncapacitated = injuryCounts[5];
        //         clusterData.pedestrianModerateInjury = injuryCounts[6];
        //         clusterData.pedestrianComplaintOfPain = injuryCounts[7];
        //         parseObject(response.data.crash, 'Crash Data'); // parse data into general 'Crash Data' tab
        //         reorderTabs(tabs); // move veh tabs to the front
        //         tabs.unshift(tabs.pop());
        //         for (var i = 0; i < tabs.length; i++) { crashDataTabContainer.addChild(tabs[i]) };
        //         //var recordRequest = {
        //         //    DLN: response.data.crash.Document_Locator_Number,
        //         //    User: esriId.credentials[0].userId,
        //         //    'f': 'json'
        //         //}
        //         //esriRequest(crashRecordURL, { query: recordRequest }).then(function (response) {
        //         //    var reportViewer;
        //         //    var reportTab;
        //         //    var reportDiv = document.createElement('div');
        //         //    if (response.data.url === '') {
        //         //        reportDiv.innerHTML = 'The original crash report is not currently stored in Safety Voyager. More crash records are being added all the time, so please check back at a later date.'
        //         //    }
        //         //    else {
        //         //        reportViewer = document.createElement('iframe');
        //         //        reportViewer.style = 'width: 100%; height: 386px;';
        //         //        reportDiv.appendChild(reportViewer);
        //         //        reportViewer.setAttribute('src', response.data.url);
        //         //    }
        //         //    reportTab = new dijit.layout.ContentPane({
        //         //        title: 'Filed Report',
        //         //        content: reportDiv
        //         //    });
        //         //    crashDataTabContainer.addChild(reportTab)
        //         //}, errorHandler);
        //     }, errorHandler);
        //     crashDetailDialog.show();
        // }
        function ColumnChooser() {
            // columnChooseWidget: displays a dialog which allows users to
            // select columns to be displayed in the SRI table via Results Grid
            var columnChooserDialog = new Dialog({
                className: 'columnChooser',
                title: "Select Visible Columns",
                style: "width: 400px; font-size: small;",
                onHide: function () { columnChooserDialog.destroy() }
            });
            var crashVariableDiv = domConstruct.create('div', {
                className: 'fullSpan'
            }, columnChooserDialog.containerNode);
            var tableRoot = domConstruct.create('table', {
                className: 'filterTable',
                style: "background-color: lightgray"
            }, crashVariableDiv);
            function createCheckBoxRow(rowAttributes) {
                var row = domConstruct.create('tr', null);
                var description = domConstruct.create('td', {
                    className: 'filterDescription',
                    innerHTML: rowAttributes.label,
                    onclick: clickHandler
                }, row);
                var checkBox = domConstruct.create('td', {
                    className: 'filterCheckButton',
                    onclick: clickHandler
                }, row, 'first');
                function clickHandler(event) {
                    var column, columnName;
                    checkBox.classList.toggle('crashFilterSelected');
                    if (checkBox.classList.contains('crashFilterSelected')) {
                        domStyle.set(checkBox, greenButtonEffect);
                        domStyle.set(description, greenButtonEffect);
                        resultsGrid.styleColumn(rowAttributes.id, "display: table-cell;");
                        for (columnName in resultsGrid.columns) {
                            if (resultsGrid.columns.hasOwnProperty(columnName)) {
                                column = resultsGrid.columns[columnName]
                                if (rowAttributes.id === column.id) {
                                    column.hidden = false;
                                }
                            }
                        }
                    }
                    else {
                        checkBox.classList.remove('crashFilterSelected');
                        domStyle.set(checkBox, whiteButtonEffect);
                        domStyle.set(description, whiteButtonEffect);
                        resultsGrid.styleColumn(rowAttributes.id, "display: none;");
                        for (columnName in resultsGrid.columns) {
                            if (resultsGrid.columns.hasOwnProperty(columnName)) {
                                column = resultsGrid.columns[columnName]
                                if (rowAttributes.id === column.id) {
                                    column.hidden = true;
                                }
                            }
                        }
                    }
                }
                if (rowAttributes.hidden === false) {
                    checkBox.classList.toggle('crashFilterSelected');
                    domStyle.set(checkBox, greenButtonEffect);
                    domStyle.set(description, greenButtonEffect);
                }
                return row;
            }
            for (var column in resultsGrid.columns) {
                if (resultsGrid.columns.hasOwnProperty(column)) {
                    domConstruct.place(createCheckBoxRow(resultsGrid.columns[column]), tableRoot, 'last');
                }
            }
            columnChooserDialog.show();
        };
        function CrashGroupingDialog(SRI, MP, ClusterData, Municipality_Code) {
            // crashGroupingWidget: displays SRI data and relevant case
            // numbers for a specific milepost. Also breaks down data into categories via
            // pie charts.
            var self = this;
            var downloadErrorDialog = new Dialog({
                title: 'Download Error',
                style: 'width: 500px; font-size: small;',
                onHide: function () {
                    downloadErrorDialog.destroy()
                }
            });
            var downloadErrorContent = domConstruct.create('div', {
                className: 'downloadParagraph',
            }, downloadErrorDialog.containerNode);
            var milepostDetailDialog = new Dialog({
                title: 'Detailed Crash Information' + (ClusterData ? ' (' + ClusterData.length + ' Crashes)' : ''),
                style: "min-width: 805px; font-size: small;",
                onHide: function () {
                    milepostDetailDialog.destroy();
                    // The crash report selection uses this widget, so if it is active, we want to remove
                    // all the selected geometry and clear the activated color scheme.
                    // if (reportSelectionToggleButton.classList.contains('greenButtonToggle')) {
                    //     reportSelectionToggleButton.classList.remove('greenButtonToggle');
                    //     reportSelectionToggleButton.classList.remove('orangeButtonToggle');
                    //     flatView.graphics.removeAll();
                    // }
                }
            });
            var crashVariableDiv = domConstruct.create('div', {
                className: 'fullSpan'
            }, milepostDetailDialog.containerNode);
            var refreshStatistics = function (applicableFilters) {
                domConstruct.empty(chartingDiv);
                var milePostDiv = domConstruct.create('div', {
                    className: 'detailPlot'
                }, chartingDiv);
                var routeDiv = domConstruct.create('div', {
                    className: 'detailPlot'
                }, chartingDiv);
                var stateDiv = domConstruct.create('div', {
                    className: 'detailPlot'
                }, chartingDiv);
                var legendDiv = domConstruct.create('div', {
                    className: 'detailPlot'
                }, chartingDiv);
                var milepostLoadSpinner = domConstruct.create('img', {
                    src: 'img/simpleSpinner.gif',
                    style: 'height: 184px; margin: 7px;'
                }, milePostDiv);
                var routeLoadSpinner = domConstruct.create('img', {
                    src: 'img/simpleSpinner.gif',
                    style: 'height: 184px; margin: 7px;'
                }, routeDiv);
                var stateLoadSpinner = domConstruct.create('img', {
                    src: 'img/simpleSpinner.gif',
                    style: 'height: 184px; margin: 7px;'
                }, stateDiv);
                function compareDataScales(crashList) {
                    var crashBins = {};
                    var formattedGridData = [];
                    var descriptionTest = '';
                    function getCodeDescription(filterMenu, fieldName, codeValue, callLocation) {
                        if (filterMenu.menus && filterMenu.menus.length > 0) {
                            for (var i = 0; i < filterMenu.menus.length; i++) {
                                var menu = filterMenu.menus[i];
                                if (menu.fieldName === fieldName) {
                                    for (var j = 0; j < menu.values.length; j++) {
                                        if (menu.values[j].code === codeValue) {
                                            descriptionTest = menu.values[j];
                                        }
                                    }
                                }
                                else if (menu.menus) {
                                    getCodeDescription(menu, fieldName, codeValue)
                                }
                            }
                        }
                    };
                    for (var i = 0; i < crashList.length; i++) {
                        var crashDetail = crashList[i];
                        var crashType = crashDetail[applicableFilters.content['DisplayField']]
                        if (typeof crashType === 'string') {
                            var crashTypeList = crashType.split(',');
                            for (var j = 0; j < crashTypeList.length; j++) {
                                if (crashBins[crashTypeList[j]]) {
                                    crashBins[crashTypeList[j]] += 1;
                                } else {
                                    crashBins[crashTypeList[j]] = 1;
                                }
                            }
                        } else {
                            if (crashBins[crashType]) {
                                crashBins[crashType] += 1;
                            } else {
                                crashBins[crashType] = 1;
                            }
                        }

                        if (applicableFilters.content.SRI) {
                            if (crashDetail.eventonstreet) {
                                if (applicableFilters.content.SRI.indexOf(crashDetail.eventonstreet) < 0) {
                                    applicableFilters.content.SRI += ',' + crashDetail.eventonstreet;
                                }
                            }
                        }
                        else {
                            if (crashDetail.properties.eventonstreet) {
                                applicableFilters.content.SRI = crashDetail.eventonstreet
                            }
                            else {
                                applicableFilters.content.SRI = "";
                            }
                        }
                    }
                    crashBins = sortMapByValue(crashBins, applicableFilters.content['BreakdownField']);
                    if (crashBins.length > 9) { crashBins = crashBins.slice(0, 9); }
                    // need to convert filter codes into readable names. code utilizes the filters listed in
                    // filters.js and the function convertCodeDescription for the conversion
                    for (var j = 0; j < crashBins.length; j++) {
                        var codeNumber = crashBins[j][0];
                        var crashVolume = crashBins[j][1];
                        getCodeDescription(filterStructure, applicableFilters.content['BreakdownField'], codeNumber, 'MP');
                        if (descriptionTest) {
                            formattedGridData.push({
                                y: crashVolume,
                                text: descriptionTest.description,
                            });
                        }
                        else {
                            formattedGridData.push({
                                y: crashVolume,
                                text: codeNumber,
                            });
                        }
                    }
                    formattedGridData.sort(function(b,a) { return a.text - b.text });
                    crashList.sort(function (a, b) { return b.eventyear - a.eventyear }); // sorts the grid data by year descending
                    detailGrid.refresh();
                    detailGrid.renderArray(crashList); // render the sri grid in Results Grid
                    detailGrid.set('sort', [{ property: 'Year', descending: true }])

                    milepostDetailDialog.show();
                    // create and display pie charts
                    var milePostChart = new Chart(milePostDiv);
                    milePostChart.addPlot('default', {
                        type: Pie,
                        labels: false,
                        ticks: false,
                        fixed: true,
                        precision: 1,
                        labelStyle: 'default',      // default/columns/rows/auto
                        htmlLabels: true,            // use HTML to draw labels
                        radius: 90
                    });
                    milePostChart.setTheme(Julie);
                    milePostChart.addAxis('x');
                    milePostChart.addAxis('y', { vertical: true });
                    milePostChart.addSeries('MP Data', formattedGridData);
                    var tip = new Tooltip(milePostChart, 'default', {
                        text: function (o) {
                            return o.chart.series[0].data[o.index].text + ': ' + o.y;
                        }
                    })
                    var mag2 = new dojox.charting.action2d.MoveSlice(milePostChart, "default");
                    fx.animateProperty({
                        node: milepostLoadSpinner,
                        duration: 500,
                        properties: {
                            opacity: 0
                        },
                        onEnd: function () {
                            domConstruct.destroy(milepostLoadSpinner);
                            milePostChart.render();
                            var chartLegend = new Legend({ chart: milePostChart, horizontal: false }, legendDiv);
                        }
                    }).play();
                    if (applicableFilters.content.SRI) {
                        var SRIList = applicableFilters.content.SRI.split(',');
                        if (searchOmniInput.value.length > 0) {
                            var filterArray = [];
                            var filterConstructor = new FilterConstructor({eventonstreet: `'${searchOmniInput.value}'`});
                            Object.keys(filterConstructor.content).forEach(function(key) {
                                let value = filterConstructor.content[key];
                                if (value) {
                                    if (value.indexOf(',') >= 0) {
                                        filterArray.push(`${encodeURIComponent(key)} in (${encodeURIComponent(value)})`);
                                    }
                                    else {
                                        filterArray.push(`${encodeURIComponent(key)} = ${encodeURIComponent(value)}`);
                                    }
                                }
                            });
                            var filter = `filter=${filterArray.join(' and ')}`;
                            fetch(`${baseURL}query/crash_pinellas?columns=${applicableFilters.content['BreakdownField']},count(*)&${filter}&group=${applicableFilters.content['BreakdownField']}&sort=${applicableFilters.content['BreakdownField']} desc`).then(response => {return response.json()}).then(selectedCrashData => {
                                var routeData = [];
                                // var sortedRouteCodes = matchMapSort(crashBins, routeResponse.data.BreakdownList);
                                if (selectedCrashData.length > 9) { selectedCrashData = selectedCrashData.slice(0, 9); }
                                for (var i = 0; i < selectedCrashData.length; i++) {
                                    var codeNumber = selectedCrashData[i][applicableFilters.content['BreakdownField']];
                                    var crashVolume = selectedCrashData[i].count;
                                    getCodeDescription(filterStructure, applicableFilters.content['BreakdownField'], codeNumber, 'SRI');
                                    if (descriptionTest) {
                                        routeData.push({
                                            y: crashVolume,
                                            text: descriptionTest.description,
                                        });
                                    }
                                    else {
                                        routeData.push({
                                            y: crashVolume,
                                            text: codeNumber,
                                        });
                                    }
                                }
                                var routeChart = new Chart(routeDiv);
                                routeChart.addPlot('default', {
                                    type: Pie,
                                    labels: false,
                                    ticks: false,
                                    fixed: true,
                                    precision: 1,
                                    labelStyle: 'default',      // default/columns/rows/auto
                                    htmlLabels: true,            // use HTML to draw labels
                                    radius: 90
                                });
                                routeChart.setTheme(Julie);
                                routeChart.addAxis('x');
                                routeChart.addAxis('y', { vertical: true });
                                routeChart.addSeries('Series A', routeData);
                                var tip = new Tooltip(routeChart, 'default', {
                                    text: function (o) {
                                        return o.chart.series[0].data[o.index].text + ': ' + o.y;
                                    }
                                })
                                var mag2 = new dojox.charting.action2d.MoveSlice(routeChart, 'default');
                                fx.animateProperty({
                                    node: routeLoadSpinner,
                                    duration: 500,
                                    properties: {
                                        opacity: 0
                                    },
                                    onEnd: function () {
                                        domConstruct.destroy(routeLoadSpinner);
                                        routeChart.render();
                                    }
                                }).play();
                            }, errorHandler);
                        } else {
                            if (SRIList.length === 0) {
                                routeDiv.innerHTML = 'No SRI numbers are present in the cluster currently selected.'
                            } else {
                                var filterArray = [];
                                // var filterConstructor = new FilterConstructor();
                                var filterConstructor = new FilterConstructor({eventonstreet: `'${SRIList.join('\',\'')}'`});
                                Object.keys(filterConstructor.content).forEach(function(key) {
                                    let value = filterConstructor.content[key];
                                    if (value) {
                                        if (value.indexOf(',') >= 0) {
                                            filterArray.push(`${encodeURIComponent(key)} in (${encodeURIComponent(value)})`);
                                        }
                                        else {
                                            filterArray.push(`${encodeURIComponent(key)} = ${encodeURIComponent(value)}`);
                                        }
                                    }
                                });
                                var filter = `filter=${filterArray.join(' and ')}`;
                                fetch(`${baseURL}query/crash_pinellas?columns=${applicableFilters.content['BreakdownField']},count(*)&${filter}&group=${applicableFilters.content['BreakdownField']}&sort=${applicableFilters.content['BreakdownField']} desc`).then(response => {return response.json()}).then(selectedCrashData => {
                                    console.log(selectedCrashData);
                                    var routeData = [];
                                    if (selectedCrashData.length > 9) { selectedCrashData = selectedCrashData.slice(0, 9); }
                                    for (var i = 0; i < selectedCrashData.length; i++) {
                                        var codeNumber = selectedCrashData[i][applicableFilters.content['BreakdownField']];
                                        var crashVolume = selectedCrashData[i].count;
                                        getCodeDescription(filterStructure, applicableFilters.content['BreakdownField'], codeNumber, 'SRI');
                                        if (descriptionTest) {
                                            routeData.push({
                                                y: crashVolume,
                                                text: descriptionTest.description,
                                            });
                                        }
                                        else {
                                            routeData.push({
                                                y: crashVolume,
                                                text: codeNumber,
                                            });
                                        }
                                    }
                                    var routeChart = new Chart(routeDiv);
                                    routeChart.addPlot('default', {
                                        type: Pie,
                                        labels: false,
                                        ticks: false,
                                        fixed: true,
                                        precision: 1,
                                        labelStyle: 'default',      // default/columns/rows/auto
                                        htmlLabels: true,            // use HTML to draw labels
                                        radius: 90
                                    });
                                    routeChart.setTheme(Julie);
                                    routeChart.addAxis('x');
                                    routeChart.addAxis('y', { vertical: true });
                                    routeChart.addSeries('Series A', routeData);
                                    var tip = new Tooltip(routeChart, 'default', {
                                        text: function (o) {
                                            return o.chart.series[0].data[o.index].text + ': ' + o.y;
                                        }
                                    })
                                    var mag2 = new dojox.charting.action2d.MoveSlice(routeChart, 'default');
                                    fx.animateProperty({
                                        node: routeLoadSpinner,
                                        duration: 500,
                                        properties: {
                                            opacity: 0
                                        },
                                        onEnd: function () {
                                            domConstruct.destroy(routeLoadSpinner);
                                            routeChart.render();
                                        }
                                    }).play();
                                }, errorHandler);
                            }
                        }



                        // else {
                        //     if (SRIList.length > 10) {
                        //         routeDiv.innerHTML = 'Multiple SRI numbers are present in the currently selected cluster:<br>' + SRIList.slice(0,10).join('<br>');
                        //     } else {
                        //         routeDiv.innerHTML = 'Multiple SRI numbers are present in the currently selected cluster:<br>' + SRIList.join('<br>');
                        //     }
                        // }
                    }
                    else {
                        routeDiv.innerHTML = 'No SRI numbers are present in the currently selected cluster.';
                    }
                    applicableFilters.content['SRI'] = 'STATE';

                    var filterArray = [];
                    var filterConstructor = new FilterConstructor();
                    Object.keys(filterConstructor.content).forEach(function(key) {
                        let value = filterConstructor.content[key];
                        if (value) {
                            if (value.indexOf(',') >= 0) {
                                filterArray.push(`${encodeURIComponent(key)} in (${encodeURIComponent(value)})`);
                            }
                            else {
                                filterArray.push(`${encodeURIComponent(key)} = ${encodeURIComponent(value)}`);
                            }
                        }
                    });
                    var filter = `filter=${filterArray.join(' and ')}`;
                    fetch(`${baseURL}query/crash_pinellas?columns=${applicableFilters.content['BreakdownField']},count(*)&${filter}&group=${applicableFilters.content['BreakdownField']}&sort=${applicableFilters.content['BreakdownField']} desc`).then(response => {return response.json()}).then(selectedCrashData => {
                        console.log(selectedCrashData)
                        // var sortedStateCodes = matchMapSort(crashBins, stateResponse.data.BreakdownList)
                        var stateData = [];
                        for (var i = 0; i < selectedCrashData.length; i++) {
                            var codeNumber = selectedCrashData[i][applicableFilters.content['BreakdownField']];
                            var crashVolume = selectedCrashData[i].count;
                            getCodeDescription(filterStructure, applicableFilters.content['BreakdownField'], codeNumber, 'NJ');
                            if (descriptionTest) {
                                stateData.push({
                                    y: crashVolume,
                                    text: descriptionTest.description,
                                });
                            }
                            else {
                                stateData.push({
                                    y: crashVolume,
                                    text: codeNumber
                                });
                            }
                        }
                        var stateChart = new Chart(stateDiv);
                        stateChart.addPlot("default", {
                            type: Pie,
                            labels: false,
                            ticks: false,
                            fixed: true,
                            precision: 1,
                            labelStyle: "default",      // default/columns/rows/auto
                            htmlLabels: true,            // use HTML to draw labels
                            radius: 90
                        });
                        stateChart.setTheme(Julie);
                        stateChart.addAxis("x");
                        stateChart.addAxis("y", { vertical: true });
                        stateChart.addSeries("Series A", stateData);
                        var tip = new Tooltip(stateChart, "default", {
                            text: function (o) {
                                return o.chart.series[0].data[o.index].text + ': ' + o.y;
                            }
                        });
                        var mag2 = new dojox.charting.action2d.MoveSlice(stateChart, "default");
                        fx.animateProperty({
                            node: stateLoadSpinner,
                            duration: 500,
                            properties: {
                                opacity: 0
                            },
                            onEnd: function () {
                                domConstruct.destroy(stateLoadSpinner);
                                stateChart.render();
                            }
                        }).play();
                    })
                    // esriRequest(SRIBreakdownURL, { query: applicableFilters.content }).then(function (stateResponse) {

                    // }, errorHandler);
                }
                function downloadReportsWidget(Crashes, attachPoint) {
                    var crashesWithReport = Crashes.filter(function (cluster) { return cluster.Directory; });
                    var existingWidgetList = attachPoint.getElementsByClassName('whiteButtonToggle');

                    if (crashesWithReport.length > 0) {
                        // if no download button exists, create one.
                        if (existingWidgetList.length === 0) {
                            domConstruct.create('div', {
                                className: 'whiteButtonToggle downloadReportsButton',
                                style: 'float: left; height: 13px; border: 1px solid rgb(169, 169, 169); border-radius: 3px; vertical-align: middle; padding: 2px 5px; cursor: pointer; font: 400 13.3333px Arial;',
                                innerHTML: 'Download ' + crashesWithReport.length + ' Available NJTR1 Reports',
                                title: 'Download ' + crashesWithReport.length + ' Available NJTR1 Reports',
                                onclick: function () {
                                    // use list of crashes that have a directory, becuase they will
                                    // have a crash associated with them to create list of crashid's.
                                    var crashIDList = crashesWithReport.map(function (clusterWithReport) { return clusterWithReport.Crash_Identifier; }).join("~");
                                    var filter = {
                                        'User': esriId.credentials[0].userId,
                                        'CrashIDArray': crashIDList,
                                        'f': 'json'
                                    };
                                    esriRequest(crashReportsURL, { query: filter }).then(function (response) {
                                        console.log(response);
                                        //self.classList.remove('working');
                                        if (response.data) {
                                            if (response.data.Permissions === 'false') {
                                                downloadErrorContent.innerHTML = 'You currently do not have export permissions for this application. Please contact <a href="mailto:admin@njvoyager.com">admin@njvoyager.com</a> to request data export permissions.';
                                                downloadErrorDialog.show();
                                            } else if (response.data.URL) {
                                                window.location = response.data.URL;
                                            } else if (response.data.Error) {
                                                console.error(response.data.Error);
                                            } else {
                                                console.log('no data was returned from the service ' + response.data);
                                            }
                                        }
                                        else {
                                            downloadErrorContent.innerHTML = 'You currently do not have export permissions for this application. Please contact <a href="mailto:admin@njvoyager.com">admin@njvoyager.com</a> to request data export permissions.';
                                            downloadErrorDialog.show();
                                        }
                                    }, errorHandler);
                                },
                                onmouseenter: function (event) {
                                    if (!(this.classList.contains('greenButtonToggle'))) {
                                        this.classList.add('orangeButtonToggle');
                                        this.classList.remove('whiteButtonToggle');
                                    }
                                },
                                onmouseleave: function (event) {
                                    this.classList.remove('orangeButtonToggle');
                                    this.classList.add('whiteButtonToggle');
                                }
                            }, attachPoint);
                        }
                    }
                }
                if (ClusterData) {
                    var onlyUnique = function (value, index, self) { return self.indexOf(value) === index; }
                    var result = ClusterData.map(function (a) { if (!(a.eventonstreet === null)) { return a.eventonstreet } });
                    var unique = result.filter(onlyUnique);

                    downloadReportsWidget(ClusterData, controlsDiv);

                    if (unique.length === 0) {
                        applicableFilters.content.SRI = '';
                        compareDataScales(ClusterData.Crashes);
                        console.error('No SRI values are specified in this cluster information.');
                    } else if (unique.length === 1) {
                        applicableFilters.content.SRI = unique[0];
                        milepostLabel.innerHTML = 'Cluster Breakdown';
                        compareDataScales(ClusterData.Crashes);
                    } else {
                        applicableFilters.content.SRI = unique.toString();
                        compareDataScales(ClusterData);
                        console.error('More than one SRI is specified in this cluster information.');
                    }
                }
                else {
                    esriRequest(crashListURL, { query: applicableFilters.content }).then(function (response) {
                        var dialogTitle;

                        if (response.data.MilePost >= 0) {
                            dialogTitle = 'Detailed Milepost Information' + (response.data.crashList ? ' (' + response.data.crashList.length + ' Crashes)' : '');
                        }
                        else {
                            dialogTitle = 'Detailed Unmatched Crash Information' + (response.data.crashList ? ' (' + response.data.crashList.length + ' Crashes)' : '');
                        }
                        milepostDetailDialog.set('title', dialogTitle);
                        downloadReportsWidget(response.data.crashList, controlsDiv);
                        compareDataScales(response.data.crashList);
                    }, errorHandler);
                }
            };
            var milepostLabel = domConstruct.create('div', {
                className: 'detailGridLabel',
                innerHTML: ClusterData ? 'Cluster Breakdown' : 'Milepost Breakdown'
            }, crashVariableDiv);
            var routeLabel = domConstruct.create('div', {
                className: 'detailGridLabel',
                innerHTML: 'Route Breakdown'
            }, crashVariableDiv);
            var stateLabel = domConstruct.create('div', {
                className: 'detailGridLabel',
                innerHTML: 'County Breakdown'
            }, crashVariableDiv);
            var addSelectValues = function (selectValues, attachPoint) {
                for (var i = 0; i < selectValues.length; i++) {
                    domConstruct.create('option', {
                        value: selectValues[i].value,
                        innerHTML: selectValues[i].label
                    }, attachPoint);

                    if (selectValues[i].selected === true) {
                        attachPoint.selectedIndex = i;
                    }
                }
            };
            var selectValues = [
                { label: 'Crash Type', value: 'crash_type', displayField: 'Crash_Type' },
                { label: 'Road Condition', value: 'surf_cond_code', displayField: 'Road_Surface_Condition' },
                { label: 'Road Median Type', value: 'road_median_code', displayField: 'Road_Median_Type' },
                { label: 'Year', value: 'eventyear', displayField: 'eventyear', selected: true },
                { label: 'Week Day', value: 'acc_dow', displayField: 'Day_of_Week' },
                { label: 'Environmental Condition', value: 'environ_cond_code', displayField: 'Environmental_Condition' },
                { label: 'Road Characteristic', value: 'road_char_code', displayField: 'Road_Characteristic' },
                { label: 'Highest Severity', value: 'highestseverity', displayField: 'highestseverity' },
                { label: 'Department Type', value: 'dept_num', displayField: 'Police_Department_Type' },
                { label: 'Ramp Direction', value: 'ramp_direction', displayField: 'Ramp_Direction' },
                { label: 'Light Condition', value: 'light_cond_code', displayField: 'Light_Condition' }
            ]; // drop down list items
            // filter the cluster data and return only crashes with a report on file.
            //var crashesWithReports = ClusterData ?  : null;
            var chartingDiv = domConstruct.create('div', {
                className: 'fullSpan'
            }, milepostDetailDialog.containerNode);
            var controlsDiv = domConstruct.create('div', {
                className: 'fullSpan',
                style: 'height: 34px; padding: 7px 7px; width: 830px; background-color: lightgrey; border-radius: 5px; border: 1px solid rgb(169, 169, 169); margin-bottom: 4px;'
            }, milepostDetailDialog.containerNode);
            var crashVariableSelector = domConstruct.create('select', {
                className: '',
                style: 'float: right; border-radius: 3px; width: 240px;',
                onchange: function (event) {
                    self.filter.content['DisplayField'] = selectValues[this.selectedIndex].displayField;
                    self.filter.content['BreakdownField'] = this.value;
                    self.filter.content['SRI'] = SRI;
                    self.filter.content['MilePost'] = MP;
                    refreshStatistics(self.filter);
                }
            }, controlsDiv);
            var gridDiv = domConstruct.create('div', {
                className: 'detailGrid'
            }, milepostDetailDialog.containerNode);

            function formatFunction(value, object) {
                if (object.URL) {
                    return '<a href="' + object.URL + '" target="_blank">' + object.Document_Locator_Number + '</a>';
                }
                else {
                    return object.Document_Locator_Number
                }
            }
            var columns = ['eventyear','hsmv','eventonstreet','totalinjuries','highestseverity','pedestrian'];

            var detailGrid = new Grid({
                //sort: [{ "property": "Year", "descending": true }],
                columns: [
                    {
                        label: 'HSMV', field: 'hsmv'
                        // formatter: formatFunction
                    },
                    { label: 'Year', field: 'eventyear' },   // updated data grid to use ARD  s.g.
                    { label: 'Location', field: 'eventonstreet' },
                    { label: 'Injuries', field: 'totalinjuries' },
                    { label: 'Severity', field: 'highestseverity' },
                    { label: 'Pedestrian', field: 'pedestrian' }
                ],
            }, gridDiv);
            // grid styling for hover effects
            detailGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.enter), function (event) {
                domStyle.set(detailGrid.row(event).element, 'font-weight', 'bold')
                domStyle.set(detailGrid.row(event).element, 'background-color', 'lightgrey')
            });
            detailGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.leave), function (event) {
                domStyle.set(detailGrid.row(event).element, 'font-weight', 'normal')
                domStyle.set(detailGrid.row(event).element, 'background-color', 'white')
            });
            detailGrid.on('.dgrid-cell:dblclick', function (event) {
                var cell = detailGrid.cell(event);
                if (cell) {
                    if (cell.row) {
                        if (cell.row.data) {
                            crashDetailWidget(cell.row.data.Case_Number, cell.row.data.Municipality, cell.row.data.County, cell.row.data.Year);
                        }
                    }
                }
            });
            addSelectValues(selectValues, crashVariableSelector);
            if (String(MP).indexOf('MUNI:') >= 0) {
                this.filter = new FilterConstructor({ 'SRI': SRI, 'Muni': MP, 'BreakdownField': crashVariableSelector.value, 'DisplayField': selectValues[crashVariableSelector.selectedIndex].displayField });
            }
            else {
                this.filter = new FilterConstructor({ 'SRI': SRI, 'MilePost': MP, 'BreakdownField': crashVariableSelector.value, 'DisplayField': selectValues[crashVariableSelector.selectedIndex].displayField });
            }
            refreshStatistics(this.filter);


        }
        // function crashClusterWidget(crashData) {
        //     // crashClusterWidget: dialog that displays rows of crashes w-
        //     // ithin a crash cluster.
        //     // @param {object} crashData: response.data
        //     var self = this;
        //     var milepostDetailDialog = new Dialog({
        //         title: 'Detailed Crash Information (' + crashData.Crashes.length + ' Crashes)',
        //         style: "min-width: 805px; font-size: small;",
        //         onHide: function () {
        //             milepostDetailDialog.destroy()
        //         }
        //     });
        //     var crashVariableDiv = domConstruct.create('div', {
        //         className: 'fullSpan'
        //     }, milepostDetailDialog.containerNode);
        //     var gridDiv = domConstruct.create('div', {
        //         className: 'detailGrid'
        //     }, milepostDetailDialog.containerNode);
        //     // columns in crash grid
        //     var detailGrid = new Grid({
        //         columns: [
        //             { label: 'SRI', field: 'stndrd_rt_id' },
        //             { label: 'MP', field: 'mlpst_num' },
        //             { label: 'Day of Week', field: 'acc_dow' },
        //             { label: 'Year', field: 'year' },
        //             { label: 'Case Number', field: 'case_num' }
        //         ]
        //     }, gridDiv);
        //     milepostDetailDialog.show();
        //     detailGrid.renderArray(crashData.Crashes);
        //     detailGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.enter), function (event) {
        //         domStyle.set(detailGrid.row(event).element, 'font-weight', 'bold')
        //         domStyle.set(detailGrid.row(event).element, 'background-color', 'lightgrey')
        //     });
        //     detailGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.leave), function (event) {
        //         domStyle.set(detailGrid.row(event).element, 'font-weight', 'normal')
        //         domStyle.set(detailGrid.row(event).element, 'background-color', 'white')
        //     });
        //     detailGrid.on('.dgrid-cell:dblclick', function (event) {
        //         var cell = detailGrid.cell(event);
        //         crashDetailWidget(cell.row.data.case_num, cell.row.data.mun_mu, cell.row.data.cnty_code, cell.row.data.year);
        //     });
        // }
        // function searchFilterButtonWidget(attributes, attachPoint) {
        //     // searchFilterButtonWidget: creates the advanced search filt-
        //     // ers tab with buttons for each option
        //     // @params {object} attributes
        //     //         {object} attachPoint */
        //     domConstruct.create('div', {
        //         className: attributes.className + ' searchTypeOptionsButton ' + (attributes.disabled ? '' : 'greenButtonToggle'),
        //         title: attributes.toolTip,
        //         onclick: function (event) {
        //             domClass.toggle(this, 'whiteButtonToggle');
        //             domClass.toggle(this, 'greenButtonToggle');
        //             query('.resetFilters').removeClass('orangeButtonToggle');
        //             query('.resetFilters').addClass('greenButtonToggle');
        //             if (document.querySelectorAll('.searchTypeOptionsButton.greenButtonToggle').length < 5) {
        //                 searchOmniBoxSearchType.classList.add('greenButtonToggle');
        //             }
        //             if (document.querySelectorAll('.searchTypeOptionsButton.greenButtonToggle').length === 5) {
        //                 searchOmniBoxSearchType.classList.remove('greenButtonToggle');
        //                 searchOmniBoxSearchType.classList.add('whiteButtonToggle');
        //             }
        //         }
        //     }, attachPoint);
        // }
        function LocationFilter(filterInfo) {
            // locationFilterWidget: creates the widget that displays SRI,\
            // min and max MP after an SRI search. creates buttons to clear min and max
            // MP, and updates the SRI data if min/max MP are specified.
            // @param {object} filterInfo
            var self = this;
            function resultWidget(SRI, displayName, attachPoint) {
                var routeResultRow = domConstruct.create('tr', {
                    className: 'milePostResultRow'
                }, attachPoint, 'after');
                var routeNameLabel = domConstruct.create('td', {
                    innerHTML: displayName,
                    className: 'milePostResult',
                    colSpan: 7,
                    onclick: function (event) {
                        resultRowClickHandler(SRI, displayName);
                    }
                }, routeResultRow);
                function resultRowClickHandler(SRI, displayName) {
                    flashParcelsGraphicLayer.removeAll();
                    crashData = []; // delete previous sri grid data on new search
                    self.clearAllWidgetSelections();
                    sriOverlayLayer.updateClientSideGraphics({
                        ResultType: 'SRI',
                        ResultID: SRI,
                        ResultText: displayName
                    }, null, self, true, true);
                    searchOmniInput.value = displayName;
                    dojo.query('.milePostResultRow').forEach(dojo.destroy);
                }
            }
            function sriSelector(attachPoint) {
                var milePostRow = domConstruct.create('tr', {
                    className: 'milePostRow',
                }, attachPoint);
                var milePostRowLabel = domConstruct.create('td', {
                    className: 'rowLabel locationFilterCell',
                    title: 'Click here to clear route',
                    innerHTML: 'SRI',
                    onclick: function () {
                        self.clearAllWidgetSelections(false);
                        updateMapGraphics(null, false, 5071);
                        domStyle.set(filtersDivBorder, 'height', '100%');
                        resultsButton.classList.remove('greenButtonToggle');
                        locationFilter.click();
                        fx.animateProperty({
                            node: 'resultsDiv',
                            properties: {
                                opacity: 0
                            },
                            onEnd: function () {
                                var elements = document.getElementsByClassName('esri-attribution');
                                for (var i = 0; i < elements.length; i++) {
                                    elements[i].style.bottom = '0';
                                }
                                fx.animateProperty({
                                    node: 'resultsDiv',
                                    properties: {
                                        height: 64
                                    }
                                }).play();
                                fx.animateProperty({
                                    node: 'resultsButton',
                                    properties: {
                                        bottom: 28
                                    }
                                }).play();
                            }
                        }).play();
                    }
                }, milePostRow);
                var routeNameLabel = domConstruct.create('td', {
                    className: 'locationFilterCell',
                    colSpan: 6
                }, milePostRow);
                var milePostRowInput = domConstruct.create('input', {
                    id: 'milePostRowInput',
                    placeHolder: 'Enter an SRI here...',
                    onkeyup: inputKeyupHandler
                }, routeNameLabel);
                function inputKeyupHandler(event) {
                    var self = this;
                    if (this.value) {
                        // this uses the same filter structure as the main search bar, but omits the
                        // other search types because they are not relavent for the location widget.
                        var filter = {
                            User: esriId.credentials[0].userId,
                            SearchText: this.value,
                            IncludeRoute: true,
                            IncludeCounty: false,
                            IncludeMunicipality: false,
                            IncludeCaseNumber: false,
                            IncludeGooglePlace: false,
                            IncludeGoogleAddress: false,
                            'f': 'json'
                        };
                        esriRequest(searchURL, { query: filter }).then(function (response) {
                            // check if the response back from the server is the search that is expected
                            // from the current input in the text box.
                            if (response.requestOptions.query.SearchText === self.value) {
                                // remove all previous suggestions from the widget
                                dojo.query('.milePostResultRow').forEach(dojo.destroy);
                                // get length of the search results and populate the list with new
                                // suggestions from the results back from the server.
                                var i = response.data.SearchResults.length;
                                while (i--) {
                                    var SRI = response.data.SearchResults[i].ResultID;
                                    var displayName = response.data.SearchResults[i].ResultText;
                                    // create new row widget in the list.
                                    resultWidget(SRI, displayName, milePostRow);
                                }
                            }
                        }, errorHandler);
                    } else {
                        dojo.query('.milePostResultRow').forEach(dojo.destroy);
                    }
                }
                function returnToHome(global) {
                    if (global === false) {
                        crashPointLayer.visible = false;
                        crashPointLayer.removeAll();
                        domClass.remove(flatViewDiv, 'hideMap');
                        domClass.add(roundViewDiv, 'hideMap');
                        flatView.goTo({
                            center: mapCenter,
                            zoom: 8,
                            rotation: 0
                        }).then(function (event) {
                            if (!crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
                                crashPointLayer.visible = true;
                                crashLocationsToggleButton.classList.contains('greenButtonToggle')
                            }
                        });
                    }
                }
                // displays route name in the filters label via Results Grid
                this.updateRouteLabel = function (routeLabel) {
                    if (routeLabel) {
                        milePostRowInput.value = routeLabel;
                    }
                }
                // empty data that was added from SRI search including filter label and crash count
                this.clearRouteFilter = function (global) {
                    sriOverlayLayer.definitionExpression = 'SRI = \'\'';
                    unmatchedDataLayer.definitionExpression = 'SRI = \'\'';
                    //sriOverlayLayer.definitionExpression = '';
                    //unmatchedDataLayer.definitionExpression = '';
                    self.currentRouteData = '';
                    crashCountDiv.style.visibility = 'hidden';
                    crashCountDiv.innerHTML = 'Crash Count: 0';
                    var filter = new FilterConstructor();
                    domStyle.set(routeNameLabel, whiteButtonEffect);
                    milePostRowInput.value = '';
                    resultsGrid.refresh();
                    returnToHome(global);
                };
            }
            function milePostSelector(attachPoint) {
                var mpSelector = this;
                var milePostRow = domConstruct.create('tr', {
                    className: 'milePostRow'
                }, attachPoint);
                var milePostRowLabel = domConstruct.create('td', {
                    className: 'locationFilterCell rowLabel',
                    innerHTML: 'MP',
                    onclick: resetMilePostInput
                }, milePostRow);
                var minMileLabel = domConstruct.create('td', {
                    className: 'locationFilterCell functionalityButton',
                    innerHTML: 'Min',
                    onclick: resetMilePostInput
                }, milePostRow);
                var minMileHolder = domConstruct.create('td', {
                    className: 'locationFilterCell',
                    colSpan: 2
                }, milePostRow);
                this.minMileInput = domConstruct.create('input', {
                    type: 'number',
                    step: 0.1,
                    onchange: minMileInputChange,
                    onkeyup: minMileInputChange
                }, minMileHolder);
                var maxMileHolder = domConstruct.create('td', {
                    className: 'locationFilterCell',
                    colSpan: 2
                }, milePostRow);
                this.maxMileInput = domConstruct.create('input', {
                    type: 'number',
                    step: 0.1,
                    onchange: maxMileInputChange,
                    onkeyup: maxMileInputChange
                }, maxMileHolder);
                var maxMileLabel = domConstruct.create('td', {
                    className: 'locationFilterCell functionalityButton',
                    innerHTML: 'Max',
                    onclick: resetMilePostInput
                }, milePostRow)
                function resetMilePostInput(sender) { // reset milepost values to defaults based on SRI route min and max MP
                    var milePostToReset = sender.srcElement.innerHTML;
                    if (milePostToReset === 'Min') {
                        mpSelector.minMileInput.value = mpSelector.minMileInput.min;
                        mpSelector.maxMileInput.value;
                        domStyle.set(minMileLabel, orangeButtonEffect);
                        minMileLabel.classList.remove('error')
                        self.applyChangesSelector.applyChangesButton.classList.remove('error', 'disabled')
                    }
                    else if (milePostToReset === 'Max') {
                        mpSelector.minMileInput.value;
                        mpSelector.maxMileInput.value = mpSelector.maxMileInput.max;
                        domStyle.set(maxMileLabel, orangeButtonEffect);
                        maxMileLabel.classList.remove('error')
                        self.applyChangesSelector.applyChangesButton.classList.remove('error', 'disabled')
                    }
                    else if (milePostToReset === 'MP') {
                        mpSelector.minMileInput.value = mpSelector.minMileInput.min;
                        mpSelector.maxMileInput.value = mpSelector.maxMileInput.max;
                        domStyle.set(maxMileLabel, orangeButtonEffect);
                        domStyle.set(minMileLabel, orangeButtonEffect);
                        minMileLabel.classList.remove('error')
                        maxMileLabel.classList.remove('error')
                        self.applyChangesSelector.applyChangesButton.classList.remove('error', 'disabled')
                    }
                    else {
                        console.error('No mileposts to clear specified');
                    }
                };
                function minMileInputChange(event) {
                    if (this.value) {
                        mpSelector.maxMileInput.min = this.value;
                        if (this.min && this.max) {
                            if (parseFloat(this.value) >= parseFloat(this.min) && parseFloat(this.value) <= parseFloat(this.max)) {
                                minMileLabel.classList.remove('error')
                                self.applyChangesSelector.applyChangesButton.classList.remove('error', 'disabled')
                            }
                            else {
                                minMileLabel.classList.add('error')
                                self.applyChangesSelector.applyChangesButton.classList.add('error', 'disabled');
                            }
                        }
                        else if (this.min) {
                            this.max = this.maxMileInput.value;
                        }
                        else if (this.max) {
                            console.log('no max value set')
                        }
                        else {
                            this.max = this.maxMileInput.value;
                        }
                    } else {
                        domStyle.set(minMileLabel, orangeButtonEffect);
                    }
                };
                function maxMileInputChange() {
                    if (this.value) {
                        mpSelector.minMileInput.max = this.value;
                        if (this.min && this.max) {
                            if (parseFloat(this.value) >= parseFloat(this.min) && parseFloat(this.value) <= parseFloat(this.max)) {
                                maxMileLabel.classList.remove('error')
                                self.applyChangesSelector.applyChangesButton.classList.remove('error', 'disabled')
                            }
                            else {
                                maxMileLabel.classList.add('error')
                                self.applyChangesSelector.applyChangesButton.classList.add('error', 'disabled');
                            }
                        }
                        else if (this.min) {
                            this.max = this.maxMileInput.value;
                        }
                        else if (this.max) {
                            console.log('no max value set')
                        }
                        else {
                            this.max = this.maxMileInput.value;
                        }
                    } else {
                        domStyle.set(maxMileLabel, orangeButtonEffect);
                    }
                }
                this.updateMilePostLabels = function (minMile, maxMile) { // update min and max MP values based on user inputs
                    if (minMile != null && maxMile != null) { // this unstrict logic test will look for null and undefined
                        mpSelector.minMileInput.value = mpSelector.minMileInput.min = mpSelector.maxMileInput.min = filterInfo.values.minMile = minMile;
                        mpSelector.maxMileInput.value = mpSelector.minMileInput.max = mpSelector.maxMileInput.max = filterInfo.values.maxMile = maxMile;
                        mpSelector.minMileInput.value === mpSelector.minMileInput.min ? domStyle.set(minMileLabel, orangeButtonEffect) : domStyle.set(minMileLabel, greenButtonEffect);
                        mpSelector.maxMileInput.value === mpSelector.maxMileInput.max ? domStyle.set(maxMileLabel, orangeButtonEffect) : domStyle.set(maxMileLabel, greenButtonEffect);
                    }
                };
                this.clearMilePostSelections = function () { // clear MP inputs
                    filterInfo.values.minMile = 0;
                    filterInfo.values.maxMile = 0;
                    mpSelector.minMileInput.value = 0;
                    mpSelector.maxMileInput.value = 0;
                    mpSelector.minMileInput.min = 0;
                    mpSelector.maxMileInput.max = 0;
                    domStyle.set(minMileLabel, orangeButtonEffect);
                    domStyle.set(maxMileLabel, orangeButtonEffect);
                };
            }
            function applyChangesSelector(attachPoint) {
                var rowData = this;
                var applyChangesRow = domConstruct.create('tr', {
                    className: 'milePostRow'
                }, attachPoint);
                rowData.applyChangesButton = domConstruct.create('td', {
                    title: 'Apply Milepost Changes',
                    className: 'locationFilterCell rowLabel',
                    innerHTML: 'Apply Milepost Changes',
                    colSpan: 7,
                    onclick: function (event) {
                        function decimalPlaces(num) {
                            var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                            if (!match) { return 0; }
                            return Math.max(
                                0,
                                // Number of digits right of decimal point.
                                (match[1] ? match[1].length : 0)
                                // Adjust for scientific notation.
                                - (match[2] ? +match[2] : 0));
                        }
                        var loadSpinner = domConstruct.create('img', {
                            src: 'img/simpleSpinner.gif',
                            style: 'display: inline-block; float: right; position: absolute; right: 12px; bottom: 13px; height: 15px;'
                        }, rowData.applyChangesButton, 'first');
                        if (self.currentRouteData) {
                            var graphicUpdateAttributes = {
                                ResultType: 'SRI',
                                ResultID: self.currentRouteData.SRI,
                                ResultText: self.currentRouteData.displayName
                            };
                            graphicUpdateAttributes.definitionString = 'SRI = \'' + self.currentRouteData.SRI + '\'';
                            graphicUpdateAttributes.sriWithMP = { 'SRI': self.currentRouteData.SRI };
                            if (self.extentSelector.minMileInput.value) {
                                var minValueToTest = parseFloat(self.extentSelector.minMileInput.value)
                                if (self.currentRouteData.minMP < minValueToTest) {
                                    graphicUpdateAttributes.definitionString += ' AND MP >= ' + minValueToTest;
                                    graphicUpdateAttributes.sriWithMP['mp_start'] = minValueToTest;
                                }
                                else {
                                    // no filter necessary!!!
                                }
                            }
                            else {
                                // enter a value in the location widget min mile input!!!
                            }
                            if (self.extentSelector.maxMileInput.value) {
                                var maxValueToTest = parseFloat(self.extentSelector.maxMileInput.value);
                                if (self.currentRouteData.maxMP > maxValueToTest) {
                                    graphicUpdateAttributes.definitionString += ' AND MP <= ' + maxValueToTest;
                                    graphicUpdateAttributes.sriWithMP['mp_end'] = maxValueToTest;
                                }
                                else {
                                    // no filter necessary!!!
                                }
                            }
                            else {
                                // enter a value in the location widget max mile input!!!
                            }
                            sriOverlayLayer.updateClientSideGraphics(graphicUpdateAttributes, loadSpinner, self, true, true);
                        }
                        else {
                            console.error('no route data');
                        }
                    }
                }, applyChangesRow);
                rowData.autoZoom = true;
            }
            this.parent = filterInfo;
            this.domNode = domConstruct.create('table', {
                class: 'locationFilterRootContainer'
            });
            this.sriSelection = new sriSelector(this.domNode);
            this.extentSelector = new milePostSelector(this.domNode);
            this.applyChangesSelector = new applyChangesSelector(this.domNode);
            this.clearAllWidgetSelections = function (global) {
                var flyout = this.parent.flyout;
                this.sriSelection.clearRouteFilter(global);
                this.extentSelector.clearMilePostSelections();
                query('.crashFilterFlyoutHeader', flyout.id).forEach(function (node) {
                    domStyle.set(node, orangeButtonEffect);
                    domClass.remove(node, 'crashFilterSelected');
                })
                domStyle.set(this.parent.toggleIcon || this.parent.toggleText, (global ? whiteButtonEffect : orangeButtonEffect));
                domClass.remove(this.parent.toggleIcon || this.parent.toggleText, 'crashFilterSelected');
                searchOmniInput.value = '';
            };
            this.updateWidgetWithCurrentSelections = function (response) {
                var flyout = this.parent.flyout;
                this.currentRouteData = response.data;
                this.sriSelection.updateRouteLabel(response.data.displayName);
                this.extentSelector.updateMilePostLabels(response.data.minMP, response.data.maxMP);
                query('.crashFilterFlyoutHeader', flyout.id).forEach(function (node) {
                    domStyle.set(node, greenButtonEffect);
                    domClass.add(node, 'crashFilterSelected');
                })
                domStyle.set(this.parent.toggleIcon || this.parent.toggleText, greenButtonEffect);
                domClass.add(this.parent.toggleIcon || this.parent.toggleText, 'crashFilterSelected');
            };
            this.getAllWidgetSelections = function () {
                var routeInfoObject = {};
                var formattedSRIString = '';
                if (this.currentRouteData) {
                    if (self.extentSelector.maxMileInput.value) {
                        if (self.currentRouteData.maxMP > self.extentSelector.maxMileInput.value) {
                            if (self.extentSelector.minMileInput.value) {
                                if (self.currentRouteData.minMP < self.extentSelector.minMileInput.value) {
                                    routeInfoObject['SRI'] = this.currentRouteData.SRI;
                                    routeInfoObject['mp_start'] = self.extentSelector.minMileInput.value;
                                    routeInfoObject['mp_end'] = self.extentSelector.maxMileInput.value;
                                }
                                else {
                                    routeInfoObject['SRI'] = this.currentRouteData.SRI;
                                    routeInfoObject['mp_start'] = this.currentRouteData.minMP;
                                    routeInfoObject['mp_end'] = self.extentSelector.maxMileInput.value;
                                }
                            }
                            else {
                                routeInfoObject['SRI'] = this.currentRouteData.SRI;
                                routeInfoObject['mp_start'] = this.currentRouteData.minMP;
                                routeInfoObject['mp_end'] = self.extentSelector.maxMileInput.value;
                            }
                        }
                        else {
                            if (self.currentRouteData.minMP < self.extentSelector.minMileInput.value) {
                                routeInfoObject['SRI'] = this.currentRouteData.SRI;
                                routeInfoObject['mp_start'] = self.extentSelector.minMileInput.value;
                                routeInfoObject['mp_end'] = this.currentRouteData.maxMP;
                            }
                            else {
                                routeInfoObject['SRI'] = this.currentRouteData.SRI;
                            }
                        }
                    }
                    else {
                        if (self.extentSelector.minMileInput.value) {
                            if (self.currentRouteData.minMP < self.extentSelector.minMileInput.value) {
                                routeInfoObject['SRI'] = this.currentRouteData.SRI;
                                routeInfoObject['mp_start'] = self.extentSelector.minMileInput.value;
                                routeInfoObject['mp_end'] = this.currentRouteData.maxMP;
                            }
                            else {
                                routeInfoObject['SRI'] = this.currentRouteData.SRI;
                            }
                        }
                        else {
                            routeInfoObject['SRI'] = this.currentRouteData.SRI;
                        }
                    }
                    return routeInfoObject;
                } else {
                    return '';
                }
            };
            filterInfo.values = {};
        }
        // function setFiltersAvailable(filterTreeRoot, attributeToFilterOn, addClass) {
        //     // setFiltersAvailable: disables the filters at the beginning
        //     // @params {object} filterTreeRoot: filterStructure
        //     //         {string} attributeToFilterOn: attribute that will disable filter
        //     //         {bool} addClass: true if the class is to be added
        //     if (filterTreeRoot.menus && filterTreeRoot.menus.length > 0) {
        //         for (var i = 0; i < filterTreeRoot.menus.length; i++) {
        //             var menu = filterTreeRoot.menus[i];
        //             if (menu[attributeToFilterOn] === true) {
        //             } else {
        //                 if (addClass) { domClass.add(menu.toggleIcon || menu.toggleText, 'disabled') }
        //                 else { domClass.remove(menu.toggleIcon || menu.toggleText, 'disabled') }
        //             }
        //             if (menu.menus) {
        //                 setFiltersAvailable(menu, attributeToFilterOn, addClass);
        //             }
        //         }
        //     }
        // }




        function orderMagnitudeStops(propertyArray, power, shift) {
            var redMin = 0;
            var greenMin = 255;
            var blueMin = 0;

            var redMax = 255;
            var greenMax = 0;
            var blueMax = 0;

            // if (visualVariableSelect.value === 'project_compensation') {
            //     // 0, 150, 136
            //     redMin = 41;
            //     greenMin = 100;
            //     blueMin = 100;
            //     // 255, 245, 157
            //     redMax = 41;
            //     greenMax = 182;
            //     blueMax = 246;
            // }


            if (propertyArray.length > 1) {
                var minValue = Math.min.apply(Math, propertyArray);
                var maxValue = Math.max.apply(Math, propertyArray);

                var steps = [[minValue, `rgb(${redMin}, ${greenMin}, ${blueMin})`]];
                // var order = Math.floor(Math.log(maxValue - minValue) / Math.LN10 + 0.000000001);
                //
                // if (order > shift) {
                //     Array(order - shift).fill(1).map((x, y) => x + y).forEach(function(number) {
                //         var stepValue = (maxValue - minValue) / Math.pow(10, order - number);
                //         if (stepValue / minValue >= 10) {
                //             steps.push([stepValue, `rgb(${redMax - redMax * Math.pow(power, number)}, ${greenMax - greenMax * Math.pow(power, number)}, ${blueMax-blueMax * Math.pow(power, number)})`]);
                //         }
                //     });
                // }
                // else {
                //     Array(order).fill(1).map((x, y) => x + y).forEach(function(number) {
                //         var stepValue = (maxValue - minValue) / Math.pow(10, order - number);
                //         if (stepValue / minValue >= 10) {
                //             steps.push([stepValue, `rgb(${redMax-redMax*Math.pow(power, number)}, ${greenMax-greenMax*Math.pow(power, number)}, ${blueMax-blueMax*Math.pow(power, number)})`]);
                //         }
                //     });
                // }

                steps.push([maxValue, `rgb(${redMax}, ${greenMax}, ${blueMax})`]);

                return steps
            } else if (propertyArray.length > 0) {
                return [[propertyArray[0], `rgb(${redMax}, ${greenMax}, ${blueMax})`]]
            } else {
                return [];
            }
        }
        function orderMagnitudeStopsHeight(propertyArray, power, shift) {
            var propertyMin = 0;
            var propertyMax = 2500;

            if (propertyArray.length > 300) {
                var minValue = Math.min.apply(Math, propertyArray);
                var maxValue = Math.max.apply(Math, propertyArray);

                var steps = [[minValue, propertyMin]];

                // var order = Math.floor(Math.log(maxValue - minValue) / Math.LN10 + 0.000000001);
                // if (order > shift) {
                //     Array(order - shift).fill(1).map((x, y) => x + y).forEach(function(number) {
                //         var stepValue = (maxValue - minValue) / Math.pow(10, order - number);
                //         if (stepValue / minValue >= 10) {
                //             steps.push([stepValue, propertyMax - propertyMax*Math.pow(power, number)]);
                //         }
                //     });
                // }
                // else {
                //     Array(order).fill(1).map((x, y) => x + y).forEach(function(number) {
                //         var stepValue = (maxValue - minValue) / Math.pow(10, order - number);
                //         if (stepValue / minValue >= 10) {
                //             steps.push([(maxValue - minValue) / Math.pow(10, order - number), propertyMax - propertyMax*Math.pow(power, number)]);
                //         }
                //     });
                // }

                steps.push([maxValue, 10000]);

                return steps;
            } else if (propertyArray.length > 100) {
                var minValue = Math.min.apply(Math, propertyArray);
                var maxValue = Math.max.apply(Math, propertyArray);

                var steps = [[minValue, propertyMin]];

                steps.push([maxValue, 2500]);

                return steps;
            } else if (propertyArray.length > 50) {
                var minValue = Math.min.apply(Math, propertyArray);
                var maxValue = Math.max.apply(Math, propertyArray);

                var steps = [[minValue, propertyMin]];

                steps.push([maxValue, 1250]);

                return steps;
            } else if (propertyArray.length > 0) {
                var minValue = Math.min.apply(Math, propertyArray);
                var maxValue = Math.max.apply(Math, propertyArray);

                var steps = [[minValue, propertyMin]];

                steps.push([maxValue, 500]);

                return steps;
            } else {
                return [];
            }
        }
        function setNewFillExtrusionSymbology(data, layer, attribute) {
            if (data.features && data.features.length > 0) {
                var propertyValues = data.features.map(feature => feature.properties[attribute]);
                var power = attribute === 'count' ? 0.5 : 0.9;
                var shift = attribute === 'count' ? 1 : 3;

                var minValue = Math.min.apply(Math, propertyValues);
                var maxValue = Math.max.apply(Math, propertyValues);
                var newFillExtrusionColor = {
                    property: attribute,
                    stops: orderMagnitudeStops(propertyValues, power, shift)
                };
                var newFillExtrusionHeight = {
                    property: attribute,
                    stops: orderMagnitudeStopsHeight(propertyValues, power, shift)
                }
            }
            else {
                var newFillExtrusionColor = {
                    property: attribute,
                    stops: [[0, 'rgb(0, 100, 0)']]
                };
                var newFillExtrusionHeight = {
                    property: attribute,
                    stops: [[0, 0]]
                }
            }

            map.setPaintProperty(layer, 'fill-extrusion-color', newFillExtrusionColor);
            map.setPaintProperty(layer, 'fill-extrusion-height', newFillExtrusionHeight);
        }


        function omniResultWidget(attributes, attachPoint, parent) {
            // omniResultWidget: displays result of search depending on w-
            // hat category the search was.
            // County/Municipality: zooms to the relevant area and highlights border
            // Address: zooms to relevant area and places an orange marker at the address
            // SRI: zooms to SRI route and displays crash data
            // Casenumber: displays crash details for the case number
            // @params {object} attributes: applied filters
            // {div} attachPoint: searchOmniBoxResults
            // {div} parent: searchOmniBox
            function findCheckBox(filterTreeRoot, searchValue) {
                if (filterTreeRoot.menus && filterTreeRoot.menus.length > 0) {
                    for (var i = 0; i < filterTreeRoot.menus.length; i++) {
                        var menu = filterTreeRoot.menus[i];
                        if (menu.values) {
                            for (var j = 0; j < menu.values.length; j++) {
                                var currentValue = menu.values[j];
                                if (menu.values[j].code === searchValue) {
                                    if (menu.widgets[0].widget.checkBoxes[j].children[0].classList.contains('crashFilterSelected')) {
                                    } else {
                                        menu.widgets[0].widget.selectedFilters = [searchValue];
                                        menu.widgets[0].widget.checkBoxes[j].children[0].click();
                                    }
                                }
                                else {
                                    if (menu.widgets[0].widget.checkBoxes[j].children[0].classList.contains('crashFilterSelected')) {
                                        menu.widgets[0].widget.selectedFilters = [searchValue];
                                        menu.widgets[0].widget.checkBoxes[j].children[0].click();
                                    } else {
                                    }
                                }
                            }
                        }
                        if (menu.menus) {
                            findCheckBox(menu, searchValue);
                        }
                    }
                }
            }
            function findSelectAll(filterTreeRoot, fieldName, value) {
                if (filterTreeRoot.menus && filterTreeRoot.menus.length > 0) {
                    for (var i = 0; i < filterTreeRoot.menus.length; i++) {
                        var menu = filterTreeRoot.menus[i];
                        if (menu.parentFieldName === fieldName) {
                            if (menu.code === value) {
                                var widget = menu.widgets[0].widget;
                                widget.selectEntireTable(false);
                            }
                        }
                        if (menu.menus) {
                            findSelectAll(menu, fieldName, value);
                        }
                    }
                }
            }
            function omniClickHandler(event) {
                var self = this;
                var omniData = {};
                var loadSpinner;
                var filterClearWidget = filterStructure.menus[filterStructure.menus.length - 1].widgets[0].widget
                var countyCode;
                if (this.querySelector('img')) { } // Don't allow the user to click more than one time on an omni result
                else {
                    loadSpinner = domConstruct.create('img', {
                        src: 'img/simpleSpinner.gif',
                        style: 'height: 15px; float: right'
                    }, this, 'first');
                    // graphicsLayer.removeAll();
                    if (attributes.ResultType === 'CASE') { // remove the space in Case Number result type
                        filterClearWidget.clearAllFilters(filterStructure.menus);
                        var identificationArray = attributes.ResultID.split('|');
                        if (identificationArray.length === 4) {
                            var caseNumber = identificationArray[0];
                            var county = identificationArray[1];
                            var municipality = identificationArray[2];
                            var year = identificationArray[3];
                            domConstruct.destroy(loadSpinner);
                            query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                            crashDetailWidget(caseNumber, municipality, county, year)
                            searchOmniInput.value = attributes.ResultText;
                        } else {
                            console.error('the identification array returned from the search service (' + attributes.ResultID + ') did not have all the necessary information to find the case');
                        }
                    }
                    else if (attributes.ResultType === 'COUNTY') {
                        if (attributes.ResultText !== searchOmniInput.value) {
                            filterClearWidget.clearAllFilters(filterStructure.menus);
                            var fipsstCode = attributes.ResultID.split('|')[1];
                            // this line gets the fips code to pair with the object ID returned later
                            // it would be better to return the fipscode in the future
                            var fipsCode = fipsstCode.substring(fipsstCode.lastIndexOf('0') + 1, fipsstCode.length);
                            var countyQueryTask = new QueryTask({ url: countyLayerURL });
                            var countyQuery = new superQuery();
                            // match the format for the drop down so that the county will be correctly selected
                            countyCode = attributes.ResultID.split('|')[0] + '-' + fipsCode;
                            crashData = []; // delete previous sri grid data on new search
                            filterClearWidget.clearAllLabels(['.filterTextBox'], true);
                            resultsButton.classList.remove('greenButtonToggle');
                            crashLocationsToggleButton.classList.remove('whiteButtonToggle')
                            crashLocationsToggleButton.classList.add('greenButtonToggle')
                            //domClass.remove(crashLocationsToggleButton, 'whiteButtonToggle');
                            //domClass.add(crashLocationsToggleButton, 'greenButtonToggle');
                            setFiltersAvailable(filterStructure, 'crashClusterCapable', true);
                            crashPointLayer.visible = true;
                            countyQuery.returnGeometry = true;
                            countyQuery.outFields = ["*"];
                            countyQuery.where = 'FIPSSTCO = \'' + fipsstCode + '\'';
                            countyQueryTask.execute(countyQuery).then(function (results) {
                                domConstruct.destroy(loadSpinner);
                                query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                                var polygon = new Polygon(results.features[0].geometry);
                                var fillSymbol = new SimpleFillSymbol({
                                    style: 'none',
                                    outline: new SimpleLineSymbol({
                                        color: 'blue',
                                        width: 3
                                    })
                                });
                                var polygonGraphic = new Graphic({
                                    geometry: polygon,
                                    symbol: fillSymbol
                                });
                                flashParcelsGraphicLayer.removeAll();
                                flashParcelsGraphicLayer.add(polygonGraphic);
                                flatView.rotation = 0;
                                flatView.goTo(polygonGraphic).then(function (event) {
                                    findCheckBox(filterStructure, countyCode)
                                    setTimeout(function () {
                                        flashParcelsGraphicLayer.removeAll();
                                    }, 2000);
                                });
                            }, errorHandler);
                            searchOmniInput.value = attributes.ResultText;
                        }
                        else {
                            domConstruct.destroy(loadSpinner);
                            query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                        }
                    }
                    else if (attributes.ResultType === 'MUNICIPALITY') {
                        if (attributes.ResultText !== searchOmniInput.value) {
                            filterClearWidget.clearAllFilters(filterStructure.menus);
                            var cityName = attributes.ResultID.split('|')[1];
                            var cityCode = attributes.ResultID.split('|')[0];
                            var queryTask = new QueryTask({ url: cityLayerURL });
                            var munQuery = new superQuery();
                            countyCode = attributes.ResultID.split('|')[2];
                            //filterClearWidget.clearAllLabels(['.filterTextBox'], true);
                            crashData = []; // delete previous sri grid data on new search
                            resultsButton.classList.remove('greenButtonToggle');
                            setFiltersAvailable(filterStructure, 'crashClusterCapable', true);
                            if (crashLocationsToggleButton.classList.contains('whiteButtonToggle')) { crashLocationsToggleButton.click(); }
                            crashPointLayer.visible = true;
                            munQuery.returnGeometry = true;
                            munQuery.outFields = ["*"];
                            munQuery.where = 'SSN = \'' + countyCode + cityCode + '\'';
                            queryTask.execute(munQuery).then(function (results) {
                                var polygon = new Polygon(results.features[0].geometry);
                                var fillSymbol = new SimpleFillSymbol({
                                    style: 'none',
                                    outline: new SimpleLineSymbol({
                                        color: 'blue',
                                        width: 3
                                    })
                                });
                                var polygonGraphic = new Graphic({
                                    geometry: polygon,
                                    symbol: fillSymbol
                                });
                                domConstruct.destroy(loadSpinner);
                                query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                                flashParcelsGraphicLayer.removeAll();
                                flatView.rotation = 0;
                                flatView.goTo(polygonGraphic).then(function (event) {
                                    findCheckBox(filterStructure, countyCode + cityCode);
                                    flashParcelsGraphicLayer.add(polygonGraphic);
                                    setTimeout(function () {
                                        flashParcelsGraphicLayer.removeAll();
                                    }, 2000);
                                });
                            }, errorHandler);
                            searchOmniInput.value = attributes.ResultText;
                        }
                        else {
                            domConstruct.destroy(loadSpinner);
                            query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                        }
                    }
                    else if (attributes.ResultType === 'GEOCODER') {
                        filterClearWidget.clearAllFilters(filterStructure.menus);
                        flashParcelsGraphicLayer.removeAll();
                        domConstruct.destroy(loadSpinner);
                        crashData = [];     // delete previous sri grid data on new search
                        query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                        flatView.rotation = 0;
                        flatView.animateTo(new Extent(attributes.ResultPosition));
                        searchOmniInput.value = attributes.ResultText;
                    }
                    else if (attributes.ResultType === 'PLACE') {
                        filterClearWidget.clearAllFilters(filterStructure.menus);
                        flashParcelsGraphicLayer.removeAll();
                        crashData = [];     // delete previous sri grid data on new search
                        attributes['PlaceID'] = attributes.ResultID;
                        attributes['f'] = 'json';
                        attributes['User'] = esriId.credentials[0].userId;
                        filterClearWidget.clearAllLabels(['.filterTextBox'], false);

                        query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                        domStyle.set(parent.locationFilterWidget.parent.toggleIcon, whiteButtonEffect);
                        domStyle.set(parent.locationFilterWidget.parent.flyout.id, { display: 'none' });

                        esriRequest(getPlaceXYURL, { query: attributes }).then(function (response) {
                            var mergedAttributes = Object.assign(response.data.PlaceLocation, response.requestOptions.query);
                            var pointMarker = new Point();
                            pointMarker.latitude = response.data.PlaceLocation.lat;
                            pointMarker.longitude = response.data.PlaceLocation.lng;

                            var markerSymbol = new PictureMarkerSymbol({
                                url: 'img/locationPin.png',
                                width: 30,
                                height: 30,
                                xoffset: 1,
                                yoffset: 12
                            });
                            var flatPolygonGraphic = new Graphic({
                                geometry: pointMarker,
                                symbol: markerSymbol,
                                attributes: mergedAttributes,
                                popupTemplate: new PopupTemplate({
                                    title: "Place: {ResultText}", // The title of the popup will be the name of the pipeline
                                    content: "{*}" // Displays a table of all the attributes in the popup
                                })
                            });

                            domConstruct.destroy(loadSpinner);
                            flatView.rotation = 0;
                            flatView.zoom = 16;
                            flatView.goTo({
                                center: [response.data.PlaceLocation.lng, response.data.PlaceLocation.lat]
                            }).then(function (event) {
                                updateMapGraphics(null, false, 'crashLocationsToggleButton');
                                crashLocationsToggleButton.classList.remove('whiteButtonToggle')
                                crashLocationsToggleButton.classList.remove('orangeButtonToggle')
                                crashLocationsToggleButton.classList.add('greenButtonToggle')
                                dimensionToggleButton.classList.remove('greenButtonToggle')
                                dimensionToggleButton.classList.remove('whiteButtonToggle')
                                dimensionToggleButton.classList.add('disabled')
                                if (flatViewDiv.classList.contains('hideMap')) {
                                    flatViewDiv.classList.remove('hideMap');
                                    roundViewDiv.classList.add('hideMap');
                                } else {
                                    flatViewDiv.classList.add('active');
                                }
                                crashPointLayer.visible = true;
                                graphicsLayer.visible = true;
                                columnChooser.classList.remove('whiteButtonToggle');
                                printGrid.classList.remove('whiteButtonToggle');
                                reportOne.classList.remove('whiteButtonToggle');
                                columnChooser.classList.add('disabled');
                                filterMenuToggle.classList = '';
                                graphicsLayer.add(flatPolygonGraphic);
                            });
                        }, errorHandler);
                        searchOmniInput.value = attributes.ResultText;
                    }
                    else if (attributes.ResultType === 'ADDRESS') {
                        var coordinates = attributes.ResultID.split('|');
                        var pointMarker = new Point({
                            latitude: coordinates[1],
                            longitude: coordinates[0]
                        });
                        var markerSymbol = new PictureMarkerSymbol({
                            url: 'img/locationPin.png',
                            width: 30,
                            height: 30,
                            xoffset: 1,
                            yoffset: 12
                        });
                        var flatPolygonGraphic = new Graphic({
                            geometry: pointMarker,
                            symbol: markerSymbol,
                            attributes: attributes,
                            popupTemplate: new PopupTemplate({
                                title: "Place: {ResultText}",  // The title of the popup will be the name of the pipeline
                                content: "{*}"    // Displays a table of all the attributes in the popup
                            })
                        });

                        filterClearWidget.clearAllFilters(filterStructure.menus);
                        crashData = []; // delete previous sri grid data on new search
                        flashParcelsGraphicLayer.removeAll();
                        query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                        domStyle.set(parent.locationFilterWidget.parent.toggleIcon, whiteButtonEffect);
                        domStyle.set(parent.locationFilterWidget.parent.flyout.id, { display: 'none' });
                        domConstruct.destroy(loadSpinner);
                        flatView.rotation = 0;

                        flatView.goTo({
                            target: pointMarker,
                            zoom: 16
                        }).then(function (event) {
                            crashLocationsToggleButton.classList.remove('whiteButtonToggle')
                            crashLocationsToggleButton.classList.remove('orangeButtonToggle')
                            crashLocationsToggleButton.classList.add('greenButtonToggle')
                            dimensionToggleButton.classList.remove('greenButtonToggle')
                            dimensionToggleButton.classList.remove('whiteButtonToggle')
                            dimensionToggleButton.classList.add('disabled')
                            if (flatViewDiv.classList.contains('hideMap')) {
                                flatViewDiv.classList.remove('hideMap');
                                roundViewDiv.classList.add('hideMap');
                            } else {
                                flatViewDiv.classList.add('active');
                            }
                            crashPointLayer.visible = true;
                            graphicsLayer.visible = true;
                            columnChooser.classList.remove('whiteButtonToggle');
                            printGrid.classList.remove('whiteButtonToggle');
                            reportOne.classList.remove('whiteButtonToggle');
                            columnChooser.classList.add('disabled');
                            filterMenuToggle.classList = '';
                            updateMapGraphics(null, false, 'crashLocationsToggleButton');
                            graphicsLayer.add(flatPolygonGraphic);
                        });
                        searchOmniInput.value = attributes.ResultText;
                    }
                    else if (attributes.ResultType === 'Address Search') {
                        filterClearWidget.clearAllFilters(filterStructure.menus);
                        var filter = {
                            User: esriId.credentials[0].userId,
                            SearchText: attributes.ResultID,
                            IncludeRoute: false,
                            IncludeCounty: false,
                            IncludeMunicipality: false,
                            IncludeCaseNumber: false,
                            IncludeGooglePlace: true,
                            IncludeGoogleAddress: true,
                            'f': 'json'
                        };
                        document.querySelector('.searchHanger').classList.remove('hidden');
                        clearTimeout(self.timeoutTracker);
                        searchOmniInput.value = attributes.ResultID;
                        esriRequest(searchURL, { query: filter }).then(function (response) {
                            var filteredQueryResults = [];
                            var count = 0;
                            document.querySelector('.searchTypeOptions').classList.remove('roundedBottom');
                            document.querySelector('.searchOmniBoxResults').classList.remove('hidden');
                            query('.searchOmniBoxResultElement').forEach(function (node) { domConstruct.destroy(node); });
                            if (response.data.SearchResults) {
                                if (response.data.SearchResults.length > 0) {
                                    for (var i = 0; i < response.data.SearchResults.length; i++) {
                                        omniResultWidget(response.data.SearchResults[i], searchOmniBoxResults, searchOmniBox)
                                    }
                                }
                                else {
                                    console.log('no address search results!')
                                }
                            }
                            else {
                                console.log('no address search results!')
                            }
                            domConstruct.destroy(loadSpinner);
                        }, errorHandler);
                    }
                    else if (attributes.ResultType === 'Case Number Search') {
                        filterClearWidget.clearAllFilters(filterStructure.menus);
                        var filter = {
                            User: esriId.credentials[0].userId,
                            SearchText: attributes.ResultID,
                            IncludeRoute: false,
                            IncludeCounty: false,
                            IncludeMunicipality: false,
                            IncludeCaseNumber: true,
                            IncludeGooglePlace: false,
                            IncludeGoogleAddress: false,
                            'f': 'json'
                        };
                        document.querySelector('.searchHanger').classList.remove('hidden');
                        clearTimeout(self.timeoutTracker);
                        esriRequest(searchURL, { query: filter }).then(function (response) {
                            var filteredQueryResults = [];
                            var count = 0;
                            document.querySelector('.searchTypeOptions').classList.remove('roundedBottom');
                            document.querySelector('.searchOmniBoxResults').classList.remove('hidden');
                            query('.searchOmniBoxResultElement').forEach(function (node) { domConstruct.destroy(node); });
                            if (response.data.SearchResults.length > 0) {
                                while (filteredQueryResults.length < 20 && response.data.SearchResults[count]) {
                                    var currentResult = response.data.SearchResults[count];
                                    filteredQueryResults.push(currentResult);
                                    count++;
                                }
                                for (var i = 0; i < filteredQueryResults.length; i++) {
                                    omniResultWidget(filteredQueryResults[i], searchOmniBoxResults, searchOmniBox)
                                }
                            }
                            else {
                                console.log('no case number search results!')
                            }
                            domConstruct.destroy(loadSpinner);
                        }, errorHandler);
                    }
                    else if (attributes.ResultType === 'SRI' || attributes.ResultType === 'RTE') {
                        var route_histogram_source = map.getSource('route_histogram_source');
                        var route_histogram_layer = map.getLayer('route_histogram_layer');

                        var filterArray = [];
                        // var filterConstructor = new FilterConstructor();
                        var filterConstructor = new FilterConstructor();
                        Object.keys(filterConstructor.content).forEach(function(key) {
                            let value = filterConstructor.content[key];
                            if (value) {
                                if (value.indexOf(',') >= 0) {
                                    filterArray.push(`${encodeURIComponent(key)} in (${encodeURIComponent(value)})`);
                                }
                                else {
                                    filterArray.push(`${encodeURIComponent(key)} = ${encodeURIComponent(value)}`);
                                }
                            }
                        });
                        var filter = `filter=${filterArray.join(' and ')}`;

                        fetch(`${baseURL}routeHistogram/centerline_buffer?geom_column=wkb_geometry&routeName=${attributes.fullname}&${filter}`).then(response => {return response.json()}).then(centerlineFeatures => {
                            query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
                            if (loadSpinner) {
                                if (loadSpinner.classList) {
                                    if (loadSpinner.classList.length > 0) {
                                        loadSpinner.classList.remove('crashFilterWorking');
                                        loadSpinner.classList.remove('working');
                                    }
                                    else {
                                        domConstruct.destroy(loadSpinner);
                                    }
                                }
                                else if (loadSpinner.domNode) {
                                    var workingElements = loadSpinner.domNode.querySelectorAll('.working');
                                    workingElements.forEach(function (node) {
                                        node.classList.remove('working');
                                    });
                                }
                                else {
                                    domConstruct.destroy(loadSpinner);
                                }
                            }

                            map.fitBounds(centerlineFeatures.bbox, {
                                padding: {top: 25, bottom:25, left: 25, right: 25},
                                pitch: 60,
                                bearing: (Math.atan2(centerlineFeatures.bbox[1][0] - centerlineFeatures.bbox[0][0], centerlineFeatures.bbox[1][1] - centerlineFeatures.bbox[0][1]) * 180 / Math.PI) - 90
                            });

                            if (route_histogram_source) {
                                route_histogram_source.setData(centerlineFeatures)
                            } else {
                                map.addSource('route_histogram_source', {
                                    type: 'geojson',
                                    data: centerlineFeatures
                                });
                                map.addLayer({
                                    id: 'route_histogram_layer',
                                    source: 'route_histogram_source',
                                    'type': 'fill-extrusion',
                                    minzoom: 5,
                                })
                            }


                            map.setLayoutProperty('route_histogram_layer', 'visibility', 'visible');
                            map.setLayoutProperty('crash_heatmap', 'visibility', 'none');
                            map.setLayoutProperty('muni_cluster_layer', 'visibility', 'none');
                            map.setLayoutProperty('muni_cluster_count', 'visibility', 'none');
                            if (map.getSource('crash_cluster_source')) {
                                map.setLayoutProperty('clusters', 'visibility', 'none');
                                map.setLayoutProperty('cluster_count', 'visibility', 'none');
                                map.setLayoutProperty('cluster_individual', 'visibility', 'none');
                                map.setLayoutProperty('cluster_count_individual', 'visibility', 'none');
                            }


                            setNewFillExtrusionSymbology(centerlineFeatures, 'route_histogram_layer', 'count');



                        })

                        searchOmniInput.value = attributes.fullname;
                    }
                    else {
                        console.log('Result type :' + attributes.ResultType + 'does not have a codified treatment function.');
                    }
                }
            }
            domConstruct.create('div', {
                parent: parent,
                className: 'searchOmniBoxResultElement omniElement',
                innerHTML: attributes.ResultType + ': ' + attributes.fullname,
                onclick: omniClickHandler
            }, attachPoint);
        }
        function clearFiltersWidget(filterContent, flyoutContainer) {
            // clearFiltersWidget: clears all filters that are applied
            // @params {object} filterContent: filter items that will be cleared
            //         {div} flyoutContainer: the flyout the filters are contained in
            var self = this;
            this.clearAllFilters = function (menusToClear) {
                for (var i = 0; i < menusToClear.length; i++) {
                    var currentFilterMenu = menusToClear[i];
                    if (currentFilterMenu.menus) {
                        this.clearAllFilters(currentFilterMenu.menus);
                    }
                    // clear all filters for date, location, and tables
                    if (currentFilterMenu.values) {
                        for (var j = 0; j < currentFilterMenu.widgets.length; j++) {
                            var widgetType = currentFilterMenu.widgets[j].widgetType;
                            var widget = currentFilterMenu.widgets[j].widget;
                            if (widgetType === 'date') {
                                widget.clearAllWidgetSelections();
                            }
                            if (widgetType === 'location') {
                                widget.clearAllWidgetSelections(true);
                            }
                            if (widgetType === 'table') {
                                widget.clearTable(true);
                            }
                        }
                    }
                }
            }
            // clear out the filters label in the Results Grid
            this.clearAllLabels = function (labelsToClear, hideResults) {
                self.returnToHome();
                labelsToClear.forEach(function (labelIdentifier) {
                    query('.filterTextBox').forEach(function (label) {
                        label.innerHTML = '';
                    });
                });
                if (hideResults) {
                    if (domStyle.get('resultsDiv', 'opacity') > 0) {
                        fx.animateProperty({
                            node: 'resultsDiv',
                            properties: {
                                opacity: 0
                            },
                            onEnd: function () {
                                fx.animateProperty({
                                    node: 'resultsDiv',
                                    properties: {
                                        height: 64
                                    }
                                }).play();
                                fx.animateProperty({
                                    node: 'resultsButton',
                                    properties: {
                                        bottom: 28
                                    }
                                }).play();
                            }
                        }).play();
                        var elements = document.getElementsByClassName('esri-attribution');
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].style.bottom = '0';
                        }
                        domStyle.set(filtersDivBorder, 'height', '100%');
                    }
                }
                query('.filterIconButton:not(.crashFilterSelected):not(.filterDisable)').style("background-color", "white");
                query('.crashFilterFlyout').style('display', 'none');
            }
            this.returnToHome = function () {
                graphicsLayer.removeAll();
                domClass.remove(flatViewDiv, 'hideMap');
                domClass.add(roundViewDiv, 'hideMap');
                crashLocationsToggleButton.classList.add('greenButtonToggle');
                flatView.goTo({
                    center: mapCenter,
                    zoom: 8,
                    rotation: 0
                }).then(function (event) {
                    //if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
                    //}
                    //else {
                    //    //crashLocationsToggleButton.click()
                    //}
                });
            }
            domConstruct.destroy(flyoutContainer); // remove unnecessary flyout
            // Clear All Filters button functionality. Clears everything and updates the map in its orginal state
            document.getElementById(filterContent.toggleIcon).onclick = function () { // replace click handler
                var confirmationDialog = new ConfirmDialog({
                    content: "Clear all filters?",
                    style: "width: 300px",
                    onExecute: function () {
                        domConstruct.create('div', {
                            id: 'loaderSpin',
                            className: 'loader'
                        });
                        crashPointLayer.removeAll();
                        crashPointLayer.visible = true;
                        crashLocationsToggleButton.classList.contains('greenButtonToggle')
                        self.clearAllFilters(filterContent.parent.menus);
                        self.clearAllLabels(['.filterTextBox'], true);
                        document.getElementById('searchInput').value = '';
                        resultsButton.classList.remove('greenButtonToggle');
                        resultsButton.classList.remove('orangeButtonToggle');
                        resultsButton.classList.add('whiteButtonToggle');
                        //updateMapGraphics(null, false, 'clearFiltersWidget');
                    },
                    onCancel: function () {
                        console.error('Event Cancelled')
                    }
                });
                confirmationDialog.show();
            };
        }
        function dateSelectionWidget(filterInfo) {
            // dateSelectionWidget: creates flyout for year, month, and day filters. Updates the map based on the date filters applied
            // @param {object} filterInfo: filter items selected in this widget
            var widgetRoot = this;
            function createFilterSelections() {
                this.eventyear = [];
                this.acc_month = [];
                this.acc_dow = [];
                this.customRangesSelected = "";
                this.updateSelectionHighlight = function () {
                    var arrayLengths = 0;
                    for (attribute in this) {
                        if (typeof this[attribute] === 'object') {
                            if (this[attribute].length) {
                                arrayLengths += this[attribute].length;
                            }
                        }
                    }
                    var flyoutInfo = widgetRoot.parent;
                    if (arrayLengths > 0) {
                        while (flyoutInfo.flyout) {
                            query('.crashFilterFlyoutHeader', flyoutInfo.flyout.id).forEach(function (node) {
                                domStyle.set(node, greenButtonEffect);
                                domClass.add(node, 'crashFilterSelected');
                            })
                            domStyle.set(flyoutInfo.toggleIcon || flyoutInfo.toggleText, greenButtonEffect);
                            domClass.add(flyoutInfo.toggleIcon || flyoutInfo.toggleText, 'crashFilterSelected');
                            flyoutInfo = flyoutInfo.parent;
                        }
                    } else {
                        while (flyoutInfo.flyout) {
                            if (query('.filterCheckButton.crashFilterSelected', flyoutInfo.flyout.id).length > 0) {
                            } else if (query('.filterTextButton.crashFilterSelected', flyoutInfo.flyout.id).length > 0) {
                            } else {
                                if (domStyle.get(flyoutInfo.flyout.id).display === 'none') {
                                    domStyle.set(flyoutInfo.toggleIcon || flyoutInfo.toggleText, whiteButtonEffect);
                                }
                                else {
                                    domStyle.set(flyoutInfo.toggleIcon || flyoutInfo.toggleText, orangeButtonEffect);
                                }
                                domClass.remove(flyoutInfo.toggleIcon || flyoutInfo.toggleText, 'crashFilterSelected');
                                query('.crashFilterFlyoutHeader', flyoutInfo.flyout.id).forEach(function (node) {
                                    domStyle.set(node, orangeButtonEffect);
                                })
                            }
                            flyoutInfo = flyoutInfo.parent;
                        }
                    }
                }
            };
            function updateData(element) {       // element refers to the target button. used to apply the loading icon while filter is in progress
                var filter = new FilterConstructor();
                // need to apply the location filters here again when a year is selected. There must be an SRI specified for the Crash Query Service.
                if (filter.content.SRI === '') {
                } else {
                    // if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
                        updateMapGraphics(element, false, 'dateSelectionWidget');
                    // }
                    // else {
                    //     if (searchOmniBox.locationFilterWidget.currentRouteData) {
                    //         var routeValue = searchOmniBox.locationFilterWidget.currentRouteData.SRI;
                    //         var displayName = searchOmniBox.locationFilterWidget.currentRouteData.displayName;
                    //         var minMileValue = searchOmniBox.locationFilterWidget.extentSelector.minMileInput.value;
                    //         var maxMileValue = searchOmniBox.locationFilterWidget.extentSelector.maxMileInput.value;
                    //         var definitionString = 'SRI = \'' + routeValue + '\'';
                    //         var sriWithMP = { 'SRI': routeValue };
                    //         if (minMileValue) {
                    //             definitionString += ' AND MP >= ' + minMileValue;
                    //             sriWithMP['mp_start'] = minMileValue;
                    //         }
                    //         if (maxMileValue) {
                    //             definitionString += ' AND MP <= ' + maxMileValue;
                    //             sriWithMP['mp_end'] = maxMileValue;
                    //         }
                    //         sriOverlayLayer.updateClientSideGraphics({
                    //             ResultType: 'SRI',
                    //             ResultID: routeValue,
                    //             ResultText: displayName,
                    //             definitionExpression: definitionString,
                    //             sriWithMP: sriWithMP
                    //         }, element, searchOmniBox.locationFilterWidget, false, false);
                    //     }
                    // }
                }
            }
            function createYearSelector(attachPoint) {
                // createYearSelector: creates buttons for year filters. describes button toggle functionality
                // and updates the data based on the year filters applied.
                // @ param {table/flyout} attachPoint: where the year buttons will be on
                var self = this;
                var yearsMin = 2016;
                var yearsMax = 2020;
                var yearsSelected = [2016, 2017, 2018, 2019, 2020];
                var yearsToDisplay = 5;
                var yearRow = domConstruct.create('tr', null, attachPoint);
                this.clearYearSelection = function (update) {
                    var yearsShown = query('.yearRow:not(.functionalityButton):not(.rowLabel)')
                    filterInfo.values.eventyear = [];
                    yearsShown.forEach(function (node) {
                        query(node).style(whiteButtonEffect);
                    });
                    if (update) { updateData(); }
                }
                var toggleYear = function (mouseEvent) {
                    var selectedYearElement = mouseEvent.target;
                    var selectedYear = parseInt(mouseEvent.target.innerHTML);
                    //selectedYearElement.classList.add('working');
                    selectedYearElement.classList.toggle('selectedYear');
                    if (selectedYearElement.classList.contains('selectedYear')) {
                        if (filterInfo.values.eventyear.indexOf(selectedYear) < 0) {
                            filterInfo.values.eventyear.push(selectedYear)
                        }
                        selectedYearElement.classList.add('greenButtonToggle');
                    }
                    else {
                        if (filterInfo.values.eventyear.indexOf(selectedYear) > -1) {
                            filterInfo.values.eventyear.splice(filterInfo.values.eventyear.indexOf(selectedYear), 1);
                        }
                        selectedYearElement.classList.remove('greenButtonToggle');
                        selectedYearElement.classList.add('whiteButtonToggle');
                    }
                    filterInfo.values.updateSelectionHighlight();
                    //updateData(selectedYearElement);
                }
                var incrementYearRange = function (mouseEvent) {
                    var selectedYearElement = mouseEvent.target;
                    var yearsShown = query('.yearRow:not(.functionalityButton):not(.rowLabel)');
                    yearsShown.removeClass('selectedYear').style(whiteButtonEffect).forEach(function (node) {
                        var currentValue = node.innerHTML;
                        if (selectedYearElement.classList.contains('incrementDown')) {
                            currentValue = parseInt(currentValue) - yearsShown.length;
                            node.innerHTML = currentValue;
                            if (currentValue >= yearsMin) {
                                node.classList.remove('hidden');
                                if (filterInfo.values.eventyear.indexOf(currentValue) > -1) {
                                    query(node).style(greenButtonToggle);
                                    node.classList.toggle('selectedYear');
                                }
                            }
                            else {
                                node.classList.add('hidden');
                            }
                        }
                        else if (selectedYearElement.classList.contains('incrementUp')) {
                            currentValue = parseInt(currentValue) + yearsShown.length;
                            node.innerHTML = currentValue;
                            if (currentValue <= yearsMax) {
                                node.classList.remove('hidden');
                                if (filterInfo.values.eventyear.indexOf(currentValue) > -1) {
                                    query(node).style(greenButtonEffect);
                                    node.classList.toggle('selectedYear');
                                }
                            }
                            else {
                                node.classList.add('hidden');
                            }
                        }
                        else { }
                    })
                    parseInt(yearsShown[yearsShown.length - 1].innerHTML) >= yearsMax ? document.querySelector('.yearRow.functionalityButton.incrementUp').classList.add('disabled') : document.querySelector('.yearRow.functionalityButton.incrementUp').classList.remove('disabled');
                    parseInt(yearsShown[0].innerHTML) <= yearsMin ? document.querySelector('.yearRow.functionalityButton.incrementDown').classList.add('disabled') : document.querySelector('.yearRow.functionalityButton.incrementDown').classList.remove('disabled');
                }
                domConstruct.create('td', {
                    className: 'yearRow rowLabel',
                    innerHTML: 'Y',
                    onclick: function () {
                        self.clearYearSelection(true)
                        filterInfo.values.updateSelectionHighlight();
                        updateMapGraphics(null, false, 'createYearSelector');
                    }
                }, yearRow);
                domConstruct.create('td', {
                    className: 'yearRow functionalityButton incrementDown' + (yearsMin >= yearsMax - yearsToDisplay + 1 ? ' disabled' : ''),
                    innerHTML: '<',
                    onclick: incrementYearRange
                }, yearRow);
                for (var i = 0; i < yearsToDisplay; i++) {
                    var classesToApply = 'yearRow yearButton'
                    var currentYear = yearsMax - yearsToDisplay + i + 1;

                    if (yearsSelected.indexOf(currentYear) >= 0) {
                        classesToApply += ' selectedYear greenButtonToggle';
                        filterInfo.values.eventyear.push(currentYear)
                    }

                    domConstruct.create('td', {
                        className: 'yearRow yearButton selectedYear greenButtonToggle',
                        innerHTML: currentYear,
                        onclick: toggleYear
                    }, yearRow);
                }
                domConstruct.create('td', {
                    className: 'yearRow functionalityButton incrementUp disabled',
                    innerHTML: '>',
                    onclick: incrementYearRange
                }, yearRow);
            };
            function createMonthSelector(attachPoint) {
                // createMonthSelector: creates buttons for the month filters and defines toggle functionalites for month buttons.
                // updates data based on month filters applied.
                // @param {table/flyout} attachPoint: where the month filter buttons will be attached to
                var self = this;
                var firstMonthRowValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                var secondMonthRowValues = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var firstMonthRow = domConstruct.create('tr', null, attachPoint);
                var secondMonthRow = domConstruct.create('tr', null, attachPoint);
                function createMonthRow(rowPlacement, monthArray) {
                    for (var i = 0; i < monthArray.length; i++) {
                        domConstruct.create('td', {
                            'class': 'monthRow',
                            innerHTML: monthArray[i],
                            onclick: toggleMonth,
                        }, rowPlacement);
                    }
                }
                this.clearMonthSelection = function (update) {
                    var monthsShown = query('.monthRow:not(.functionalityButton):not(.rowLabel)')
                    monthsShown.removeClass('selectedMonth');
                    filterInfo.values.acc_month = []
                    monthsShown.forEach(function (node) {
                        query(node).style(whiteButtonEffect);
                    });
                    if (update) { updateData(); }
                }
                function toggleMonth(mouseEvent) {
                    var selectedMonthElement = mouseEvent.target;
                    var selectedMonth = mouseEvent.target.innerHTML;
                    selectedMonthElement.classList.toggle('selectedMonth');
                    //selectedMonthElement.classList.add('working');
                    if (selectedMonthElement.classList.contains('selectedMonth')) {
                        if (filterInfo.values.acc_month.indexOf(selectedMonth) < 0) {
                            filterInfo.values.acc_month.push(selectedMonth)
                        }
                        query(selectedMonthElement).style(greenButtonEffect);
                    }
                    else {
                        if (filterInfo.values.acc_month.indexOf(selectedMonth) > -1) {
                            filterInfo.values.acc_month.splice(filterInfo.values.acc_month.indexOf(selectedMonth), 1);
                        }
                        query(selectedMonthElement).style(whiteButtonEffect);
                    }
                    filterInfo.values.updateSelectionHighlight();
                    //updateData(selectedMonthElement);
                }
                domConstruct.create('td', {
                    className: 'rowLabel monthRow',
                    innerHTML: 'M',
                    rowspan: 2,
                    onclick: function () {
                        self.clearMonthSelection(true);
                        filterInfo.values.updateSelectionHighlight();
                        updateMapGraphics(null, false, 'createMonthSelector');
                    }
                }, firstMonthRow);
                domConstruct.create('td', {
                    className: 'placeHolder monthRow',
                    innerHTML: 'B',
                    rowspan: 2
                }, firstMonthRow);
                createMonthRow(firstMonthRow, firstMonthRowValues);
                createMonthRow(secondMonthRow, secondMonthRowValues);
            };
            function createDaySelector(attachPoint) {
                // createDaySelector: creates buttons for the day filters and defines toggle functionalites for day buttons.
                // updates data based on day filters applied.
                // @param {table/flyout} attachPoint: where the dat filter buttons will be attached to
                var self = this;
                var dayArray = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
                var dayRow = domConstruct.create('tr', null, attachPoint);
                this.clearDaySelection = function (update) {
                    var daysShown = query('.dayRow:not(.functionalityButton):not(.rowLabel)')
                    daysShown.removeClass('selectedDay');
                    filterInfo.values.acc_dow = [];
                    daysShown.forEach(function (node) {
                        query(node).style(whiteButtonEffect);
                    });
                    if (update) { updateData(); }
                }
                function toggleDay(mouseEvent) {
                    var selectedDayElement = mouseEvent.target;
                    var day = mouseEvent.target.innerHTML;
                    selectedDayElement.classList.toggle('selectedDay');
                    //selectedDayElement.classList.add('working');
                    if (selectedDayElement.classList.contains('selectedDay')) {
                        if (!(filterInfo.values.acc_dow.indexOf(day) > -1)) {
                            filterInfo.values.acc_dow.push(day)
                        }
                        query(selectedDayElement).style(greenButtonEffect);
                    }
                    else {
                        if (filterInfo.values.acc_dow.indexOf(day) > -1) {
                            filterInfo.values.acc_dow.splice(filterInfo.values.acc_dow.indexOf(day), 1);
                        }
                        query(selectedDayElement).style(whiteButtonEffect);
                    }
                    filterInfo.values.updateSelectionHighlight();
                    //updateData(selectedDayElement);
                }
                domConstruct.create('td', {
                    className: 'rowLabel dayRow',
                    innerHTML: 'D',
                    onclick: function () {
                        self.clearDaySelection(true);
                        filterInfo.values.updateSelectionHighlight();
                        updateMapGraphics(null, false, 'createDaySelector');
                    }
                }, dayRow);
                for (var i = 0; i < dayArray.length; i++) {
                    domConstruct.create('td', {
                        className: 'dayRow',
                        innerHTML: dayArray[i],
                        onclick:
                            toggleDay
                    }, dayRow);
                }
            };
            function createDateRangeSelector(attachPoint) {
                var self = this;
                var today = new Date(2019, 11, 31);
                var customRow = domConstruct.create('tr', null, attachPoint);
                var rowLabel = domConstruct.create('td', {
                    className: 'rowLabel customRow',
                    innerHTML: 'R',
                    colspan: 2,
                    onclick: function (event) { self.clearDateRangeSelection(true) }
                }, customRow);
                var startTimeBox = domConstruct.create('td', {
                    className: 'customRow',
                    colspan: 3
                }, customRow);
                var endTimeBox = domConstruct.create('td', {
                    className: 'customRow',
                    colspan: 3
                }, customRow);
                var dateStartHolder = domConstruct.create('div', null, startTimeBox);
                var dateEndHolder = domConstruct.create('div', null, endTimeBox);
                var dateStart = new DateTextBox({
                    value: today,
                    max: today,
                    style: { width: '100px' },
                    onChange: function (event) {
                        if (this.value.getTime() === today.getTime()) {
                            dateStartHolder.classList.remove('greenButtonToggle');
                            startTimeBox.classList.remove('greenButtonToggle');
                        }
                        else {
                            dateStartHolder.classList.add('greenButtonToggle');
                            startTimeBox.classList.add('greenButtonToggle');
                        }
                        if (this.value > dateEnd.value) {
                            this.domNode.classList.add('error');
                        }
                        else {
                            this.domNode.classList.remove('error');
                        }
                        filterInfo.values.customRangesSelected = self.returnRange();
                        //selectDay(event)
                        //filterInfo.values.updateSelectionHighlight();
                    }
                }, dateStartHolder);
                var dateEnd = new DateTextBox({
                    value: today,
                    max: today,
                    style: { width: '100px' },
                    onChange: function (event) {
                        if (this.value.getTime() === today.getTime()) {
                            dateEndHolder.classList.remove('greenButtonToggle');
                            endTimeBox.classList.remove('greenButtonToggle');
                        }
                        else {
                            dateEndHolder.classList.add('greenButtonToggle');
                            endTimeBox.classList.add('greenButtonToggle');
                        }
                        if (this.value < dateStart.value) {
                            this.domNode.classList.add('error');
                        }
                        else {
                            this.domNode.classList.remove('error');
                        }
                        filterInfo.values.customRangesSelected = self.returnRange();
                        //selectDay(event)
                        //filterInfo.values.updateSelectionHighlight();
                    }
                }, dateEndHolder);
                this.clearDateRangeSelection = function (update) {
                    dateStart.set('value', today);
                    dateEnd.set('value', today);
                    if (update) {
                        updateData();
                    }
                }
                this.returnRange = function () {
                    function FormatDateString(d) {
                        var curr_date = d.getDate();
                        var curr_month = d.getMonth() + 1; //Months are zero based
                        var curr_year = d.getFullYear();
                        return curr_year + "-" + curr_month + "-" + curr_date;
                    }
                    if (dateStart.value < dateEnd.value) {
                        return FormatDateString(dateStart.value) + ';' + FormatDateString(dateEnd.value);
                    }
                    else {
                        return '';
                    }
                }
                function selectDay(mouseEvent) {
                    var filter = new FilterConstructor();
                    if (filter.content.SRI === '') {
                    } else {
                        if (searchOmniBox.locationFilterWidget.currentRouteData) {
                            var routeValue = searchOmniBox.locationFilterWidget.currentRouteData.SRI;
                            var displayName = searchOmniBox.locationFilterWidget.currentRouteData.displayName;
                            var minMileValue = searchOmniBox.locationFilterWidget.extentSelector.minMileInput.value;
                            var maxMileValue = searchOmniBox.locationFilterWidget.extentSelector.minMileInput.value;
                            var definitionString = 'SRI = \'' + routeValue + '\'';
                            var sriWithMP = { 'SRI': routeValue };
                            if (minMileValue) {
                                definitionString += ' AND MP >= ' + minMileValue;
                                sriWithMP['mp_start'] = minMileValue;
                            }
                            if (maxMileValue) {
                                definitionString += ' AND MP <= ' + maxMileValue;
                                sriWithMP['mp_end'] = maxMileValue;
                            }
                            sriOverlayLayer.updateClientSideGraphics({
                                ResultType: 'SRI',
                                ResultID: routeValue,
                                ResultText: displayName,
                                definitionExpression: definitionString,
                                sriWithMP: sriWithMP
                            }, element, searchOmniBox.locationFilterWidget, false, false);
                        }
                        else {
                            updateMapGraphics(false, false, 'Date Update!');
                        }
                    }
                }
            };
            function applyChangesSelector(attachPoint) {
                var rowData = this;
                var applyChangesRow = domConstruct.create('tr', {
                    className: 'milePostRow'
                }, attachPoint);
                rowData.applyChangesButton = domConstruct.create('td', {
                    title: 'Apply Temporal Filter Changes',
                    className: 'locationFilterCell rowLabel',
                    innerHTML: 'Apply Temporal Filter Changes',
                    colSpan: 8,
                    onclick: function (event) {
                        var loadSpinner = domConstruct.create('img', {
                            src: 'img/simpleSpinner.gif',
                            style: 'display: inline-block; float: right; position: absolute; right: 12px; bottom: 13px; height: 15px;'
                        }, rowData.applyChangesButton, 'first');
                        updateData(loadSpinner);
                    }
                }, applyChangesRow);
                rowData.autoZoom = true;
            };
            this.parent = filterInfo;
            filterInfo.values = new createFilterSelections();
            this.domNode = domConstruct.create('table', { id: 'dateSelectionRootContainer' });
            this.yearSelector = new createYearSelector(this.domNode);
            // this.monthSelector = new createMonthSelector(this.domNode);
            // this.daySelector = new createDaySelector(this.domNode);
            // this.dateRangeSelector = new createDateRangeSelector(this.domNode);
            this.applyChangesSelector = new applyChangesSelector(this.domNode);
            this.clearAllWidgetSelections = function () {
                this.yearSelector.clearYearSelection(false);
                this.monthSelector.clearMonthSelection(false);
                this.daySelector.clearDaySelection(false);
                this.dateRangeSelector.clearDateRangeSelection(false);
                filterInfo.values.updateSelectionHighlight();
                updateData();
            };
            this.getAllWidgetSelections = function () {
                var monthIndexList = [];
                for (var i = 0; i < filterInfo.values.acc_month.length; i++) {
                    monthIndexList.push(padDigits(getMonth(filterInfo.values.acc_month[i]), 2));
                }
                return {
                    eventyear: filterInfo.values.eventyear.toString(),
                    // acc_month: monthIndexList.toString(),
                    // acc_dow: filterInfo.values.acc_dow.toString(),
                    // date_range: this.dateRangeSelector.returnRange()
                };
                function getMonth(monthStr) { return new Date(monthStr + '-1-01').getMonth() + 1 }
                function padDigits(number, digits) { return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number }
            }
        }
        function checkBoxTableWidget(tableInfo) {
            // checkBoxTableWidget: creates layout for filter flyouts with checkboxes and area for filter description text.
            // also creates "Clear Menu Filters" button which clears all filters in the target flyout.
            // number of rows for each filter flyout is based on the number of filters in each category of the filterStructure.
            // updates data based on filters applied.
            // @param {} tableInfo: filterContent
            var self = this;
            function updateHighlight(tableToHighlight) {
                while (tableToHighlight.flyout) {
                    query('.crashFilterFlyoutHeader,.crashFilterFlyoutSubHeader', tableToHighlight.flyout.id).forEach(function (node) {
                        domStyle.set(node, greenButtonEffect);
                        domClass.add(node, 'crashFilterSelected');
                    })
                    domStyle.set(tableToHighlight.toggleIcon || tableToHighlight.toggleText, greenButtonEffect);
                    domClass.add(tableToHighlight.toggleIcon || tableToHighlight.toggleText, 'crashFilterSelected');
                    tableToHighlight = tableToHighlight.parent;
                }
            }
            function createCheckBoxRow(rowAttributes) {
                var row = domConstruct.create('tr', null);
                var description = domConstruct.create('td', {
                    className: 'filterDescription',
                    innerHTML: rowAttributes.description,
                    onclick: clickHandler
                }, row);
                var checkBox = domConstruct.create('td', {
                    className: 'filterCheckButton',
                    onclick: clickHandler
                }, row, 'first');
                if (rowAttributes.zoomElement && rowAttributes.zoomElement === true) {
                    self.zoomElement = true;
                }
                function clickHandler(event) {
                    var flyoutInfo = tableInfo;
                    checkBox.classList.toggle('crashFilterSelected');
                    description.classList.toggle('crashFilterSelected');
                    checkBox.classList.toggle('crashFilterWorking');
                    if (checkBox.classList.contains('crashFilterSelected')) {
                        domStyle.set(checkBox, greenButtonEffect);
                        domStyle.set(description, greenButtonEffect);
                        if (flyoutInfo.fieldName === 'mun_mu') {
                            query('#' + tableInfo.flyout.id + ' .filterDescription:not(.crashFilterSelected)').forEach(function (item) { item.classList.add('disabled') });
                            query('#' + tableInfo.flyout.id + ' .filterCheckButton:not(.crashFilterSelected)').forEach(function (item) { item.classList.add('disabled') });
                        }
                    } else {
                        domStyle.set(checkBox, whiteButtonEffect);
                        domStyle.set(description, whiteButtonEffect);
                        if (flyoutInfo.fieldName === 'mun_mu') {
                            query('#' + tableInfo.flyout.id + ' .filterDescription').forEach(function (item) { item.classList.remove('disabled') });
                            query('#' + tableInfo.flyout.id + ' .filterCheckButton').forEach(function (item) { item.classList.remove('disabled') });
                        }
                    }
                    if (query('.filterCheckButton.crashFilterSelected', flyoutInfo.flyout.id).length > 0) {
                        updateHighlight(flyoutInfo)
                    }
                    else {
                        while (flyoutInfo.flyout) {
                            if (query('.filterCheckButton.crashFilterSelected', flyoutInfo.flyout.id).length > 0) {
                            } else if (query('.filterTextButton.crashFilterSelected', flyoutInfo.flyout.id).length > 0) {
                            } else {
                                domStyle.set(flyoutInfo.toggleIcon || flyoutInfo.toggleText, orangeButtonEffect);
                                domClass.remove(flyoutInfo.toggleIcon || flyoutInfo.toggleText, 'crashFilterSelected');
                                query('.crashFilterFlyoutHeader,.crashFilterFlyoutSubHeader', flyoutInfo.flyout.id).forEach(function (node) {
                                    domStyle.set(node, orangeButtonEffect);
                                })
                            }
                            flyoutInfo = flyoutInfo.parent;
                        }
                    }
                    var filter = new FilterConstructor();
                    // This test determines if there is an SRI in the location
                    // widget then updates accordingly. If not, it will look for the
                    // first Municipality selected and zoom to that. Otherwise it
                    // will just update the graphics with the extent is currently
                    // visible.
                    if (filter.content.SRI) {
                        if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
                            updateMapGraphics(checkBox, false, 'checkBoxMenu');
                        }
                        else {
                            var routeValue = filter.content.SRI;
                            var displayName = '';
                            var minMileValue = filter.content.mp_start;
                            var maxMileValue = filter.content.mp_end;
                            var definitionString = 'SRI = \'' + filter.content.SRI + '\'';
                            var routeInformation = { 'SRI': filter.content.SRI };
                            if (minMileValue) {
                                definitionString += ' AND MP >= ' + minMileValue;
                                routeInformation['mp_start'] = minMileValue;
                            }
                            if (maxMileValue) {
                                definitionString += ' AND MP <= ' + maxMileValue;
                                routeInformation['mp_end'] = maxMileValue;
                            }
                            sriOverlayLayer.updateClientSideGraphics({
                                ResultType: 'SRI',
                                ResultID: routeValue,
                                ResultText: displayName,
                                definitionExpression: definitionString,
                                sriWithMP: routeInformation
                            }, checkBox, searchOmniBox.locationFilterWidget, false, false);
                        }
                    }
                    else if (rowAttributes.zoomElement && rowAttributes.zoomElement === true) {
                        checkBox.classList.toggle('crashFilterWorking');
                        updateMapGraphics(checkBox, rowAttributes.zoomElement, this);
                    }
                    else {
                        updateMapGraphics(checkBox, false, 'createCheckBoxRow');
                    }
                }
                return row;
            }
            this.parent = tableInfo;
            this.flyout = tableInfo.flyout;
            this.domNode = domConstruct.create('table', { className: 'filterTable' });
            this.checkBoxes = [];
            this.clearTable = function (global, clearTableButton) {
                var flyoutInfo = tableInfo;
                query('#' + flyoutInfo.flyout.id + ' .filterDescription').forEach(function (node) {
                    domStyle.set(node, whiteButtonEffect);
                    domClass.remove(node, 'crashFilterSelected');
                    domClass.remove(node, 'disabled');
                });
                query('#' + flyoutInfo.flyout.id + ' .filterCheckButton ').forEach(function (node) {
                    domStyle.set(node, whiteButtonEffect);
                    domClass.remove(node, 'crashFilterSelected');
                    domClass.remove(node, 'disabled');
                });
                while (flyoutInfo.flyout) {
                    if (query('.filterCheckButton.crashFilterSelected', flyoutInfo.flyout.id).length > 0) {
                    } else if (query('.filterTextButton.crashFilterSelected', flyoutInfo.flyout.id).length > 0) {
                    } else {
                        domStyle.set(flyoutInfo.toggleIcon || flyoutInfo.toggleText, (global ? whiteButtonEffect : orangeButtonEffect));
                        domClass.remove(flyoutInfo.toggleIcon || flyoutInfo.toggleText, 'crashFilterSelected');
                        query('.crashFilterFlyoutHeader,.crashFilterFlyoutSubHeader', flyoutInfo.flyout.id).forEach(function (node) {
                            domStyle.set(node, orangeButtonEffect);
                        })
                    }
                    flyoutInfo = flyoutInfo.parent;
                }
                if (global) { }
                else {
                    updateMapGraphics(clearTableButton, false, 'createCheckBoxRow');
                //     var filter = new FilterConstructor();
                //     if (filter.content.SRI) {
                //         if (filter.content.SRI && filter.content.mp_start || filter.content.mp_end) {
                //             var definitionString = 'SRI = \'' + filter.content.SRI + '\'';
                //             var routeDetails = { SRI: filter.content.SRI };
                //             if (filter.content.mp_start) {
                //                 definitionString += ' AND MP >= ' + filter.content.mp_start;
                //                 routeDetails['mp_start'] = filter.content.mp_start;
                //             }
                //             if (filter.content.mp_end) {
                //                 definitionString += ' AND MP <= ' + filter.content.mp_end;
                //                 routeDetails['mp_end'] = filter.content.mp_end;
                //             }
                //             sriOverlayLayer.updateClientSideGraphics({
                //                 ResultType: 'SRI',
                //                 ResultID: filter.content.SRI,
                //                 ResultText: '',
                //                 definitionExpression: definitionString,
                //                 sriWithMP: routeDetails
                //             }, clearTableButton, searchOmniBox.locationFilterWidget, false, false);
                //         }
                //         else {
                //             sriOverlayLayer.updateClientSideGraphics({
                //                 ResultType: 'SRI',
                //                 ResultID: filter.content.SRI,
                //                 ResultText: '',
                //             }, clearTableButton, searchOmniBox.locationFilterWidget, false, false);
                //         }
                //     }
                //     else if (self.zoomElement && self.zoomElement === true) {
                //         updateMapGraphics(clearTableButton, rowAttributes.zoomElement, this);
                //     }
                //     else {
                //         updateMapGraphics(clearTableButton, false, 'createCheckBoxRow');
                //     }
                }
            }
            this.selectEntireTable = function (global, selectAllButton) {
                var flyoutInfo = tableInfo;
                query('#' + tableInfo.flyout.id + ' .filterDescription').forEach(function (node) {
                    domStyle.set(node, greenButtonEffect);
                });
                query('#' + tableInfo.flyout.id + ' .filterCheckButton ').forEach(function (node) {
                    domStyle.set(node, greenButtonEffect);
                    domClass.add(node, 'crashFilterSelected');
                });
                updateHighlight(flyoutInfo);
                if (global) { }
                else {
                    updateMapGraphics(null, false, 'selectAllButton');
                }
                selectAllButton.classList.remove('working');
            }
            if (tableInfo.selectAll) {
                var selectAllRow = domConstruct.create('tr', { className: '' }, this.domNode);
                this.selectAllButton = domConstruct.create('td', {
                    innerHTML: 'Select Entire County',
                    className: 'deleteButton',
                    colspan: 2,
                    onclick: function () {
                        var currentSelectAllButton = this;
                        currentSelectAllButton.classList.add('working');
                        self.selectEntireTable(false, this);
                    }
                }, selectAllRow);
            }
            for (var i = 0; i < tableInfo.values.length; i++) {
                var checkBox;
                var value = tableInfo.values[i];
                if (tableInfo.fieldName && tableInfo.fieldName === 'mun_mu') {
                    value['zoomElement'] = true;
                    checkBox = domConstruct.place(createCheckBoxRow(value), this.domNode, 'last');
                    // Select the county filter for the county.
                    if (filterStructure.type === 'county') {
                        if (filterStructure.code === value.code) {
                            checkBox.childNodes.forEach(function (item) {
                                item.classList.add('crashFilterSelected')
                                domStyle.set(item, greenButtonEffect);
                            });
                            updateHighlight(tableInfo);
                        }
                    }
                }
                else {
                    checkBox = domConstruct.place(createCheckBoxRow(value), this.domNode, 'last');
                }
                this.checkBoxes.push(checkBox);
            }
            if (tableInfo.clearAll) {
                var clearRow = domConstruct.create('tr', { className: '' }, this.domNode);
                var clearButton = domConstruct.create('td', {
                    innerHTML: 'Clear Menu Filters',
                    className: 'deleteButton',
                    colspan: 2,
                    onclick: function () {
                        clearButton.classList.add('working');
                        self.clearTable(false, clearButton);
                    }
                }, clearRow);
            }
        }
        // function areaTemporalMetricDialog(attachPoint) {
        //     var self = this;
        //     var crashesByMonth = domConstruct.create('div', {
        //         className: 'areaCrashChart'
        //     }, attachPoint, 'last');
        //     var crashesByMonthLegend = domConstruct.create('div', {
        //         className: 'areaCrashChartLegend'
        //     }, crashesByMonth, 'after');
        //     var crashesLoadingOverlay = domConstruct.create('div', {
        //         className: 'areaCrashChartOverlay hidden'
        //     }, crashesByMonth, 'first');
        //     var crashesByMonthChart = new Chart(crashesByMonth);
        //     var fatalCrashesByType = domConstruct.create('div', {
        //         className: 'areaCrashChart'
        //     }, attachPoint, 'last');
        //     var fatalCrashesByTypeLegend = domConstruct.create('div', {
        //         className: 'areaCrashChartLegend'
        //     }, fatalCrashesByType, 'after');
        //     var fatalCrashesLoadingOverlay = domConstruct.create('div', {
        //         className: 'areaCrashChartOverlay hidden'
        //     }, fatalCrashesByType, 'first');
        //     var fatalCrashesByTypeChart = new Chart(fatalCrashesByType);
        //     function translateCrashType(value) {
        //         var returnValue;
        //         var values = [
        //             { code: '01', description: 'Same Direction - Rear End' },
        //             { code: '02', description: 'Same Direction - Sideswipe' },
        //             { code: '03', description: 'Right Angle' },
        //             { code: '04', description: 'Opposite Direction (Head On/ Angular)' },
        //             { code: '05', description: 'Opposite Direction (Sideswipe)' },
        //             { code: '06', description: 'Struck Parked Vehicle' },
        //             { code: '07', description: 'Left Turn/U Turn' },
        //             { code: '08', description: 'Backing' },
        //             { code: '09', description: 'Encroachment' },
        //             { code: '10', description: 'Overturned' },
        //             { code: '11', description: 'Fixed Object' },
        //             { code: '12', description: 'Animal' },
        //             { code: '13', description: 'Pedestrian' },
        //             { code: '14', description: 'Pedalcyclist' },
        //             { code: '15', description: 'Non-fixed Object' },
        //             { code: '16', description: 'Railcar - vehicle' },
        //             { code: '99', description: 'Other' },
        //             { code: '00', description: 'Unknown' },
        //             { code: '-20', description: 'NOT RECORDED' },
        //             { code: '20', description: 'Value Unknown' }
        //         ];
        //         values.forEach(function (translationItem) {
        //             if (value === translationItem.code) {
        //                 returnValue = translationItem.description;
        //             }
        //         });
        //         return returnValue;
        //     }
        //     function createSubItemArray(objectToConvert, cumulative) {
        //         var subItemArray = [];
        //         var formattedData = [];
        //         var cumulativeStorage = 0;
        //         for (var attribute in objectToConvert.SubItems) {
        //             if (objectToConvert.SubItems.hasOwnProperty(attribute)) {
        //                 subItemArray.push({
        //                     code: objectToConvert.Name,
        //                     year: attribute,
        //                     count: parseInt(objectToConvert.SubItems[attribute])
        //                 })
        //             }
        //         }
        //         subItemArray.forEach(function (subItem) {
        //             var yvalue = 0;
        //             var humanReadableLabel = translateCrashType(subItem.code);
        //             if (cumulative) {
        //                 cumulativeStorage += subItem.count;
        //                 yvalue = cumulativeStorage
        //             } else {
        //                 yvalue = subItem.count;
        //             }
        //             formattedData.push({
        //                 x: subItem.year,
        //                 y: yvalue,
        //                 tooltip: subItem.year + ', ' + humanReadableLabel + ': ' + yvalue + ' crashes'
        //             })
        //         })
        //         return formattedData;
        //     }
        //     function createSubItemArrayYear(objectToConvert, cumulative) {
        //         var formattedData = [];
        //         var cumulativeStorage = 0;
        //         var months = [
        //             {
        //                 label: 'January',
        //                 index: 1,
        //                 count: 0
        //             },
        //             {
        //                 label: 'February',
        //                 index: 2,
        //                 count: 0
        //             },
        //             {
        //                 label: 'March',
        //                 index: 3,
        //                 count: 0
        //             },
        //             {
        //                 label: 'April',
        //                 index: 4,
        //                 count: 0
        //             },
        //             {
        //                 label: 'May',
        //                 index: 5,
        //                 count: 0
        //             },
        //             {
        //                 label: 'June',
        //                 index: 6,
        //                 count: 0
        //             },
        //             {
        //                 label: 'July',
        //                 index: 7,
        //                 count: 0
        //             },
        //             {
        //                 label: 'August',
        //                 index: 8,
        //                 count: 0
        //             },
        //             {
        //                 label: 'September',
        //                 index: 9,
        //                 count: 0
        //             },
        //             {
        //                 label: 'October',
        //                 index: 10,
        //                 count: 0
        //             },
        //             {
        //                 label: 'November',
        //                 index: 11,
        //                 count: 0
        //             },
        //             {
        //                 label: 'December',
        //                 index: 12,
        //                 count: 0
        //             }
        //         ];
        //         for (var attribute in objectToConvert.SubItems) {
        //             if (objectToConvert.SubItems.hasOwnProperty(attribute)) {
        //                 months[parseInt(attribute) - 1].count = objectToConvert.SubItems[attribute];
        //             }
        //         }
        //         months.forEach(function (month) {
        //             var yvalue = 0;
        //             if (cumulative) {
        //                 cumulativeStorage += month.count;
        //                 yvalue = cumulativeStorage
        //             } else {
        //                 yvalue = month.count;
        //             }
        //             formattedData.push({
        //                 x: month.index,
        //                 y: yvalue,
        //                 tooltip: month.label + ', ' + objectToConvert.Name + ': ' + yvalue + ' crashes'
        //             })
        //         })
        //         return formattedData;
        //     }
        //     crashesByMonthChart.title = "Total Crashes by Month";
        //     crashesByMonthChart.titlePos = "top";
        //     crashesByMonthChart.titleGap = 5;
        //     crashesByMonthChart.addPlot("default", { type: Lines, markers: true });
        //     crashesByMonthChart.addAxis("x", {
        //         title: 'unmatched records not included',
        //         titleGap: 5,
        //         titleFontColor: 'black',
        //         titleOrientation: 'away',
        //         min: 0,
        //         max: 13,
        //         natural: false,
        //         dropLabels: false,
        //         labelSizeChange: true,
        //         majorTicks: true,
        //         majorLabels: true,
        //         majorTick: { color: "black", length: 3 },
        //         majorTickStep: 1,
        //         minorTicks: false,
        //         minorLabels: false,
        //         microTicks: false,
        //         microLabels: false,
        //         labels: [
        //             { value: 0, text: '' },
        //             { value: 1, text: '1' },
        //             { value: 2, text: '2' },
        //             { value: 3, text: '3' },
        //             { value: 4, text: '4' },
        //             { value: 5, text: '5' },
        //             { value: 6, text: '6' },
        //             { value: 7, text: '7' },
        //             { value: 8, text: '8' },
        //             { value: 9, text: '9' },
        //             { value: 10, text: '10' },
        //             { value: 11, text: '11' },
        //             { value: 12, text: '12' },
        //             { value: 13, text: '' },
        //         ]
        //     });
        //     crashesByMonthChart.addAxis("y", {
        //         vertical: true, fixLower: "major", fixUpper: "major", natural: true
        //     });
        //     crashesByMonthChart.setTheme(MiamiNice);
        //     var crashesByMonthToolTip = new Tooltip(crashesByMonthChart, 'default');
        //     var crashesByMonthHighlight = new Highlight(crashesByMonthChart, 'default');
        //     crashesByMonthChart.render();
        //     fatalCrashesByTypeChart.title = 'Crashes by Collision Type';
        //     fatalCrashesByTypeChart.titlePos = 'top';
        //     fatalCrashesByTypeChart.titleGap = 5;
        //     fatalCrashesByTypeChart.addPlot('default', { type: ClusteredColumns, gap: 5 });
        //     fatalCrashesByTypeChart.addAxis('x', {
        //         title: 'unmatched records not included',
        //         titleGap: 5,
        //         titleFontColor: 'black',
        //         titleOrientation: 'away',
        //         min: 2005,
        //         max: 2019,
        //         natural: false,
        //         dropLabels: false,
        //         labelSizeChange: true,
        //         majorTicks: true,
        //         majorLabels: true,
        //         majorTick: { color: "black", length: 3 },
        //         majorTickStep: 1,
        //         minorTicks: false,
        //         minorLabels: false,
        //         microTicks: false,
        //         microLabels: false,
        //         labels: [
        //             //{ value: 2001, text: '' },
        //             //{ value: 2002, text: '2002' },
        //             //{ value: 2003, text: '' },
        //             //{ value: 2004, text: '2004' },
        //             { value: 2005, text: '' },
        //             { value: 2006, text: '2006' },
        //             { value: 2007, text: '' },
        //             { value: 2008, text: '2008' },
        //             { value: 2009, text: '' },
        //             { value: 2010, text: '2010' },
        //             { value: 2011, text: '' },
        //             { value: 2012, text: '2012' },
        //             { value: 2013, text: '' },
        //             { value: 2014, text: '2014' },
        //             { value: 2015, text: '' },
        //             { value: 2016, text: '2016' },
        //             { value: 2017, text: '' },
        //             { value: 2018, text: '2018' },
        //             { value: 2019, text: '' }
        //         ]
        //     });
        //     fatalCrashesByTypeChart.addAxis('y', {
        //         vertical: true,
        //         fixLower: 'major',
        //         fixUpper: 'major',
        //         natural: true,
        //         includeZero: true
        //     });
        //     fatalCrashesByTypeChart.setTheme(MiamiNice);
        //     var fatalCrashesByTypeTooltip = new Tooltip(fatalCrashesByTypeChart, 'default');
        //     var fatalCrashesByTypeHighLight = new Highlight(fatalCrashesByTypeChart, 'default');
        //     fatalCrashesByTypeChart.render();
        //     this.domNode = attachPoint;
        //     this.domNode.style.display = 'block';
        //     this.pauseGraphs = function (graphsPaused) {
        //         if (graphsPaused) {
        //             crashesLoadingOverlay.classList.remove('hidden');
        //             fatalCrashesLoadingOverlay.classList.remove('hidden');
        //         }
        //         else {
        //             crashesLoadingOverlay.classList.add('hidden');
        //             fatalCrashesLoadingOverlay.classList.add('hidden');
        //         }
        //     }
        //     this.updateGraphs = function (updateInfo) {
        //         console.log(updateInfo);
        //         var filter = new FilterConstructor();
        //         var date = new Date();
        //         var yearsToShow = 4;
        //         if (filter.content.mun_mu) {
        //             var codesSubmitted = filter.content.mun_mu.split(',');
        //             codesSubmitted.forEach(replaceDashes);
        //             filter.content.mun_mu = codesSubmitted.toString()
        //         }
        //         filter.content.XMin = roundView.extent.xmin;
        //         filter.content.XMax = roundView.extent.xmax;
        //         filter.content.YMin = roundView.extent.ymin;
        //         filter.content.YMax = roundView.extent.ymax;
        //         filter.content.GraphType = 'MONTHYEARCOUNT';
        //         esriRequest(crashGraphURL, { query: filter.content }).then(function (response) {
        //             if (response.data.GraphData.every(function (i) { return i !== null; })) {
        //                 var serverData = response.data.GraphData.reverse();
        //                 var yearsReturned = serverData.map(function (year) { return year.Name; });
        //                 var seriesShown = crashesByMonthChart.series.map(function (year) { return year.name; });
        //                 var unionArray = arrayUnique(yearsReturned.concat(seriesShown));
        //                 function arrayUnique(array) {
        //                     var a = array.concat();
        //                     for (var i = 0; i < a.length; ++i) {
        //                         for (var j = i + 1; j < a.length; ++j) {
        //                             if (a[i] === a[j])
        //                                 a.splice(j--, 1);
        //                         }
        //                     }
        //                     return a.sort(function (a, b) { return b - a });
        //                 }
        //                 function showYear(inputValue, listToCheck) {
        //                     if (listToCheck.length > 3) {
        //                         listToCheck = listToCheck.slice(0, 3);
        //                     }
        //                     if (listToCheck.indexOf(inputValue) >= 0) {
        //                         return true;
        //                     }
        //                     else {
        //                         return false;
        //                     }
        //                 }
        //                 crashesLoadingOverlay.classList.add('hidden');
        //                 unionArray.forEach(function (year) {
        //                     if (yearsReturned.indexOf(year) >= 0) {
        //                         if (showYear(year, yearsReturned)) {
        //                             if (crashesByMonthChart.getSeries(year)) {
        //                                 crashesByMonthChart.removeSeries(year);
        //                                 crashesByMonthChart.addSeries(year, createSubItemArrayYear(serverData[yearsReturned.indexOf(year)], false), { hidden: false });
        //                             }
        //                             else {
        //                                 crashesByMonthChart.addSeries(year, createSubItemArrayYear(serverData[yearsReturned.indexOf(year)], false), { hidden: false });
        //                             }
        //                         }
        //                         else {
        //                             if (crashesByMonthChart.getSeries(year)) {
        //                                 crashesByMonthChart.removeSeries(year);
        //                                 crashesByMonthChart.addSeries(year, createSubItemArrayYear(serverData[yearsReturned.indexOf(year)], false), { hidden: true });
        //                             }
        //                             else {
        //                                 crashesByMonthChart.addSeries(year, createSubItemArrayYear(serverData[yearsReturned.indexOf(year)], false), { hidden: true });
        //                             }
        //                         }
        //                     }
        //                     else {
        //                         crashesByMonthChart.removeSeries(year);
        //                     }
        //                 });
        //                 crashesByMonthChart.render();
        //                 var selectableLegend = new SelectableLegend({
        //                     chart: crashesByMonthChart,
        //                     outline: true,
        //                     horizontal: false,
        //                     autoScale: true
        //                 }).placeAt(crashesByMonthLegend, 'only')
        //                 var secondColumnCheckboxes = query('td', selectableLegend.domNode);
        //                 var splitLength = 13;
        //                 var firstColumnCheckboxes = secondColumnCheckboxes.splice(0, splitLength);
        //                 for (var i = 0; i < secondColumnCheckboxes.length; i++) {
        //                     var checkboxToMove = secondColumnCheckboxes[i];
        //                     var newCheckboxPosition = firstColumnCheckboxes[i].parentNode;
        //                     newCheckboxPosition.appendChild(checkboxToMove.parentNode.removeChild(checkboxToMove));
        //                 }
        //             }
        //             else {
        //                 var seriesShown = crashesByMonthChart.series.map(function (year) { return year.name; });
        //                 seriesShown.forEach(function (year) {
        //                     crashesByMonthChart.removeSeries(year);
        //                 })
        //                 crashesByMonthChart.render();
        //                 crashesLoadingOverlay.classList.add('hidden');
        //                 var selectableLegend = new SelectableLegend({
        //                     chart: crashesByMonthChart,
        //                     outline: true,
        //                     horizontal: false,
        //                     autoScale: true
        //                 }).placeAt(crashesByMonthLegend, 'only')
        //             }
        //         }, errorHandler)
        //         filter.content.GraphType = 'YEARCRASHTYPE';
        //         esriRequest(crashGraphURL, { query: filter.content }).then(function (serverData) { // 36
        //             if (serverData.data.GraphData.every(function (i) { return i !== null; })) {
        //                 fatalCrashesLoadingOverlay.classList.add('hidden');
        //                 function arrayUnique(array) {
        //                     var a = array.concat();
        //                     for (var i = 0; i < a.length; ++i) {
        //                         for (var j = i + 1; j < a.length; ++j) {
        //                             if (a[i] === a[j])
        //                                 a.splice(j--, 1);
        //                         }
        //                     }
        //                     return a.sort(function (a, b) { return b - a });
        //                 }
        //                 var serverData = serverData.data.GraphData;
        //                 var crashTypesReturned = serverData.map(function (crashType) { return translateCrashType(crashType.Name); });
        //                 var seriesShown = fatalCrashesByTypeChart.series.map(function (crashType) { return crashType.name; });
        //                 var unionArray = arrayUnique(crashTypesReturned.concat(seriesShown));
        //                 unionArray.forEach(function (crashType) {
        //                     if (crashTypesReturned.indexOf(crashType) >= 0) { // if the crash type is in the ones returned
        //                         if (fatalCrashesByTypeChart.getSeries(crashType)) { // if series exists, update it
        //                             fatalCrashesByTypeChart.removeSeries(crashType);
        //                             fatalCrashesByTypeChart.addSeries(crashType, createSubItemArray(serverData[crashTypesReturned.indexOf(crashType)]), { hidden: false });
        //                         }
        //                         else { // if series does not exist, add it
        //                             fatalCrashesByTypeChart.addSeries(crashType, createSubItemArray(serverData[crashTypesReturned.indexOf(crashType)]), { hidden: false });
        //                         }
        //                     }
        //                     else {
        //                         if (fatalCrashesByTypeChart.getSeries(crashType)) {
        //                             fatalCrashesByTypeChart.removeSeries(crashType);
        //                         }
        //                     }
        //                 });
        //                 fatalCrashesByTypeChart.render();
        //                 var selectableLegend = new SelectableLegend({
        //                     chart: fatalCrashesByTypeChart,
        //                     outline: true,
        //                     horizontal: false,
        //                     autoScale: true
        //                 }).placeAt(fatalCrashesByTypeLegend, 'only')
        //                 var secondColumnCheckboxes = query('td', selectableLegend.domNode);
        //                 var splitLength = 13;
        //                 var firstColumnCheckboxes = secondColumnCheckboxes.splice(0, splitLength);
        //                 for (var i = 0; i < secondColumnCheckboxes.length; i++) {
        //                     var checkboxToMove = secondColumnCheckboxes[i];
        //                     var newCheckboxPosition = firstColumnCheckboxes[i].parentNode;
        //                     newCheckboxPosition.appendChild(checkboxToMove.parentNode.removeChild(checkboxToMove));
        //                 }
        //             }
        //             else {
        //                 var seriesShown = fatalCrashesByTypeChart.series.map(function (year) { return year.name; });
        //                 seriesShown.forEach(function (year) {
        //                     fatalCrashesByTypeChart.removeSeries(year);
        //                 })
        //                 fatalCrashesByTypeChart.render();
        //                 fatalCrashesLoadingOverlay.classList.add('hidden');
        //                 var selectableLegend = new SelectableLegend({
        //                     chart: fatalCrashesByTypeChart,
        //                     outline: true,
        //                     horizontal: false,
        //                     autoScale: true
        //                 }).placeAt(fatalCrashesByTypeLegend, 'only')
        //             }
        //         }, errorHandler)
        //     }
        // }
        function createWidgetContent(filterContent) {
            // createWidgetContent: creates the filter list along the right side.
            // also creates the first tier of flyouts that link to the filter buttons.
            // @param {object} filterContent: menu items in the filter flyout
            //console.dir(createWidgetContent, filterContent)
            var flyout = filterContent.flyout || '';
            var flyoutContainerDiv = domConstruct.create('div', {
                id: flyout.id || '',
                className: 'crashFilterFlyout'
            }, document.body);
            var flyoutContainerHeader = domConstruct.create('div', {
                class: filterContent.toggleIcon ? 'crashFilterFlyoutHeader' : 'crashFilterFlyoutSubHeader',
                innerHTML: flyout.title || ''
            }, flyoutContainerDiv);
            var flyoutContainerContent = domConstruct.create('div', { class: 'crashFilterFlyoutContent' }, flyoutContainerDiv);
            var filterListItem = domConstruct.create('div', {
                id: filterContent.toggleIcon || filterContent.toggleText || '',
                className: filterContent.toggleIcon ? 'filterIconButton' : 'filterTextButton',
                title: flyout.title || filterContent.toolTip || '',
                innerHTML: filterContent.toggleIcon ? '' : flyout.title,
                onclick: function (e) {
                    event.stop(e);
                    //test here if all the crash filter flyouts are display = none and open the right one if they are
                    if (flyoutContainerDiv.id) {
                        if (domStyle.get(flyoutContainerDiv).display === 'none') {
                            if (domClass.contains(this, 'crashFilterSelected')) {
                            } else {
                                domStyle.set(this, orangeButtonEffect);
                            }
                            domStyle.set(flyoutContainerDiv, { display: 'block' });
                        }
                        else {
                            var ascendingElement = filterContent.parent;
                            var styleException = '';
                            while (ascendingElement) {
                                // need to include an extra string here is they ever want to have more nested menus
                                styleException += ascendingElement.toggleText ? ':not(#' + ascendingElement.toggleText + ')' : '';
                                styleException += ascendingElement.toggleIcon ? ':not(#' + ascendingElement.toggleIcon + ')' : '';
                                ascendingElement = ascendingElement.parent;
                            }
                            query('.filterIconButton:not(.crashFilterSelected):not(.filterDisable)' + styleException).style(whiteButtonEffect);
                            query('.filterTextButton:not(.crashFilterSelected):not(.filterDisable)' + styleException).style(whiteButtonEffect);
                            if (domClass.contains(this, 'crashFilterSelected')) {
                            } else {
                                domStyle.set(this, whiteButtonEffect);
                            }
                            domStyle.set(flyoutContainerDiv, { display: 'block' });
                            query('.crashFilterFlyout:not(#' + filterContent.toggleNode + ')').style({ 'display': 'none' });
                        }
                    }
                    else {
                        domStyle.set(this, greenButtonEffect);
                    }
                },
                onmouseover: function () {
                    if (!(document.getElementById(this.id).classList.contains('filterDisable'))) {
                        if (flyoutContainerDiv.id) {
                            if (domStyle.get(flyoutContainerDiv).display === 'none') {
                                var parentElement = filterContent;
                                var styleException = '.crashFilterFlyout';
                                while (parentElement.flyout) {
                                    styleException += ':not(#' + parentElement.flyout.id + ')'
                                    parentElement = parentElement.parent;
                                }
                                query(styleException).style({
                                    'display': 'none',
                                    'overflow-y': 'hidden',
                                    'height': 'auto'
                                });
                                domStyle.set(flyoutContainerDiv.id, { display: 'block' });
                                domStyle.set(flyoutContainerContent, { height: 'auto' });
                                // Do a calculation to determine if the flyout will go off the bottom of the page
                                // Set the top argument in the domStyle.set function below
                                var selectedElementPosition = getPosition(this);
                                var windowHeight = win.getBox().h;
                                var menuHeight = flyoutContainerDiv.offsetHeight;
                                var headerHeight = flyoutContainerHeader.offsetHeight;
                                var padding = 15;
                                var top;
                                var distanceToBottom = win.getBox().h - menuHeight - selectedElementPosition.y + this.clientTop - padding;
                                if (menuHeight > windowHeight) {
                                    domStyle.set(flyoutContainerContent, {
                                        overflowY: 'scroll',
                                        height: windowHeight - headerHeight - 2 * padding + 'px',
                                    });
                                    top = 15;
                                } else {
                                    domStyle.set(flyoutContainerContent, { overflowY: 'hidden' });
                                    if (distanceToBottom < 0) {
                                        top = win.getBox().h - flyoutContainerDiv.offsetHeight - 15;
                                    } else {
                                        top = selectedElementPosition.y + this.clientTop
                                    }
                                }
                                domStyle.set(flyoutContainerDiv, {
                                    top: top + 'px',
                                    left: selectedElementPosition.x - 315 - getComputedStyle(this, null).getPropertyValue('margin-left').replace(/[^0-9.]/g, '') + 'px'
                                });
                                if (domClass.contains(this, 'filterIconButton')) {
                                    query('.filterIconButton:not(.crashFilterSelected):not(.filterDisable)').style(whiteButtonEffect);
                                    query('.filterTextButton:not(.crashFilterSelected):not(.filterDisable)').style(whiteButtonEffect);
                                } else {
                                    query('.filterTextButton:not(.crashFilterSelected):not(.filterDisable)').style(whiteButtonEffect);
                                }
                                if (domClass.contains(this, 'crashFilterSelected')) {
                                } else {
                                    domStyle.set(this, orangeButtonEffect);
                                }
                            }
                        }
                        else {
                            query('.crashFilterFlyout').style({
                                'display': 'none',
                                'overflow-y': 'hidden',
                                'height': 'auto'
                            });
                            query('.filterTextButton:not(.crashFilterSelected):not(.filterDisable)').style(whiteButtonEffect);
                            query('.filterIconButton:not(.crashFilterSelected):not(.filterDisable)').style(whiteButtonEffect);
                            domStyle.set(this, orangeButtonEffect);
                        }
                    }
                    else { }
                },
                onmouseout: function (event) {
                    if (flyoutContainerDiv.id) { }
                    else {
                        domStyle.set(this, whiteButtonEffect);
                    }
                }
            }, query('#' + filterContent.toggleNode + ' .crashFilterFlyoutContent').length > 0 ? query('#' + filterContent.toggleNode + ' .crashFilterFlyoutContent')[0] : filterContent.toggleNode);
            if (filterContent.widgets && filterContent.widgets.length > 0) {
                var widgetRoot;
                for (var i = 0; i < filterContent.widgets.length; i++) {
                    var widgetType = filterContent.widgets[i].widgetType;
                    if (widgetType === 'date') {
                        widgetRoot = query('#' + filterContent.flyout.id + ' .crashFilterFlyoutContent')[0];
                        filterContent.widgets[i].widget = new dateSelectionWidget(filterContent);
                        domConstruct.place(filterContent.widgets[i].widget.domNode, widgetRoot, 'last');
                    }
                    else if (widgetType === 'location') {
                        widgetRoot = query('#' + filterContent.flyout.id + ' .crashFilterFlyoutContent')[0];
                        filterContent.widgets[i].widget = new locationFilterWidget(filterContent);
                        domConstruct.place(filterContent.widgets[i].widget.domNode, widgetRoot, 'last');
                        searchOmniBox.locationFilterWidget = filterContent.widgets[i].widget;
                    }
                    else if (widgetType === 'clearAllFilters') {
                        filterContent.widgets[i].widget = new clearFiltersWidget(filterContent, flyoutContainerDiv);
                    }
                }
            } else { }
            if (filterContent.values && filterContent.values.length > 0) {
                var tableRoot = query('#' + filterContent.flyout.id + ' .crashFilterFlyoutContent')[0];
                var widget = new checkBoxTableWidget(filterContent);
                if (filterContent.widgets) {
                    filterContent.widgets.push({
                        widgetType: 'table',
                        widget: widget
                    });
                } else {
                    filterContent.widgets = [
                        {
                            widgetType: 'table',
                            widget: widget
                        }
                    ];
                }
                domConstruct.place(widget.domNode, tableRoot, 'last');
            } else { } // No checkboxes were specified for this widget.
        }
        function traverseFilterTree(filterTreeRoot) {
            if (filterTreeRoot.menus && filterTreeRoot.menus.length > 0) {
                for (var i = 0; i < filterTreeRoot.menus.length; i++) {
                    var menu = filterTreeRoot.menus[i];
                    menu.parent = filterTreeRoot;
                    createWidgetContent(menu);
                    if (menu.menus) {
                        traverseFilterTree(menu);
                    }
                }
            }
        }
        function getPosition(domElement) {
            // getPostition: returns x and y position for a domElement
            // @param {dom} domElement
            // @ returns {number} xPos
            //           {number} yPos
            var xPos = 0;
            var yPos = 0;
            while (domElement) {
                if (domElement.tagName === 'BODY') {
                    // deal with browser quirks with body/window/document and page scroll
                    var xScroll = domElement.scrollLeft || document.documentElement.scrollLeft;
                    var yScroll = domElement.scrollTop || document.documentElement.scrollTop;
                    xPos += (domElement.offsetLeft - xScroll + domElement.clientLeft);
                    yPos += (domElement.offsetTop - yScroll + domElement.clientTop);
                } else {
                    // for all other non-BODY elements
                    xPos += (domElement.offsetLeft - domElement.scrollLeft + domElement.clientLeft);
                    yPos += (domElement.offsetTop - domElement.scrollTop + domElement.clientTop);
                }
                domElement = domElement.offsetParent;
            }
            return {
                x: xPos,
                y: yPos
            };
        }
        // function determineCrashColor(crashCount, maxCrashCount, intensity) {
        //     // determineCrashColor: determines the polygon color on an SRI route based on crashcount intensity.
        //     // Gradient is defined as green to red, with green as least intensity to red and most intensity.
        //     // @params {number} crashCount
        //     //         {number} maxCrashCount
        //     //         {bool or number} intensity: bool for flaw view polygons, number for 3D view polygons
        //     // @returns {array} [red, green, 0, intensity]
        //     var red, green;
        //     if (crashCount < maxCrashCount / 2) {
        //         red = 255 * ((2 * crashCount) / maxCrashCount)
        //         green = 255;
        //     }
        //     else {
        //         red = 255;
        //         green = 255 - (255 * crashCount / maxCrashCount);
        //     }
        //     if (intensity) {
        //         return [red, green, 0, intensity];
        //     }
        //     else {
        //         return [red, green, 0];
        //     }
        //     console.log(determineCrashColor);
        // }
        // function supports_local_storage() {
        //     try {
        //         return "localStorage" in window && window["localStorage"] !== null;
        //     } catch (e) {
        //         return false;
        //     }
        // }
        // function loadCredentials() {
        //     var idJson, idObject;
        //     var cred = 'esri_jsapi_id_manager_data';
        //     if (supports_local_storage()) {
        //         // read from local storage
        //         idJson = window.localStorage.getItem(cred);
        //     }
        //     else {
        //         // read from a cookie
        //         idJson = cookie(cred);
        //     }
        //     if (idJson && idJson !== "null" && idJson.length > 4) {
        //         idObject = JSON.parse(idJson);
        //         esriId.initialize(idObject);
        //         if (esriId.credentials.length === 0) {
        //             window.location.href = 'safetyLogin.html';
        //         }
        //         else {
        //             var defaultFilterValues = {
        //                 "f": "json",
        //                 "mun_mu": "",
        //                 "year": "",
        //                 "acc_month": "",
        //                 "acc_dow": "",
        //                 "date_range": "",
        //                 "svrty_code": "",
        //                 "alchl_invlvd_code": "",
        //                 "hzmt_invlvd_code": "",
        //                 "tr1_vhcls_invlvd_qty": "",
        //                 "crash_type_code": "",
        //                 "drctn_code": "",
        //                 "rd_cndtn_code": "",
        //                 "physcl_cndtn_code": "",
        //                 "physcl_stts_code": "",
        //                 "rd_mdn_type_code": "",
        //                 "ped_type_code": "P",
        //                 "trfc_cntrl_code": "",
        //                 "pre_crash_actn_code": "",
        //                 "vhcl_type_code": "",
        //                 "intl_impct_clckpnt_code": "",
        //                 "prncpl_dmg_clckpnt_code": "",
        //                 "crg_body_type_code": "",
        //                 "spcl_fnctn_code": "",
        //                 "injry_loc_code": "",
        //                 "sfty_eqpmnt_code": "",
        //                 "envrnmntl_cndtn_code": "",
        //                 "injry_type_code": "",
        //                 "lght_cndtn_code": "",
        //                 "arbg_dplymnt_type_code": "",
        //                 "rd_chrctrstc_code": "",
        //                 "vhcl_use_code": "",
        //                 "rd_srfc_type_code": "",
        //                 "trfc_vlm_code": "",
        //                 "dprtmnt_type_code": "",
        //                 "ejctn_type_code": "",
        //                 "ramp_drctn_code": "",
        //                 "off_rd_code": "",
        //                 "sbrty_test_type_code": ""
        //             };
        //             loadUIElements(defaultFilterValues);
        //         }
        //     }
        //     else {
        //         window.location.href = 'safetyLogin.html';
        //     }
        // }
        function loadUIElements(defaultFilterValues) {
            // var dataUpdateDialog = new dataUpdateWidget(document.body);
            // var firstTimeOverlay = localStorage.getObject('firstTimeOverlay');
            // var sriOverlayLayerPromise;
            // var unmatchedDataLayerPromise;
            // function applyUserTheme(theme) {
            //     var availableSearchFilters = [];
            //     var cumberlandTheme = {
            //         type: 'county',
            //         code: '06-11',
            //         fieldName: 'mun_mu',
            //         title: 'Cumberland County',
            //         menus: [
            //             {
            //                 flyout: { id: 'jurisdictionFlyout', title: 'County Filters' },
            //                 toggleNode: 'filtersDiv',
            //                 toggleIcon: 'jurisdictionFilter',
            //                 crashClusterCapable: true,
            //                 menus: [
            //                     {
            //                         flyout: { id: 'jursidictionFilterMenu6', title: 'Cumberland County' },
            //                         toggleNode: 'jurisdictionFlyout',
            //                         toggleText: 'cumberlandToggle',
            //                         description: 'Cumberland County',
            //                         fieldName: 'mun_mu',
            //                         parentCode: '06',
            //                         crashClusterCapable: true,
            //                         selectAll: false,
            //                         clearAll: false,
            //                         values: [
            //                             { code: '06-11', description: 'CUMBERLAND COUNTY', state: 'permanent' },
            //                             { code: '0601', description: 'BRIDGETON CITY' },
            //                             { code: '0602', description: 'COMMERCIAL TWP' },
            //                             { code: '0603', description: 'DEERFIELD TWP' },
            //                             { code: '0604', description: 'DOWNE TWP' },
            //                             { code: '0605', description: 'FAIRFIELD TWP' },
            //                             { code: '0606', description: 'GREENWICH TWP' },
            //                             { code: '0607', description: 'HOPEWELL TWP' },
            //                             { code: '0608', description: 'LAWRENCE TWP' },
            //                             { code: '0609', description: 'MAURICE RIVER TWP' },
            //                             { code: '0610', description: 'MILLVILLE CITY' },
            //                             { code: '0611', description: 'SHILOH BORO' },
            //                             { code: '0612', description: 'STOW CREEK TWP' },
            //                             { code: '0613', description: 'UPPER DEERFIELD TWP' },
            //                             { code: '0614', description: 'VINELAND CITY' }
            //                         ]
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            //     var capemayTheme = {
            //         type: 'county',
            //         code: '05-9',
            //         fieldName: 'mun_mu',
            //         title: 'Cape May County',
            //         menus: [
            //             {
            //                 flyout: { id: 'jurisdictionFlyout', title: 'County Filters' },
            //                 toggleNode: 'filtersDiv',
            //                 toggleIcon: 'jurisdictionFilter',
            //                 crashClusterCapable: true,
            //                 menus: [
            //                     {
            //                         flyout: { id: 'jursidictionFilterMenu5', title: 'Cape May County' },
            //                         toggleNode: 'jurisdictionFlyout',
            //                         toggleText: 'capeMayToggle',
            //                         description: 'Cape May County',
            //                         fieldName: 'mun_mu',
            //                         parentCode: '05',
            //                         crashClusterCapable: true,
            //                         selectAll: false,
            //                         clearAll: false,
            //                         values: [
            //                             { code: '05-9', description: 'CAPE MAY COUNTY' },
            //                             { code: '0501', description: 'AVALON BORO' },
            //                             { code: '0502', description: 'CAPE MAY CITY' },
            //                             { code: '0503', description: 'CAPE MAY POINT BORO' },
            //                             { code: '0504', description: 'DENNIS TWP' },
            //                             { code: '0505', description: 'LOWER TWP' },
            //                             { code: '0506', description: 'MIDDLE TWP' },
            //                             { code: '0507', description: 'NORTH WILDWOOD CITY' },
            //                             { code: '0508', description: 'OCEAN CITY' },
            //                             { code: '0509', description: 'SEA ISLE CITY' },
            //                             { code: '0510', description: 'STONE HARBOR BORO' },
            //                             { code: '0511', description: 'UPPER TWP' },
            //                             { code: '0512', description: 'WEST CAPE MAY BORO' },
            //                             { code: '0513', description: 'WEST WILDWOOD BORO' },
            //                             { code: '0514', description: 'WILDWOOD CITY' },
            //                             { code: '0515', description: 'WILDWOOD CREST BORO' },
            //                             { code: '0516', description: 'WOODBINE BORO' }
            //                         ]
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            //     function updateFilterStructure(modifications, originalStructure) {
            //         if (modifications.menus && modifications.menus.length > 0) {
            //             for (var i = 0; i < modifications.menus.length; i++) {
            //                 var modMenu = modifications.menus[i];
            //                 if (originalStructure.menus && originalStructure.menus.length > 0) {
            //                     for (var j = 0; j < originalStructure.menus.length; j++) {
            //                         var originalMenu = originalStructure.menus[j];
            //                         if (modMenu.toggleIcon === originalMenu.toggleIcon) {
            //                             originalStructure.menus[j] = modMenu;
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //         return originalStructure;
            //     }
            //     if (theme === 'cumberland') {
            //         areaReport.style.display = 'block';
            //         filterStructure.type = 'county';
            //         filterStructure.code = '06-11';
            //         filterStructure.fieldName = 'mun_mu';
            //         filterStructure.title = 'Cumberland County';
            //         filterStructure = updateFilterStructure(cumberlandTheme, filterStructure);
            //         availableSearchFilters = [
            //             {
            //                 className: 'stateRouteFilter',
            //                 toolTip: 'Search for state routes and their associated data.'
            //             },
            //             {
            //                 className: 'municipalityFilter',
            //                 toolTip: 'Search for municipalities'
            //             },
            //             {
            //                 className: 'caseNumberFilter',
            //                 toolTip: 'Search for specific cases.\nThis will work when searching with 5 or more characters.'
            //             },
            //             {
            //                 // This search is broken into two pieces in the service, but for the time being the toggle will activate both.
            //                 className: 'googlePlaceFilter',
            //                 toolTip: 'Search for places by keyword'
            //             }
            //         ]
            //         var countyQueryTask = new QueryTask({ url: countyLayerURL });
            //         var countyQuery = new superQuery();
            //         // match the format for the drop down so that the county will be correctly selected
            //         countyQuery.returnGeometry = true;
            //         countyQuery.outFields = ["*"];
            //         countyQuery.where = 'FIPSCO = \'' + filterStructure.code.split('-')[1] + '\'';
            //         countyQueryTask.execute(countyQuery).then(function (results) {
            //             var polygon = new Polygon(results.features[0].geometry);
            //             var fillSymbol = new SimpleFillSymbol({
            //                 style: 'none',
            //                 outline: new SimpleLineSymbol({
            //                     color: 'blue',
            //                     width: 3
            //                 })
            //             });
            //             var polygonGraphic = new Graphic({
            //                 geometry: polygon,
            //                 symbol: fillSymbol
            //             });
            //             testingLayer.removeAll();
            //             testingLayer.add(polygonGraphic);
            //             flatView.goTo(polygonGraphic)//.then(function (event) {
            //             mapCenter = polygonGraphic.geometry.extent;
            //         }, errorHandler);
            //     }
            //     else if (theme === 'capemay') {
            //         areaReport.style.display = 'block';
            //         filterStructure.type = 'county';
            //         filterStructure.code = '05-9';
            //         filterStructure.fieldName = 'mun_mu';
            //         filterStructure.title = 'Cape May County';
            //         filterStructure = updateFilterStructure(capemayTheme, filterStructure);
            //         availableSearchFilters = [
            //             {
            //                 className: 'stateRouteFilter',
            //                 toolTip: 'Search for state routes and their associated data.'
            //             },
            //             {
            //                 className: 'municipalityFilter',
            //                 toolTip: 'Search for municipalities'
            //             },
            //             {
            //                 className: 'caseNumberFilter',
            //                 toolTip: 'Search for specific cases.\nThis will work when searching with 5 or more characters.'
            //             },
            //             {
            //                 // This search is broken into two pieces in the service, but for the time being the toggle will activate both.
            //                 className: 'googlePlaceFilter',
            //                 toolTip: 'Search for places by keyword'
            //             }
            //         ]
            //         var countyQueryTask = new QueryTask({ url: countyLayerURL });
            //         var countyQuery = new superQuery();
            //         // match the format for the drop down so that the county will be correctly selected
            //         countyQuery.returnGeometry = true;
            //         countyQuery.outFields = ["*"];
            //         countyQuery.where = 'FIPSCO = \'' + filterStructure.code.split('-')[1] + '\'';
            //         countyQueryTask.execute(countyQuery).then(function (results) {
            //             var polygon = new Polygon(results.features[0].geometry);
            //             var fillSymbol = new SimpleFillSymbol({
            //                 style: 'none',
            //                 outline: new SimpleLineSymbol({
            //                     color: 'blue',
            //                     width: 3
            //                 })
            //             });
            //             var polygonGraphic = new Graphic({
            //                 geometry: polygon,
            //                 symbol: fillSymbol
            //             });
            //             testingLayer.removeAll();
            //             testingLayer.add(polygonGraphic);
            //             flatView.goTo(polygonGraphic)//.then(function (event) {
            //             mapCenter = polygonGraphic.geometry.extent;
            //         }, errorHandler);
            //     }
            //     else if (theme === 'pedestrian') {
            //         filterStructure = {
            //             // Defines the filter categories and respective filter items.
            //             // Defines the layout of the filters in the Filter tab. Codes for selected fi-
            //             // lters will be extracted when constructing URL queries.
            //             menus: [
            //                 {
            //                     flyout: { id: 'crashLocationFlyout', title: 'Crash Location Details' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'locationFilter',
            //                     crashClusterCapable: true,
            //                     widgets: [{ widgetType: 'location' }]
            //                 },
            //                 {
            //                     flyout: { id: 'crashDateFlyout', title: 'Temporal Crash Details' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'dateFilter',
            //                     crashClusterCapable: true,
            //                     clearAll: true,
            //                     widgets: [
            //                         { widgetType: 'date' }
            //                     ]
            //                 },
            //                 {
            //                     flyout: { id: 'crashTypeFlyout', title: 'Crash Type(s)' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'crashTypeFilter',
            //                     fieldName: 'crash_type_code',
            //                     crashClusterCapable: true,
            //                     clearAll: true,
            //                     values: [
            //                         { code: '01', description: 'Same Direction - Rear End' },
            //                         { code: '02', description: 'Same Direction - Sideswipe' },
            //                         { code: '03', description: 'Right Angle' },
            //                         { code: '04', description: 'Opposite Direction (Head On/ Angular)' },
            //                         { code: '05', description: 'Opposite Direction (Sideswipe)' },
            //                         { code: '06', description: 'Struck Parked Vehicle' },
            //                         { code: '07', description: 'Left Turn/U Turn' },
            //                         { code: '08', description: 'Backing' },
            //                         { code: '09', description: 'Encroachment' },
            //                         { code: '10', description: 'Overturned' },
            //                         { code: '11', description: 'Fixed Object' },
            //                         { code: '12', description: 'Animal' },
            //                         { code: '13', description: 'Pedestrian' },
            //                         { code: '14', description: 'Pedalcyclist' },
            //                         { code: '15', description: 'Non-fixed Object' },
            //                         { code: '16', description: 'Railcar - vehicle' },
            //                         { code: '99', description: 'Other' },
            //                         { code: '00', description: 'Unknown' },
            //                         { code: '-20', description: 'NOT RECORDED' },
            //                         { code: '20', description: 'Value Unknown' }
            //                     ]
            //                 },
            //                 {
            //                     flyout: { id: 'pedCyclistFlyout', title: 'Pedestrian/Cyclist Involvement' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'pedestrianCyclistFilter',
            //                     fieldName: 'ped_type_code',
            //                     crashClusterCapable: true,
            //                     clearAll: true,
            //                     values: [
            //                         { code: 'P', description: 'Pedestrian Involved' },
            //                         { code: 'C', description: 'Cyclist' }
            //                     ]
            //                 },
            //                 {
            //                     flyout: { id: 'advancedFlyout', title: 'Advanced Filters' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'advancedFilter',
            //                     crashClusterCapable: true,
            //                     menus: [
            //                         {
            //                             flyout: { id: 'advancedFilterMenu1', title: 'Pre-Crash Action' },
            //                             toggleNode: 'advancedFlyout',
            //                             toggleText: 'preCrashActionToggle',
            //                             fieldName: 'pre_crash_actn_code',
            //                             clearAll: true,
            //                             values: [
            //                                 { code: '02', description: 'Making Right Turn (not turn on red)' },
            //                                 { code: '03', description: 'Making Left Turn' },
            //                                 { code: '04', description: 'Making U Turn' },
            //                                 { code: '05', description: 'Starting from Parking' },
            //                                 { code: '07', description: 'Slowing or Stopping' },
            //                                 { code: '14', description: 'Driverless/Moving' },
            //                                 { code: '16', description: 'Negotiating Curve' },
            //                                 { code: '17', description: 'Driving On Shoulder' },
            //                                 { code: '18', description: 'Right Turn On Red' },
            //                                 { code: '29', description: 'Other Veh/Cyclist Action *' },
            //                                 { code: '32', description: 'Walking To/From School' },
            //                                 { code: '33', description: 'Walking/Jogging with Traffic' },
            //                                 { code: '34', description: 'Walking/Jogging Against Traffic' },
            //                                 { code: '35', description: 'Playing in Road' },
            //                                 { code: '44', description: 'Crossing at "unmarked" Crosswalk at Intersection' },
            //                                 { code: '45', description: 'Crossing at "marked" Crosswalk at Mid-Block' },
            //                                 { code: '46', description: 'Crossing/Jaywalking at Mid-Block' },
            //                                 { code: '49', description: 'Other Pedestrian Action *' },
            //                                 { code: '00', description: 'Unknown' },
            //                                 { code: '01', description: 'Going Straight Ahead' },
            //                                 { code: '06', description: 'Starting in Traffic' },
            //                                 { code: '08', description: 'Stopped in Traffic' },
            //                                 { code: '09', description: 'Parking' },
            //                                 { code: '10', description: 'Parked' },
            //                                 { code: '11', description: 'Changing Lanes' },
            //                                 { code: '12', description: 'Merging/Entering Traffic Lane' },
            //                                 { code: '13', description: 'Backing' },
            //                                 { code: '15', description: 'Passing' },
            //                                 { code: '31', description: 'Pedestrian Off Road' },
            //                                 { code: '36', description: 'Standing/Lying/Kneeling in Road' },
            //                                 { code: '37', description: 'Getting On/Off Vehicle' },
            //                                 { code: '38', description: 'Pushing/Working on Vehicle' },
            //                                 { code: '39', description: 'Other Working in Roadway' },
            //                                 { code: '40', description: 'Approaching/Leaving Schoolbus' },
            //                                 { code: '41', description: 'Coming From Behind Parked Vehicle' },
            //                                 { code: '42', description: '(reserved)' },
            //                                 { code: '43', description: 'Crossing at "marked" Crosswalk at Intersection' },
            //                                 { code: '99', description: 'Other' },
            //                                 { code: '-20', description: 'NOT RECORDED' }
            //                             ]
            //                         },
            //                         {
            //                             flyout: { id: 'advancedFilterMenu2', title: 'Vehicle Type' },
            //                             toggleNode: 'advancedFlyout',
            //                             toggleText: 'vehicleTypeToggle',
            //                             fieldName: 'vhcl_type_code',
            //                             crashClusterCapable: true,
            //                             clearAll: true,
            //                             values: [
            //                                 { code: '02', description: 'Passenger Van (< 9 Seats)' },
            //                                 { code: '03', description: 'Cargo Van (10K lbs or less)' },
            //                                 { code: '04', description: 'Sport Utility Veh' },
            //                                 { code: '05', description: 'Pickup' },
            //                                 { code: '07', description: 'All Terrain Vehicle' },
            //                                 { code: '19', description: 'Other Pass Vehicle' },
            //                                 { code: '20', description: 'Single Unit (2 axle)' },
            //                                 { code: '21', description: 'Single Unit (3+ axle)' },
            //                                 { code: '23', description: 'Single Unit Truck w/Trailer' },
            //                                 { code: '29', description: 'Other Truck' },
            //                                 { code: '30', description: 'Bus/Large Van (9 or more Seats)' },
            //                                 { code: '00', description: 'Unknown' },
            //                                 { code: '01', description: 'Car/Station Wagon/ Mini Van' },
            //                                 { code: '06', description: 'Recreational Vehicle' },
            //                                 { code: '08', description: 'Motorcycle' },
            //                                 { code: '09', description: '(reserved)' },
            //                                 { code: '10', description: 'any previous w/Trailer' },
            //                                 { code: '11', description: 'Moped' },
            //                                 { code: '12', description: 'Streetcar/Trolley' },
            //                                 { code: '13', description: 'Pedalcycle' },
            //                                 { code: '22', description: 'Light Truck w/Trailer' },
            //                                 { code: '24', description: 'Truck Tractor (Bobtail)' },
            //                                 { code: '25', description: 'Tractor Semi-Trailer' },
            //                                 { code: '26', description: 'Tractor Double' },
            //                                 { code: '27', description: 'Tractor Triple' },
            //                                 { code: '99', description: 'Other' },
            //                                 { code: '-20', description: 'NOT RECORDED' }
            //                             ]
            //                         },
            //                         {
            //                             flyout: { id: 'advancedFilterMenu6', title: 'Special Function' },
            //                             toggleNode: 'advancedFlyout',
            //                             toggleText: 'specialFunctionToggle',
            //                             fieldName: 'spcl_fnctn_code',
            //                             crashClusterCapable: true,
            //                             clearAll: true,
            //                             values: [
            //                                 { code: '01', description: 'Work Equipment' },
            //                                 { code: '02', description: 'Police' },
            //                                 { code: '03', description: 'Military' },
            //                                 { code: '04', description: 'Fire/Rescue' },
            //                                 { code: '05', description: 'Ambulance' },
            //                                 { code: '06', description: 'Taxi/Limo' },
            //                                 { code: '07', description: 'Veh Used as School Bus' },
            //                                 { code: '08', description: 'Veh Used as Other Bus' },
            //                                 { code: '09', description: 'School Bus' },
            //                                 { code: '10', description: 'Transit Bus' },
            //                                 { code: '11', description: 'Other Bus' },
            //                                 { code: '12', description: 'Veh Used as Snowplow' },
            //                                 { code: '13', description: 'Vehicle Towing Another Veh' },
            //                                 { code: '99', description: 'Other' },
            //                                 { code: '00', description: 'Unknown' },
            //                                 { code: '-20', description: 'NOT RECORDED' }
            //                             ]
            //                         },
            //                         {
            //                             flyout: { id: 'advancedFilterMenu8', title: 'Safety Equipment' },
            //                             toggleNode: 'advancedFlyout',
            //                             toggleText: 'safetyEquipmentToggle',
            //                             fieldName: 'sfty_eqpmnt_code',
            //                             crashClusterCapable: true,
            //                             clearAll: true,
            //                             values: [
            //                                 { code: '01', description: 'None' },
            //                                 { code: '02', description: 'Lap Belt' },
            //                                 { code: '03', description: 'Harness' },
            //                                 { code: '04', description: 'Lap Belt & Harness' },
            //                                 { code: '05', description: 'Child Restraint' },
            //                                 { code: '06', description: 'Helmet' },
            //                                 { code: '07', description: '(reserved)' },
            //                                 { code: '08', description: 'Airbag' },
            //                                 { code: '09', description: 'Airbag & Seat Belts' },
            //                                 { code: '10', description: 'Safety Vest (Ped only)' },
            //                                 { code: '99', description: 'Other' },
            //                                 { code: '00', description: 'Unknown' },
            //                                 { code: '-20', description: 'NOT RECORDED' }
            //                             ]
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'clearAllFilters',
            //                     toolTip: 'Clear all filters',
            //                     crashClusterCapable: true,
            //                     widgets: [
            //                         { widgetType: 'clearAllFilters' }
            //                     ]
            //                 }
            //             ]
            //         };
            //         availableSearchFilters = [
            //             {
            //                 className: 'countyFilter',
            //                 toolTip: 'Search for counties'
            //             },
            //             {
            //                 className: 'stateRouteFilter',
            //                 toolTip: 'Search for state routes and their associated data.'
            //             },
            //             {
            //                 className: 'municipalityFilter',
            //                 toolTip: 'Search for municipalities'
            //             },
            //             {
            //                 className: 'caseNumberFilter',
            //                 toolTip: 'Search for specific cases.\nThis will work when searching with 5 or more characters.'
            //             },
            //             {
            //                 // This search is broken into two pieces in the service, but for the time being the toggle will activate both.
            //                 className: 'googlePlaceFilter',
            //                 toolTip: 'Search for places by keyword'
            //             }
            //         ];
            //     }
            //     else if (theme === 'police') {
            //         filterStructure = {
            //             // Defines the filter categories and respective filter items.
            //             // Defines the layout of the filters in the Filter tab. Codes for selected fi-
            //             // lters will be extracted when constructing URL queries.
            //             menus: [
            //                 {
            //                     flyout: { id: 'crashLocationFlyout', title: 'Crash Location Details' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'locationFilter',
            //                     crashClusterCapable: true,
            //                     widgets: [{ widgetType: 'location' }]
            //                 },
            //                 {
            //                     flyout: { id: 'crashDateFlyout', title: 'Temporal Crash Details' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'dateFilter',
            //                     crashClusterCapable: true,
            //                     clearAll: true,
            //                     widgets: [
            //                         { widgetType: 'date' }
            //                     ]
            //                 },
            //                 {
            //                     flyout: { id: 'trafficControlFlyout', title: 'Traffic Control' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'trafficControlFilter',
            //                     fieldName: 'trfc_cntrl_code',
            //                     crashClusterCapable: true,
            //                     clearAll: true,
            //                     values: [
            //                         { code: '01', description: 'Police Officer' },
            //                         { code: '02', description: 'RR Watchman' },
            //                         { code: '03', description: 'Traffic Signal' },
            //                         { code: '04', description: 'Lane Markings' },
            //                         { code: '05', description: 'Channelization - Painted' },
            //                         { code: '06', description: 'Channelization - Physical' },
            //                         { code: '07', description: 'Warning Signal' },
            //                         { code: '08', description: 'Stop Sign' },
            //                         { code: '09', description: 'Yield Sign' },
            //                         { code: '10', description: 'Flagman' },
            //                         { code: '11', description: 'No Control Present' },
            //                         { code: '12', description: 'Flashing Traffic Control' },
            //                         { code: '13', description: 'School Zone (Signs/Controls)' },
            //                         { code: '14', description: 'Adult Crossing Guard' },
            //                         { code: '99', description: 'Other' },
            //                         { code: '00', description: 'Unknown' },
            //                         { code: '-20', description: 'NOT RECORDED' }
            //                     ]
            //                 },
            //                 {
            //                     flyout: { id: 'advancedFlyout', title: 'Advanced Filters' },
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'advancedFilter',
            //                     crashClusterCapable: true,
            //                     menus: [
            //                         {
            //                             flyout: { id: 'advancedFilterMenu6', title: 'Special Function' },
            //                             toggleNode: 'advancedFlyout',
            //                             toggleText: 'specialFunctionToggle',
            //                             fieldName: 'spcl_fnctn_code',
            //                             crashClusterCapable: true,
            //                             clearAll: true,
            //                             values: [
            //                                 { code: '01', description: 'Work Equipment' },
            //                                 { code: '02', description: 'Police' },
            //                                 { code: '03', description: 'Military' },
            //                                 { code: '04', description: 'Fire/Rescue' },
            //                                 { code: '05', description: 'Ambulance' },
            //                                 { code: '06', description: 'Taxi/Limo' },
            //                                 { code: '07', description: 'Veh Used as School Bus' },
            //                                 { code: '08', description: 'Veh Used as Other Bus' },
            //                                 { code: '09', description: 'School Bus' },
            //                                 { code: '10', description: 'Transit Bus' },
            //                                 { code: '11', description: 'Other Bus' },
            //                                 { code: '12', description: 'Veh Used as Snowplow' },
            //                                 { code: '13', description: 'Vehicle Towing Another Veh' },
            //                                 { code: '99', description: 'Other' },
            //                                 { code: '00', description: 'Unknown' },
            //                                 { code: '-20', description: 'NOT RECORDED' }
            //                             ]
            //                         },
            //                         {
            //                             flyout: { id: 'advancedFilterMenu15', title: 'Vehicle Use' },
            //                             toggleNode: 'advancedFlyout',
            //                             toggleText: 'vehicleUseToggle',
            //                             fieldName: 'vhcl_use_code',
            //                             crashClusterCapable: true,
            //                             clearAll: true,
            //                             values: [
            //                                 { code: '01', description: 'Personal' },
            //                                 { code: '02', description: 'Business/Commerce' },
            //                                 { code: '03', description: 'Government' },
            //                                 { code: '04', description: 'Responding to Emergency' },
            //                                 { code: '05', description: 'Machinery in Use' },
            //                                 { code: '99', description: 'Other' },
            //                                 { code: '00', description: 'Unknown' },
            //                                 { code: '-20', description: 'NOT RECORDED' },
            //                             ]
            //                         },
            //                         {
            //                             flyout: { id: 'advancedFilterMenu18', title: 'Department Type' },
            //                             toggleNode: 'advancedFlyout',
            //                             toggleText: 'departmentTypeToggle',
            //                             fieldName: 'dprtmnt_type_code',
            //                             crashClusterCapable: true,
            //                             clearAll: true,
            //                             values: [
            //                                 { code: '01', description: 'Municipal Police' },
            //                                 { code: '02', description: 'State Police' },
            //                                 { code: '03', description: 'County Police' },
            //                                 { code: '04', description: 'Port Authority Police' },
            //                                 { code: '99', description: 'Other' },
            //                                 { code: '-20', description: 'NOT RECORDED' }
            //                             ]
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     toggleNode: 'filtersDiv',
            //                     toggleIcon: 'clearAllFilters',
            //                     toolTip: 'Clear all filters',
            //                     crashClusterCapable: true,
            //                     widgets: [
            //                         { widgetType: 'clearAllFilters' }
            //                     ]
            //                 }
            //             ]
            //         };
            //         availableSearchFilters = [
            //             {
            //                 className: 'countyFilter',
            //                 toolTip: 'Search for counties'
            //             },
            //             {
            //                 className: 'stateRouteFilter',
            //                 toolTip: 'Search for state routes and their associated data.'
            //             },
            //             {
            //                 className: 'municipalityFilter',
            //                 toolTip: 'Search for municipalities'
            //             },
            //             {
            //                 className: 'caseNumberFilter',
            //                 toolTip: 'Search for specific cases.\nThis will work when searching with 5 or more characters.'
            //             },
            //             {
            //                 // This search is broken into two pieces in the service, but for the time being the toggle will activate both.
            //                 className: 'googlePlaceFilter',
            //                 toolTip: 'Search for places by keyword'
            //             }
            //         ];
            //     }
            //     else {
            //         areaReport.style.display = 'block';
            //         availableSearchFilters = [
            //             {
            //                 className: 'countyFilter',
            //                 toolTip: 'Search for counties',
            //                 disabled: false
            //             },
            //             {
            //                 className: 'stateRouteFilter',
            //                 toolTip: 'Search for state routes and their associated data.',
            //                 disabled: false
            //             },
            //             {
            //                 className: 'municipalityFilter',
            //                 toolTip: 'Search for municipalities',
            //                 disabled: false
            //             },
            //             {
            //                 className: 'caseNumberFilter',
            //                 toolTip: 'Search for specific cases.\nThis will work when searching with 5 or more characters.',
            //                 disabled: true
            //             },
            //             {
            //                 // This search is broken into two pieces in the service, but for the time being the toggle will activate both.
            //                 className: 'googlePlaceFilter',
            //                 toolTip: 'Search for places by keyword',
            //                 disabled: true
            //             }
            //         ];
            //     }
            //     availableSearchFilters.forEach(function (filterAttributes) { searchFilterButtonWidget(filterAttributes, searchTypeOptions) });
            // }
            // function userCanExport(userName) {
            //     var filter = { User: userName, f: 'json' };
            //     esriRequest(canExportURL, { query: filter }).then(function (response) {
            //         if (response.data) {
            //             if (response.data.Permissions) {
            //                 if (response.data.Permissions === 'True') {
            //                     dataExport.style.display = 'block';
            //                 }
            //                 else {
            //                     dataExport.style.display = 'none';
            //                 }
            //             }
            //             else {
            //                 dataExport.style.display = 'none';
            //             }
            //         }
            //         else {
            //             dataExport.style.display = 'none';
            //         }
            //     }, errorHandler);
            // }
            // requestScheduler = new RequestScheduler();
            // userCanExport(esriId.credentials[0].userId);
            // applyUserTheme(window.location.search.split('=')[1] || '');
            // // Show all the UI elements that are hidden on load.
            homeButton.classList.remove('hidden');
            settingsToggleButton.classList.remove('hidden');
            filterMenuToggle.classList.remove('hidden');
            resultsButton.classList.remove('hidden');
            // document.getElementById('updatesButton').classList.remove('hidden');
            searchOmniBoxSearchType.classList.remove('hidden');
            searchOmniBox.classList.remove('hidden');
            traverseFilterTree(filterStructure);
            // synchronizeViews([roundView, flatView]);
            // domClass.toggle(roundViewDiv, 'hideMap');
            // flatView.ui.add(compassWidget, 'top-left'); // Add the Compass widget to the top left corner of the view

            // map.addMany([generalMapLayers, crashPointLayer, graphicsLayer, flashParcelsGraphicLayer, testingLayer, unmatchedDataLayer, sriOverlayLayer]); // Add the layers to the map
            // updateMapGraphics(false, false, 'disclaimerDismiss');
            // //updateMapGraphics(false, false, 'disclaimerDismiss', defaultFilterValues);
            // graphicsLayer.visible = true;
            // generalMapLayers.visible = true;
            // sriOverlayLayerPromise = roundView.whenLayerView(sriOverlayLayer);
            // unmatchedDataLayerPromise = roundView.whenLayerView(unmatchedDataLayer);
            // all([sriOverlayLayerPromise, unmatchedDataLayerPromise]).then(function (response) {
            //     sriOverlayLayer.layerView = response[0];
            //     unmatchedDataLayer.layerView = response[1];
            //     sriOverlayLayer.updateClientSideGraphics = function (updateData, loadSpinner, locationFilterWidget, mpFilterZoom, showLocationFilterWidget) {
            //         var t0 = performance.now();
            //         var polygonList = [];
            //         console.log('Client Side Updates Started: ' + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //         function renderDataToMap(response) {
            //             console.log("Data returned from service: " + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //             var serverData = response[0];
            //             var matchedDataFeatures = response[1].features;
            //             var unmatchedDataFeatures = response[2].features;
            //             var matchedMaxCrashCount = 0;
            //             var unmatchedMaxCrashCount = 0;
            //             var easternPoint = new Point(mapCenter.xmin, mapCenter.ymax);
            //             var westernPoint = new Point(mapCenter.xmax, mapCenter.ymin);
            //             var distance;
            //             var calculatedDistance;
            //             var minimumDistance = 6000;
            //             var geometryMatch = false;
            //             crashCount = 0;
            //             var j = matchedDataFeatures.length;
            //             //while (j--) {
            //             for (var j = 0; j < matchedDataFeatures.length; j++) {
            //                 var crashArray = [];
            //                 var featureLayerGeometry = matchedDataFeatures[j].geometry;
            //                 var featureLayerAttributes = matchedDataFeatures[j].attributes;
            //                 var matchedServerData = serverData.data.crashcountObject[featureLayerAttributes.SRI + ':' + featureLayerAttributes.MP.toFixed(1)];
            //                 if (matchedServerData) {
            //                     var currentMP = parseFloat(matchedServerData.MP);
            //                     geometryMatch = true;
            //                     // Test if the point is in the original bounds of NJ
            //                     if (mapCenter.contains(featureLayerGeometry.centroid)) {
            //                         if (featureLayerGeometry.extent.xmax > easternPoint.x) {
            //                             // Move eastern bound further east.
            //                             easternPoint = featureLayerGeometry.centroid;
            //                         }
            //                         if (featureLayerGeometry.extent.xmin < westernPoint.x) {
            //                             // Move western bound further west.
            //                             westernPoint = featureLayerGeometry.centroid;
            //                         }
            //                     }
            //                     if (matchedServerData.CrashCount > matchedMaxCrashCount) {
            //                         matchedMaxCrashCount = matchedServerData.CrashCount;
            //                     }
            //                     if (serverData.data.minMP == null) {
            //                         serverData.data.minMP = currentMP;
            //                     }
            //                     else {
            //                         if (currentMP < serverData.data.minMP) {
            //                             serverData.data.minMP = currentMP;
            //                         }
            //                     }
            //                     if (serverData.data.maxMP == null) {
            //                         serverData.data.maxMP = currentMP;
            //                     }
            //                     else {
            //                         if (currentMP > serverData.data.maxMP) {
            //                             serverData.data.maxMP = currentMP;
            //                         }
            //                     }
            //                     featureLayerAttributes.RoadName = matchedServerData.RoadName;
            //                     featureLayerAttributes.CrashCount = matchedServerData.CrashCount;
            //                     featureLayerAttributes.County = matchedServerData.CountyName;
            //                     featureLayerAttributes.Municipality = matchedServerData.MunicipalityName;
            //                     //featureLayerAttributes.K = matchedServerData.K || 0;
            //                     //featureLayerAttributes.A = matchedServerData.A || 0;
            //                     //featureLayerAttributes.B = matchedServerData.B || 0;
            //                     //featureLayerAttributes.C = matchedServerData.C || 0;
            //                     //featureLayerAttributes.O = matchedServerData.O || 0;
            //                     //featureLayerAttributes.KABCOWeightedScore = matchedServerData.KABCOWeightedScore || 0;
            //                     //featureLayerAttributes.KAWeightedScore = matchedServerData.KAWeightedScore || 0;
            //                     crashCount += matchedServerData.CrashCount;
            //                     crashData.push({
            //                         OBJECTID: featureLayerAttributes.OBJECTID,
            //                         detailLink: { SRI: matchedServerData.SRI, MP: matchedServerData.MP },
            //                         SRI: matchedServerData.SRI,
            //                         MP: featureLayerAttributes.MP.toFixed(1),
            //                         CrashCount: matchedServerData.CrashCount,
            //                         //K: matchedServerData.K,
            //                         //A: matchedServerData.A,
            //                         //B: matchedServerData.B,
            //                         //C: matchedServerData.C,
            //                         //O: matchedServerData.O,
            //                         //KABCOWeightedScore: matchedServerData.KABCOWeightedScore,
            //                         //KAWeightedScore: matchedServerData.KAWeightedScore
            //                     });
            //                 } else {
            //                     featureLayerAttributes.CrashCount = 0;
            //                 }
            //             }
            //             var i = unmatchedDataFeatures.length;
            //             //while (i--) {
            //             for (var i = 0; i < unmatchedDataFeatures.length; i++) {
            //                 var featureLayerGeometry = unmatchedDataFeatures[i].geometry;
            //                 var featureLayerAttributes = unmatchedDataFeatures[i].attributes;
            //                 var pairedServerData = serverData.data.crashcountObject[featureLayerAttributes.SRI + ':MUNI:' + featureLayerAttributes.MUN_CODE];
            //                 if (pairedServerData) {
            //                     geometryMatch = true;
            //                     featureLayerAttributes.CrashCount = pairedServerData.CrashCount;
            //                     if (pairedServerData.CrashCount > unmatchedMaxCrashCount) {
            //                         unmatchedMaxCrashCount = pairedServerData.CrashCount;
            //                     }
            //                     // For now we are not displaying the unmatched crash count in the results pane.
            //                     // This will be discussed with Chris to determine the best way to display this.
            //                     // crashCount += pairedServerData.CrashCount;
            //                     crashCount += pairedServerData.CrashCount;
            //                     crashData.push({
            //                         OBJECTID: featureLayerAttributes.OBJECTID,
            //                         detailLink: { SRI: pairedServerData.SRI, MP: pairedServerData.MP },
            //                         SRI: pairedServerData.SRI,
            //                         MP: 'No MP (' + featureLayerAttributes.MuniName + ')',
            //                         CrashCount: pairedServerData.CrashCount,
            //                         MUN_CODE: featureLayerAttributes.MUN_CODE
            //                     });
            //                 } else {
            //                     featureLayerAttributes.CrashCount = 0;
            //                 }
            //             }
            //             unmatchedDataLayer.renderer = new SimpleRenderer({
            //                 symbol: new PolygonSymbol3D({
            //                     symbolLayers: [new ExtrudeSymbol3DLayer()]
            //                 }),
            //                 visualVariables: [
            //                     {
            //                         type: "size",
            //                         field: "CrashCount",
            //                         stops: [
            //                             { value: 0, size: sriOverlayLayer.elevationInfo.offset - Math.random() }
            //                         ]
            //                     }, {
            //                         type: "color",
            //                         field: "CrashCount",
            //                         stops: [
            //                             { value: 0, color: 'lightblue' }
            //                         ]
            //                     }
            //                 ]
            //             });
            //             serverData.data.displayName = updateData.ResultText;
            //             serverData.data.SRI = updateData.ResultID;
            //             if (locationFilterWidget.currentRouteData) {
            //                 if (locationFilterWidget.currentRouteData.SRI !== updateData.ResultID) {
            //                     locationFilterWidget.updateWidgetWithCurrentSelections(serverData);
            //                 }
            //             } else {
            //                 locationFilterWidget.updateWidgetWithCurrentSelections(serverData);
            //             }
            //             console.log('Feature Updates Finished: ' + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //             if (mpFilterZoom) {
            //                 calculatedDistance = westernPoint.distance(easternPoint) * 6;
            //                 if (calculatedDistance < minimumDistance) { distance = minimumDistance; }
            //                 else { distance = calculatedDistance; }
            //                 if (areaReport.areaMetricWidget) {
            //                     areaReport.areaMetricWidget.pauseGraphs(true);
            //                 }
            //                 if (geometryMatch === true) {
            //                     if (crashData.length === 0) {
            //                         var zoomHandle = roundView.goTo(matchedDataFeatures);
            //                     }
            //                     else if (crashData.length === 1) {
            //                         var zoomHandle = roundView.goTo(matchedDataFeatures);
            //                     }
            //                     else {
            //                         var targetExtent = new Extent({
            //                             xmin: westernPoint.x,
            //                             xmax: easternPoint.x,
            //                             ymin: westernPoint.y > easternPoint.y ? easternPoint.y : westernPoint.y,
            //                             ymax: westernPoint.y > easternPoint.y ? westernPoint.y : easternPoint.y,
            //                             spatialReference: new SpatialReference({
            //                                 wkid: 3857
            //                             })
            //                         });
            //                         var zoomHandle = roundView.goTo({
            //                             target: targetExtent,
            //                             tilt: 60,
            //                             heading: (Math.atan2(easternPoint.x - westernPoint.x, easternPoint.y - westernPoint.y) * 180 / Math.PI) - 90,
            //                             scale: distance
            //                         }, {
            //                                 animate: true,
            //                                 easing: 'linear'
            //                             });
            //                     }
            //                 }
            //                 else {
            //                     var zoomHandle = roundView.goTo(matchedDataFeatures);
            //                 }
            //                 zoomHandle.then(function () {
            //                     console.log('Zoom complete: ' + (performance.now() - t0) + " milliseconds.");
            //                     document.querySelector('.settingsToggleButton').style.backgroundImage = 'url("img/settingsToggleButton.png")';
            //                     if (areaReport.classList.contains('greenButtonToggle')) {
            //                     }
            //                     else {
            //                         //clusterGridDiv.style.display = 'none';
            //                         //resultsGridDiv.style.display = 'block';
            //                         clusterGrid.domNode.classList.add('hidden');
            //                         resultsGrid.domNode.classList.remove('hidden');
            //                     }
            //                     areaReport.areaMetricWidget.updateGraphs('zoom end');
            //                 });
            //             } else {
            //                 if (areaReport.areaMetricWidget) {
            //                     areaReport.areaMetricWidget.pauseGraphs(true);
            //                     areaReport.areaMetricWidget.updateGraphs('zoom end');
            //                 }
            //             }
            //             if (matchedMaxCrashCount > 0) {
            //                 var renderHeight = 500 * (serverData.data.maxMP - serverData.data.minMP > 0 ? serverData.data.maxMP - serverData.data.minMP : 1) + Math.random();
            //             }
            //             else {
            //                 var renderHeight = 0;
            //             }
            //             sriOverlayLayer.renderer = new SimpleRenderer({
            //                 crashCount: matchedMaxCrashCount,
            //                 symbol: new PolygonSymbol3D({
            //                     symbolLayers: [new ExtrudeSymbol3DLayer()],
            //                     edges: {
            //                         type: 'solid',
            //                         color: [0, 0, 0, 0.6],
            //                         size: 1.5
            //                     }
            //                 }),
            //                 visualVariables: [
            //                     {
            //                         type: "size",
            //                         field: "CrashCount",
            //                         stops: [
            //                             { value: 0, size: 0 },
            //                             { value: matchedMaxCrashCount, size: renderHeight }
            //                         ]
            //                     }, {
            //                         type: "color",
            //                         field: "CrashCount",
            //                         stops: [
            //                             { value: 0, color: "#00ff00" },
            //                             { value: matchedMaxCrashCount, color: "#ff0000" }
            //                         ]
            //                     }
            //                 ]
            //             });
            //             console.log('Renderer Applied: ' + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //             if (loadSpinner) {
            //                 if (loadSpinner.classList) {
            //                     if (loadSpinner.classList.length > 0) {
            //                         loadSpinner.classList.remove('crashFilterWorking');
            //                         loadSpinner.classList.remove('working');
            //                     }
            //                     else {
            //                         domConstruct.destroy(loadSpinner);
            //                     }
            //                 }
            //                 else if (loadSpinner.domNode) {
            //                     var workingElements = loadSpinner.domNode.querySelectorAll('.working');
            //                     workingElements.forEach(function (node) {
            //                         node.classList.remove('working');
            //                     });
            //                 }
            //                 else {
            //                     domConstruct.destroy(loadSpinner);
            //                 }
            //             }
            //             // sort MP data to be increasing order
            //             resultsGrid.refresh();
            //             resultsGrid.renderArray(crashData); // render SRI data into table and display in Results Grid
            //             // display crash count in Results Grid
            //             crashCountDiv.style.visibility = 'visible';
            //             crashCountDiv.innerHTML = 'Crash Count: ' + crashCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //             columnChooser.classList.remove('disabled');
            //             reportOne.classList.remove('disabled');
            //             if (domStyle.get('resultsDiv', 'opacity') === '0') {
            //                 var obj = domGeom.position('resultsDiv');
            //                 if (areaReport.classList.contains('greenButtonToggle')) {
            //                     fx.animateProperty({
            //                         node: 'resultsDiv',
            //                         properties: {
            //                             opacity: 1,
            //                             height: 364
            //                         },
            //                         onEnd: function () {
            //                             var windowHeight = win.getBox().h;
            //                             var resultsHeight = resultsDiv.offsetHeight;
            //                             var elements = document.getElementsByClassName('esri-attribution');
            //                             for (var i = 0; i < elements.length; i++) { elements[i].style.bottom = (resultsHeight) + 'px'; }
            //                             domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
            //                             if (typeof areaReport.areaMetricWidget === 'undefined') {
            //                                 areaReport.areaMetricWidget = new areaTemporalMetricDialog(areaGraphDiv);
            //                             }
            //                             else {
            //                                 areaReport.areaMetricWidget.domNode.style.display = 'block';
            //                                 //areaReport.areaMetricWidget.updateGraphs('widget creation');
            //                             }
            //                             resultsButton.classList.remove('orangeButtonToggle')
            //                             resultsButton.classList.remove('whiteButtonToggle')
            //                             resultsButton.classList.add('greenButtonToggle')
            //                             if (JSON.parse(localStorage.getObject('userGuidance')) || localStorage.getObject('userGuidance') === null) {
            //                                 additionalHints.init();
            //                                 additionalHints.restart();
            //                             }
            //                         }
            //                     }).play();
            //                     fx.animateProperty({
            //                         node: 'resultsButton',
            //                         properties: {
            //                             bottom: 350 - (domGeom.position('resultsButton').y - obj.y + domGeom.position('resultsButton').h)
            //                         }
            //                     }).play();
            //                 }
            //                 else {
            //                     fx.animateProperty({
            //                         node: 'resultsDiv',
            //                         properties: {
            //                             opacity: 1,
            //                             height: 310
            //                         },
            //                         onEnd: function () {
            //                             var windowHeight = win.getBox().h;
            //                             var resultsHeight = resultsDiv.offsetHeight;
            //                             var elements = document.getElementsByClassName('esri-attribution');
            //                             resultsButton.classList.remove('orangeButtonToggle')
            //                             resultsButton.classList.remove('whiteButtonToggle')
            //                             resultsButton.classList.add('greenButtonToggle')
            //                             domStyle.set(filtersDivBorder, 'height', (windowHeight - resultsHeight) + 'px');
            //                             if (JSON.parse(localStorage.getObject('userGuidance')) || localStorage.getObject('userGuidance') === null) {
            //                                 additionalHints.init();
            //                                 additionalHints.restart();
            //                             }
            //                             for (var i = 0; i < elements.length; i++) {
            //                                 elements[i].style.bottom = (resultsHeight) + 'px';
            //                             }
            //                         }
            //                     }).play();
            //                     fx.animateProperty({
            //                         node: 'resultsButton',
            //                         properties: {
            //                             bottom: 297 - (domGeom.position('resultsButton').y - obj.y + domGeom.position('resultsButton').h)
            //                         }
            //                     }).play();
            //                 }
            //             }
            //             else {
            //                 if (typeof areaReport.areaMetricWidget === 'undefined') {
            //                     areaReport.areaMetricWidget = new areaTemporalMetricDialog(areaGraphDiv);
            //                 }
            //                 else {
            //                     areaReport.areaMetricWidget.domNode.style.display = 'block';
            //                     //areaReport.areaMetricWidget.updateGraphs('omni box click SRI');
            //                 }
            //             }
            //             query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
            //             if (domStyle.get('filtersDiv', 'display') === 'none') {
            //                 domStyle.set('filtersDiv', 'display', 'block');
            //                 fx.animateProperty({
            //                     node: 'filtersDiv',
            //                     properties: {
            //                         opacity: 1
            //                     },
            //                     onEnd: function () {
            //                         domStyle.set('resultsDiv', 'width', (domStyle.get('resultsDiv', 'width') - 60) + 'px');
            //                         domStyle.set('filterSummary', 'max-width', (domStyle.get('resultsDiv', 'width') - domStyle.get('crashCountSummary', 'width') - 113) + 'px');
            //                         var elements = document.getElementsByClassName('esri-attribution');
            //                         for (var i = 0; i < elements.length; i++) {
            //                             elements[i].style.width = (domStyle.get('resultsDiv', 'width')) + 'px';
            //                         }
            //                         if (showLocationFilterWidget) {
            //                             query('.crashfilterflyout').style("display", "none");
            //                             domStyle.set(locationFilterWidget.parent.flyout.id, {
            //                                 display: 'block',
            //                                 top: getPosition(document.getElementById(locationFilterWidget.parent.toggleIcon)).y + 'px'
            //                             });
            //                         }
            //                     }
            //                 }).play();
            //             }
            //             else {
            //                 if (showLocationFilterWidget) {
            //                     query('.crashfilterflyout').style("display", "none");
            //                     domStyle.set(locationFilterWidget.parent.flyout.id, {
            //                         display: 'block',
            //                         top: getPosition(document.getElementById(locationFilterWidget.parent.toggleIcon)).y + 'px'
            //                     });
            //                 }
            //             }
            //         }
            //         function queryDataSources() {
            //             console.log('Begin Querying All Data Sources: ' + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //             var omniData = {};
            //             if (updateData.sriWithMP) {
            //                 for (var routeDetail in updateData.sriWithMP) {
            //                     if (updateData.sriWithMP.hasOwnProperty(routeDetail)) {
            //                         omniData[routeDetail] = updateData.sriWithMP[routeDetail];
            //                     }
            //                 }
            //             }
            //             else {
            //                 omniData[updateData.ResultType] = updateData.ResultID;
            //             }
            //             omniData['QueryType'] = updateData.ResultType;
            //             var filter = new FilterConstructor(omniData);
            //             if (filter.content.mun_mu) {
            //                 var codesSubmitted = filter.content.mun_mu.split(',');
            //                 codesSubmitted.forEach(replaceDashes);
            //                 filter.content.mun_mu = codesSubmitted.toString();
            //             }
            //             requestScheduler.LastRequest = filter.content;
            //             crashData = []; // delete previous sri grid data on new search
            //             all([
            //                 esriRequest(crashCountsURL, { query: filter.content }),
            //                 sriOverlayLayer.layerView.queryFeatures(),
            //                 unmatchedDataLayer.layerView.queryFeatures()
            //             ]).then(function (response) {
            //                 if (requestScheduler.isLastRequest(response[0].requestOptions.query)) {
            //                     renderDataToMap(response);
            //                 }
            //             }, function (error) {
            //                 if (loadSpinner) {
            //                     if (loadSpinner.classList) {
            //                         if (loadSpinner.classList.length > 0) {
            //                             loadSpinner.classList.remove('crashFilterWorking');
            //                             loadSpinner.classList.remove('working');
            //                         }
            //                         else if (loadSpinner.domNode) {
            //                             var workingElements = loadSpinner.domNode.querySelectorAll('.working');
            //                             workingElements.forEach(function (node) {
            //                                 node.classList.remove('working');
            //                             });
            //                         }
            //                         else {
            //                             domConstruct.destroy(loadSpinner);
            //                         }
            //                     }
            //                     else {
            //                         domConstruct.destroy(loadSpinner);
            //                     }
            //                 }
            //                 errorHandler(error);
            //             });
            //         }
            //         function definitionUpdate(updateData) {
            //             console.log('Definition Update Applied: ' + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //             if (updateData.definitionExpression) {
            //                 if (sriOverlayLayer.definitionExpression === updateData.definitionExpression) {
            //                     if (unmatchedDataLayer.definitionExpression === 'SRI = \'' + updateData.ResultID + '\'') {
            //                         return false;
            //                     }
            //                     else {
            //                         unmatchedDataLayer.definitionExpression = 'SRI = \'' + updateData.ResultID + '\'';
            //                         return true;
            //                     }
            //                 }
            //                 else {
            //                     if (unmatchedDataLayer.definitionExpression === 'SRI = \'' + updateData.ResultID + '\'') {
            //                         sriOverlayLayer.definitionExpression = updateData.definitionExpression;
            //                         return true;
            //                     }
            //                     else {
            //                         sriOverlayLayer.definitionExpression = updateData.definitionExpression;
            //                         unmatchedDataLayer.definitionExpression = 'SRI = \'' + updateData.ResultID + '\'';
            //                         return true;
            //                     }
            //                 }
            //             }
            //             else {
            //                 sriOverlayLayer.definitionExpression = 'SRI = \'' + updateData.ResultID + '\'';
            //                 unmatchedDataLayer.definitionExpression = 'SRI = \'' + updateData.ResultID + '\'';
            //                 return true;
            //             }
            //         }
            //         function proceedWithUpdate(wait) {
            //             all([
            //                 sriOverlayLayer.queryFeatureCount(),
            //                 sriOverlayLayer.layerView.queryFeatureCount(),
            //                 unmatchedDataLayer.queryFeatureCount(),
            //                 unmatchedDataLayer.layerView.queryFeatureCount(),
            //             ]).then(function (results) {
            //                 // console.log('features counted')
            //                 if (results[0] === results[1] && results[2] === results[3]) {
            //                     console.log('All Feature Counts Returned: ' + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //                     checkLayerViews();
            //                 }
            //                 else {
            //                     setTimeout(function () {
            //                         proceedWithUpdate(wait);
            //                     }, wait);
            //                 }
            //             });
            //         }
            //         function checkLayerViews() {
            //             if (sriOverlayLayer.layerView.updating) {
            //                 var sriOverlayLayerHandle = sriOverlayLayer.layerView.watch('updating', function (sriUpdating) {
            //                     if (sriUpdating === false) {
            //                         sriOverlayLayerHandle.remove();
            //                         if (unmatchedDataLayer.layerView.updating) {
            //                             var unmatchedDataLayerHandle = unmatchedDataLayer.layerView.watch('updating', function (unmatchedUpdating) {
            //                                 if (unmatchedUpdating === false) {
            //                                     unmatchedDataLayerHandle.remove();
            //                                     console.log('Check Layer Views Update Status: ' + (performance.now() - t0) + " milliseconds."); t0 = performance.now();
            //                                     queryDataSources();
            //                                 }
            //                             });
            //                         }
            //                         else {
            //                             queryDataSources();
            //                         }
            //                     }
            //                 });
            //             }
            //             else {
            //                 if (unmatchedDataLayer.layerView.updating) {
            //                     var unmatchedDataLayerHandle = unmatchedDataLayer.layerView.watch('updating', function (unmatchedUpdating) {
            //                         if (unmatchedUpdating === false) {
            //                             unmatchedDataLayerHandle.remove();
            //                             queryDataSources();
            //                         }
            //                     });
            //                 }
            //                 else {
            //                     queryDataSources();
            //                 }
            //             }
            //         }
            //         domStyle.set(aadtToggleButton, whiteButtonEffect);
            //         domStyle.set(ballBankToggleButton, whiteButtonEffect);
            //         generalMapLayers.findSublayerById(3).visible = false;
            //         generalMapLayers.findSublayerById(2).visible = false;
            //         crashLocationsToggleButton.classList.remove('greenButtonToggle');
            //         crashLocationsToggleButton.classList.add('whiteButtonToggle');
            //         crashPointLayer.visible = false;
            //         dimensionToggleButton.classList.remove('disabled');
            //         dimensionToggleButton.classList.add('greenButtonToggle');
            //         flatViewDiv.classList.add('hideMap');
            //         roundViewDiv.classList.remove('hideMap');
            //         sriOverlayLayer.visible = true;
            //         unmatchedDataLayer.visible = true;
            //         if (definitionUpdate(updateData)) {
            //             proceedWithUpdate(250);
            //         }
            //         else {
            //             queryDataSources();
            //         }
            //     };
            // }, errorHandler);
            // // this is where the overlay with help goes
            // // should be dismissable and permanently dismissable
            // // this can all happen with before and after css elements
            // // they need to have a helpOverlay class so that they can all be turned off
            // // grey out map a little
            // // when disclaimer button is pressed, start the tour
            // // must clear cookies to restart tour
            // welcomeTour.init();
            // welcomeTour.start();
            // dataUpdateDialog.handleUpdatesBox();
            //flatView.ui.add(legend, 'manual');



            // Add widget to the top right corner of the view
        }

        var defaultFilterValues = {
            "f": "json",
            "mun_mu": "",
            "year": "",
            "acc_month": "",
            "acc_dow": "",
            "date_range": "",
            "svrty_code": "",
            "alchl_invlvd_code": "",
            "hzmt_invlvd_code": "",
            "tr1_vhcls_invlvd_qty": "",
            "crash_type_code": "",
            "drctn_code": "",
            "rd_cndtn_code": "",
            "physcl_cndtn_code": "",
            "physcl_stts_code": "",
            "rd_mdn_type_code": "",
            "ped_type_code": "P",
            "trfc_cntrl_code": "",
            "pre_crash_actn_code": "",
            "vhcl_type_code": "",
            "intl_impct_clckpnt_code": "",
            "prncpl_dmg_clckpnt_code": "",
            "crg_body_type_code": "",
            "spcl_fnctn_code": "",
            "injry_loc_code": "",
            "sfty_eqpmnt_code": "",
            "envrnmntl_cndtn_code": "",
            "injry_type_code": "",
            "lght_cndtn_code": "",
            "arbg_dplymnt_type_code": "",
            "rd_chrctrstc_code": "",
            "vhcl_use_code": "",
            "rd_srfc_type_code": "",
            "trfc_vlm_code": "",
            "dprtmnt_type_code": "",
            "ejctn_type_code": "",
            "ramp_drctn_code": "",
            "off_rd_code": "",
            "sbrty_test_type_code": ""
        };
        loadUIElements(defaultFilterValues);
        //
        // // Create and display the Disclaimer and data updates on startup
        // flatView.when(function () {
        //     var disclaimerDialog = new Dialog({
        //         title: "NJDOT Disclaimer Information",
        //         style: "width: 600px; font-size: small;",
        //         closable: true,
        //         onHide: function () {
        //             disclaimerDialog.destroy();
        //         }
        //     });
        //     var disclaimerDialogContent = domConstruct.create('div', {
        //         className: 'disclaimerContent',
        //         innerHTML: 'Welcome to Safety Voyager!<br><br>The New Jersey Department of Transportation makes no guarantees as to the accuracy or content of information and is not responsible for the results of any defects or misinformation that may be found to exist, or for lost profits or consequential damages which may result from such defects or misinformation.   <br><br>You should not assume that this web site is error free or that it will be suitable for the particular purpose that you have in mind when using it.<br><br>This site contains references to other sites and information worldwide throughout the Internet.   We have no control over such sites and information, and make no guarantees as to the accuracy, currency, content, or quality of any such site or information.   Any unauthorized attempt to upload information or change information on this web site is prohibited.   All attempts will be investigated and/or reported to the appropriate law enforcement agency.   The use and/or dissemination of the information contained herein is at your own risk.<br><br>If there is a question regarding the information provided or if you need verification of an item contained in the site, please address all inquiries to the New Jersey Department of Transportation.<br><br>',
        //     }, disclaimerDialog.containerNode);
        //     var disclaimerDialogDismissButton = domConstruct.create('button', {
        //         className: 'disclaimerButton',
        //         innerHTML: 'I have read and understood the terms of the disclosure statement.',
        //         onclick: function (event) {
        //             disclaimerDialog.destroy();
        //             var defaultFilterValues;
        //             var defaultFilterKey = 'voyagerDefaultFilter';
        //             if (supports_local_storage()) {
        //                 // read from local storage
        //                 defaultFilterValues = window.localStorage.getItem(defaultFilterKey);
        //             }
        //             else {
        //                 // read from a cookie
        //                 defaultFilterValues = cookie(defaultFilterKey);
        //             }
        //             defaultFilterValues = {
        //                 "f": "json",
        //                 "mun_mu": "",
        //                 "year": "",
        //                 "acc_month": "",
        //                 "acc_dow": "",
        //                 "date_range": "",
        //                 "svrty_code": "",
        //                 "alchl_invlvd_code": "",
        //                 "hzmt_invlvd_code": "",
        //                 "tr1_vhcls_invlvd_qty": "",
        //                 "crash_type_code": "",
        //                 "drctn_code": "",
        //                 "rd_cndtn_code": "",
        //                 "physcl_cndtn_code": "",
        //                 "physcl_stts_code": "",
        //                 "rd_mdn_type_code": "",
        //                 "ped_type_code": "P",
        //                 "trfc_cntrl_code": "",
        //                 "pre_crash_actn_code": "",
        //                 "vhcl_type_code": "",
        //                 "intl_impct_clckpnt_code": "",
        //                 "prncpl_dmg_clckpnt_code": "",
        //                 "crg_body_type_code": "",
        //                 "spcl_fnctn_code": "",
        //                 "injry_loc_code": "",
        //                 "sfty_eqpmnt_code": "",
        //                 "envrnmntl_cndtn_code": "",
        //                 "injry_type_code": "",
        //                 "lght_cndtn_code": "",
        //                 "arbg_dplymnt_type_code": "",
        //                 "rd_chrctrstc_code": "",
        //                 "vhcl_use_code": "",
        //                 "rd_srfc_type_code": "",
        //                 "trfc_vlm_code": "",
        //                 "dprtmnt_type_code": "",
        //                 "ejctn_type_code": "",
        //                 "ramp_drctn_code": "",
        //                 "off_rd_code": "",
        //                 "sbrty_test_type_code": ""
        //             };
        //             loadUIElements(defaultFilterValues);
        //         }
        //     }, disclaimerDialog.containerNode);
        //     loadCredentials();
        //     //disclaimerDialog.show();
        // });
        // flatView.popup.featureNavigationEnabled = false;
        // flatView.popup.on('trigger-action', function (event) {
        //     var selectedFeature = event.target.selectedFeature;
        //     if (event.action.id === 'getCrashBreakdown') {
        //         var filter = new FilterConstructor(selectedFeature.attributes);
        //         if (filter.content.mun_mu) {
        //             var codesSubmitted = filter.content.mun_mu.split(',');
        //             codesSubmitted.forEach(replaceDashes);
        //             filter.content.mun_mu = codesSubmitted.toString();
        //         }
        //
        //         //var filter = {
        //         //    'User': esriId.credentials[0].userId,
        //         //    'ClusterType': MP,
        //         //    'CrashIDArray': MP
        //         //}
        //
        //         //esriRequest(clusterDetailURL, { query: filter.content }).then(function (response) {
        //         esriRequest(clusterDetailURL, { query: selectedFeature.attributes }).then(function (response) {
        //             crashGroupingWidget(false, false, response.data)
        //         }, errorHandler);
        //     } else if (event.action.id === 'getCrashList') {
        //         if (selectedFeature.attributes.MP) {
        //             crashGroupingWidget(selectedFeature.attributes.SRI, selectedFeature.attributes.MP);
        //         }
        //         else {
        //             crashGroupingWidget(selectedFeature.attributes.SRI, 'MUNI:' + selectedFeature.attributes.MUN_CODE);
        //         }
        //     } else if (event.action.id === 'loadStreetView') {
        //         var locationAttributes = selectedFeature.attributes;
        //         var pointLatLong = webMercatorUtils.xyToLngLat(locationAttributes.X, locationAttributes.Y);
        //         window.open("https://maps.google.com/maps?q=&layer=c&cbll=" + pointLatLong[1] + "," + pointLatLong[0]);
        //     }
        // });
        // roundView.when(function () {
        //     roundView.ui.remove("compass");
        //
        // })
        // roundView.popup.on('trigger-action', function (event) {
        //     var selectedFeature = event.target.selectedFeature;
        //     if (event.action.id === 'getCrashBreakdown') {
        //         //var filter = new FilterConstructor(selectedFeature.attributes);
        //         //esriRequest(clusterDetailURL, { query: filter.content }).then(function (response) {
        //         esriRequest(clusterDetailURL, { query: selectedFeature.attributes }).then(function (response) {
        //             crashGroupingWidget(false, false, response.data)
        //         }, errorHandler);
        //     } else if (event.action.id === 'getCrashList') {
        //         if (selectedFeature.attributes.MP || selectedFeature.attributes.MP === 0) {
        //             crashGroupingWidget(selectedFeature.attributes.SRI, selectedFeature.attributes.MP);
        //         }
        //         else {
        //             crashGroupingWidget(selectedFeature.attributes.SRI, 'MUNI:' + selectedFeature.attributes.MUN_CODE);
        //         }
        //     }
        // });
        // // === Grid Events ===
        // // enable County or Municipality to be clicked on the Cluster Grid. Will zoom into the respective area and highlight the border.
        // clusterGrid.on('.dgrid-cell:dblclick', function (event) {
        //     var filterClearWidget;
        //     function findSelectAll(filterTreeRoot, fieldName, value) {
        //         if (filterTreeRoot.menus && filterTreeRoot.menus.length > 0) {
        //             for (var i = 0; i < filterTreeRoot.menus.length; i++) {
        //                 var menu = filterTreeRoot.menus[i];
        //                 if (menu.parentFieldName === fieldName) {
        //                     if (menu.code === value) {
        //                         var widget = menu.widgets[0].widget;
        //                         widget.selectEntireTable(false);
        //                     }
        //                 }
        //                 if (menu.menus) {
        //                     findSelectAll(menu, fieldName, value);
        //                 }
        //             }
        //         }
        //     };
        //     if (crashLocationsToggleButton.classList.contains("greenButtonToggle")) {
        //         flashParcelsGraphicLayer.removeAll();
        //         var row = clusterGrid.row(event);
        //         var rowData = row.data;
        //         var locationData = new FilterConstructor(rowData);
        //         if (rowData.ClusterType === 'County') {
        //             crashData = [];
        //             var countyQueryTask = new QueryTask({ url: countyLayerURL });
        //             var countyQuery = new superQuery();
        //             filterClearWidget = filterStructure.menus[filterStructure.menus.length - 1].widgets[0].widget
        //             domClass.remove(crashLocationsToggleButton, 'whiteButtonToggle');
        //             domClass.add(crashLocationsToggleButton, 'greenButtonToggle');
        //             crashPointLayer.visible = true;
        //             countyQuery.returnGeometry = true;
        //             countyQuery.outFields = ["*"];
        //             countyQuery.where = 'county = \'' + rowData.Name + '\'';
        //             countyQueryTask.execute(countyQuery).then(function (results) {
        //                 query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
        //                 var polygon = new Polygon(results.features[0].geometry);
        //                 var fillSymbol = new SimpleFillSymbol({
        //                     style: 'none',
        //                     outline: new SimpleLineSymbol({
        //                         color: 'blue',
        //                         width: 3
        //                     })
        //                 });
        //                 var polygonGraphic = new Graphic({
        //                     geometry: polygon,
        //                     symbol: fillSymbol
        //                 });
        //                 flashParcelsGraphicLayer.add(polygonGraphic);
        //                 flatView.goTo(polygonGraphic)
        //             }, errorHandler);
        //             searchOmniInput.value = rowData.Name;
        //         }
        //         else if (rowData.ClusterType === 'Municipality') {
        //             flashParcelsGraphicLayer.removeAll();
        //             crashData = [];
        //             var queryTask = new QueryTask({ url: cityLayerURL });
        //             var munQuery = new superQuery();
        //             filterClearWidget = filterStructure.menus[filterStructure.menus.length - 1].widgets[0].widget;
        //             domClass.remove(crashLocationsToggleButton, 'whiteButtonToggle');
        //             domClass.add(crashLocationsToggleButton, 'greenButtonToggle');
        //             crashPointLayer.visible = true;
        //             munQuery.returnGeometry = true;
        //             munQuery.outFields = ["*"];
        //             munQuery.where = 'MUN = \'' + rowData.Name + '\'';
        //             queryTask.execute(munQuery).then(function (results) {
        //                 query('.searchHanger').forEach(function (node) { domClass.add(node, 'hidden') });
        //                 var polygon = new Polygon(results.features[0].geometry);
        //                 var fillSymbol = new SimpleFillSymbol({
        //                     style: 'none',
        //                     outline: new SimpleLineSymbol({
        //                         color: 'blue',
        //                         width: 3
        //                     })
        //                 });
        //                 var polygonGraphic = new Graphic({
        //                     geometry: polygon,
        //                     symbol: fillSymbol
        //                 });
        //                 flashParcelsGraphicLayer.add(polygonGraphic);
        //                 flatView.goTo(polygonGraphic)
        //             }, errorHandler);
        //             searchOmniInput.value = rowData.Name;
        //         }
        //         else {
        //             //esriRequest(clusterDetailURL, { query: locationData.content }).then(function (response) {
        //             esriRequest(clusterDetailURL, { query: rowData }).then(function (response) {
        //                 crashGroupingWidget(false, false, response.data);
        //             }, errorHandler);
        //         }
        //     }
        // });
        // clusterGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.enter), function (event) {
        //     if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
        //         var cell = clusterGrid.cell(event);
        //         var point = cell.row.data.geometry.clone();
        //         var markerSymbol = new SimpleMarkerSymbol({
        //             size: 25,
        //             outline: { // autocasts as new SimpleLineSymbol()
        //                 color: [0, 0, 0],
        //                 width: 2
        //             }
        //         });
        //         point.symbol = markerSymbol;
        //         domStyle.set(clusterGrid.row(event).element, 'font-weight', 'bold')
        //         domStyle.set(clusterGrid.row(event).element, 'background-color', 'lightgrey')
        //         flashParcelsGraphicLayer.add(point);
        //     }
        // });
        // clusterGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.leave), function (event) {
        //     if (crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
        //         domStyle.set(clusterGrid.row(event).element, 'font-weight', 'normal')
        //         domStyle.set(clusterGrid.row(event).element, 'background-color', 'white')
        //         flashParcelsGraphicLayer.removeAll();
        //     }
        // });
        // // results grid initialization
        // for (var columnName in resultsGrid.columns) { // set initial columns for results grid
        //     if (resultsGrid.columns.hasOwnProperty(columnName)) {
        //         var column = resultsGrid.columns[columnName]
        //         if (column.hidden) { resultsGrid.styleColumn(column.id, 'display: none') }
        //         else { resultsGrid.styleColumn(column.id, 'display: table-cell;') }
        //     }
        // }
        // resultsGrid.on('.dgrid-cell:dblclick', function (event) {
        //     if (!crashLocationsToggleButton.classList.contains("greenButtonToggle")) {
        //         var cell = resultsGrid.cell(event);
        //         if (cell.row.data.MP.indexOf('No MP') > -1) { // the municipal buffer shapes are not in the sriOverlayLayer
        //             unmatchedDataLayer.layerView.queryFeatures({
        //                 objectIds: [cell.row.data.OBJECTID]
        //             }).then(function (mapElement) {
        //                 var widget = crashGroupingWidget(cell.row.data.SRI, 'MUNI:' + cell.row.data.MUN_CODE)
        //                 roundView.goTo({
        //                     center: mapElement[0].geometry.centroid,
        //                     zoom: 15
        //                 });
        //             });
        //         }
        //         else {
        //             sriOverlayLayer.layerView.queryFeatures({
        //                 objectIds: [cell.row.data.OBJECTID]
        //             }).then(function (mapElement) {
        //                 var widget = crashGroupingWidget(cell.row.data.SRI, cell.row.data.MP)
        //                 roundView.goTo({
        //                     center: mapElement[0].geometry.centroid,
        //                     zoom: 15
        //                 });
        //             });
        //         }
        //     }
        // });
        // resultsGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.enter), function (event) {
        //     if (!crashLocationsToggleButton.classList.contains('greenButtonToggle')) {
        //         var cell = resultsGrid.cell(event);
        //         if (cell.row.data.MP.indexOf('No MP') > -1) { // the municipal buffer shapes are not in the sriOverlayLayer
        //             if (unmatchedDataLayer.layerView) {
        //                 unmatchedDataLayer.layerView.queryFeatures({
        //                     objectIds: [cell.row.data.OBJECTID]
        //                 }).then(function (mapElement) {
        //                     var geometry = mapElement[0].geometry;
        //                     var symbol = new PolygonSymbol3D({
        //                         symbolLayers: [new ExtrudeSymbol3DLayer({
        //                             size: sriOverlayLayer.elevationInfo.offset,
        //                             material: { color: 'darkgrey' },
        //                         })]
        //                     });
        //                     var fillSymbol = new SimpleFillSymbol({
        //                         color: new dojo.Color([255, 255, 0]),
        //                         outline: new SimpleLineSymbol({
        //                             color: new dojo.Color([0, 0, 0]),
        //                             width: 5
        //                         })
        //                     });
        //                     var dddFlashPolygon = new Graphic({ // for the 3d crash bars
        //                         geometry: geometry,
        //                         symbol: symbol
        //                     });
        //                     var polygonGraphic = new Graphic({
        //                         geometry: geometry,
        //                         symbol: fillSymbol
        //                     });
        //                     domStyle.set(resultsGrid.row(event).element, 'font-weight', 'bold')
        //                     domStyle.set(resultsGrid.row(event).element, 'background-color', 'lightgrey')
        //                     flashParcelsGraphicLayer.add(dddFlashPolygon);
        //                     flashParcelsGraphicLayer.add(polygonGraphic);
        //                 });
        //             }
        //         }
        //         else {
        //             if (sriOverlayLayer.layerView) {
        //                 sriOverlayLayer.layerView.queryFeatures({
        //                     objectIds: [cell.row.data.OBJECTID]
        //                 }).then(function (mapElement) {
        //                     var geometry = mapElement[0].geometry;
        //                     var routeData = searchOmniBox.locationFilterWidget.extentSelector;
        //                     var matchedMaxCrashCount = sriOverlayLayer.renderer.crashCount;
        //                     var currentCrashCount = cell.row.data.CrashCount;
        //                     var renderHeight = 500 * (routeData.maxMileInput.value - routeData.minMileInput.value > 0 ? routeData.maxMileInput.value - routeData.minMileInput.value : 1);
        //                     var size = (currentCrashCount / matchedMaxCrashCount) * renderHeight;
        //                     var symbol = new PolygonSymbol3D({
        //                         symbolLayers: [new ExtrudeSymbol3DLayer({
        //                             size: size + sriOverlayLayer.elevationInfo.offset,
        //                             material: { color: 'lightblue' },
        //                         })]
        //                     });
        //                     var fillSymbol = new SimpleFillSymbol({
        //                         color: new dojo.Color([255, 255, 0]),
        //                         outline: new SimpleLineSymbol({
        //                             color: new dojo.Color([0, 0, 0]),
        //                             width: 5
        //                         })
        //                     });
        //                     var dddFlashPolygon = new Graphic({ // for the 3d crash bars
        //                         geometry: mapElement[0].geometry,
        //                         symbol: symbol
        //                     });
        //                     var polygonGraphic = new Graphic({
        //                         geometry: mapElement[0].geometry,
        //                         symbol: fillSymbol
        //                     });
        //                     domStyle.set(resultsGrid.row(event).element, 'font-weight', 'bold')
        //                     domStyle.set(resultsGrid.row(event).element, 'background-color', 'lightgrey')
        //                     flashParcelsGraphicLayer.add(dddFlashPolygon);
        //                     flashParcelsGraphicLayer.add(polygonGraphic);
        //                 }, errorHandler);
        //             }
        //         }
        //     }
        // });
        // resultsGrid.on(on.selector('.dgrid-content .dgrid-cell', mouse.leave), function (event) {
        //     if (!crashLocationsToggleButton.classList.contains("greenButtonToggle")) {
        //         try {
        //             var cell = resultsGrid.cell(event);
        //             domStyle.set(resultsGrid.row(event).element, 'font-weight', 'normal')
        //             domStyle.set(resultsGrid.row(event).element, 'background-color', 'white')
        //         }
        //         catch (err) { }
        //         flashParcelsGraphicLayer.removeAll();
        //     }
        // });
    });
