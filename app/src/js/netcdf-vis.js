

var activeHeightLayer=null//used for click event
// Load Leaflet map
function initDemoMap() {
    

    // set map bounds
    // var corner1 = L.latLng(49.5, 8.0),
    //     corner2 = L.latLng(50.5, 9.0),
    //     //bounds = L.latLngBounds(corner1, corner2);

    var map = L.map('map', {
        center: [49.99286, 8.24725],
        zoom: 18,
        minZoom: 12,
        maxZoom: 20,
        
        timeDimension: true,
        timeDimensionOptions: {
            timeInterval: "2018-07-06T05:00Z/PT30H",//hours minus 1
            period: "PT1H"
        },
        timeDimensionControl: true,

        //maxBounds: bounds,
        //maxBoundsViscosity: 1,
        // timeDimensionWmsTimeInterval: true,
        // timeDimensionControlWmsTimeInterval: true,
    });

    var baseLayers = getCommonBaseLayers(map); //from baselayers js
    L.control.scale().addTo(map)
    map.setView([49.99286, 8.24725], 1);//needs to be done autmatically
    //map.setView([7.8,53.4], 1)
    var WMS_URL = "http://localhost:8080/geoserver/wms?"; //dynamic date

    var TSurfLayer = L.tileLayer.betterWms(WMS_URL, { //dynamic tilelayers
        layers: 'netcdf:TSurf',
        format: 'image/png', //image/vnd.jpeg-png',
        //angle: 58.0,
        transparent: true,
    });

    var AlbedoLayer = L.tileLayer.betterWms(WMS_URL, {
        layers: 'netcdf:Albedo',
        format: 'image/png',
        transparent: true,
    });
    var timeOptions ={updateTimeDimension: true}
    var TSurfTimeLayer = L.timeDimension.layer.wms(TSurfLayer,timeOptions)

    var AlbedoTimeLayer = L.timeDimension.layer.wms(AlbedoLayer,timeOptions)


    var fakeLayer=L.marker([0,0])
    var groupedOverlays = {
        "Climate Elements": {
            "Surface Temperature": TSurfLayer,
            "Albedo": AlbedoLayer,
            "T": fakeLayer
        }
    };
    var options = {
        // Make the "Landmarks" group exclusive (use radio inputs)
        exclusiveGroups: ["Climate Elements","Heights"],
        // Show a checkbox next to non-exclusive group labels for toggling all
        groupCheckboxes: true,
        collapsed: false
    };
    var BasicControl =L.control.groupedLayers(baseLayers, groupedOverlays,options).addTo(map);

    //Height Layers
    var T_0_3Layer = L.tileLayer.betterWms(WMS_URL, { //dynamic tilelayers
        layers: 'netcdf:T_0_3',
        format: 'image/png',
        transparent: true,
    });

    var T_40_5Layer = L.tileLayer.betterWms(WMS_URL, {
        layers: 'netcdf:T_40_5',
        format: 'image/png',
        transparent: true,
    });


    var T_0_3TimeLayer = L.timeDimension.layer.wms(T_0_3Layer,timeOptions)
    var T_40_5TimeLayer = L.timeDimension.layer.wms(T_40_5Layer,timeOptions)

    var WindSpd_0_3TimeLayer = L.timeDimension.layer.wms(T_0_3Layer,timeOptions)
    var WindSpd_40_5TimeLayer = L.timeDimension.layer.wms(T_40_5Layer,timeOptions)

    var heightOverlays = {
        "Heights": {
            "0,3 Meter": L.marker([0,0]),
            "40,5 Meter": L.marker([0,0])
        }
    };



    var HeightControl=L.control.groupedLayers(null, heightOverlays,options);

   // var WindSpdHeightControl=L.control.groupedLayers(null, heightOverlays,options)
    

    let timeLayerMapping = new Map();
    timeLayerMapping.set('Surface Temperature',TSurfTimeLayer);
    timeLayerMapping.set('Albedo',AlbedoTimeLayer);
    timeLayerMapping.set('T-0,3 Meter',T_0_3TimeLayer);
    timeLayerMapping.set('T-40,5 Meter',T_40_5TimeLayer);
    timeLayerMapping.set('WindSpd-0,3 Meter',WindSpd_0_3TimeLayer);
    timeLayerMapping.set('WindSpd-40,5 Meter',WindSpd_40_5TimeLayer);


    map.on('overlayadd', function(eventLayer) {
        if (timeLayerMapping.has(eventLayer.name)){
            timeLayerMapping.get(eventLayer.name).addTo(this);
        }
        else if(timeLayerMapping.has(activeHeightLayer+'-'+eventLayer.name)){ //Height Layers
            timeLayerMapping.get(activeHeightLayer+'-'+eventLayer.name).addTo(this);           
        } 
        else{
            activeHeightLayer=eventLayer.name;
            HeightControl.addTo(this);
        }         


    });

    map.on('overlayremove', function(eventLayer) {
        if (timeLayerMapping.has(eventLayer.name)){
            timeLayerMapping.get(eventLayer.name).removeFrom(map);
        }
        else if(timeLayerMapping.has(activeHeightLayer+'-'+eventLayer.name)){ //Height Layers
            timeLayerMapping.get(activeHeightLayer+'-'+eventLayer.name).removeFrom(map);          
        } 
        else{
            activeHeightLayer=null;
            HeightControl.remove();
        }  

    });

        return {
            map: map,
        };

}


var mapStuff = initDemoMap();
var map = mapStuff.map;
//Changing Default Cursor
$('.leaflet-container').css('cursor','crosshair');


