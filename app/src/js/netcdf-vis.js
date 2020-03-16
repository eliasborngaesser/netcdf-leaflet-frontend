

var activeHeightLayer=null//used for click event
var activeHeight=null
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


    var dummy0_3=L.marker([0,0]);
    var dummy40_5=L.marker([0,0]);
    var TDummy=L.marker([0,0]);
    var WindSpdDummy=L.marker([0,0]);
    var groupedOverlays = {
        "Climate Elements": {
            "Surface Temperature": TSurfLayer,
            "Albedo": AlbedoLayer,
            "T": TDummy,
            "WindSpd": WindSpdDummy,
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
    var WindSpd_0_3Layer = L.tileLayer.betterWms(WMS_URL, { //dynamic tilelayers
        layers: 'netcdf:WindSpd_0_3',
        format: 'image/png',
        transparent: true,
    });

    var WindSpd_40_5Layer = L.tileLayer.betterWms(WMS_URL, {
        layers: 'netcdf:WindSpd_40_5',
        format: 'image/png',
        transparent: true,
    });


    var T_0_3TimeLayer = L.timeDimension.layer.wms(T_0_3Layer,timeOptions)
    var T_40_5TimeLayer = L.timeDimension.layer.wms(T_40_5Layer,timeOptions)

    var WindSpd_0_3TimeLayer = L.timeDimension.layer.wms(WindSpd_0_3Layer,timeOptions)
    var WindSpd_40_5TimeLayer = L.timeDimension.layer.wms(WindSpd_40_5Layer,timeOptions)

    var heightOverlays = {
        "Heights": {
            "0,3 Meter": dummy0_3,
            "40,5 Meter": dummy40_5
        }
    };

    var HeightControl=L.control.groupedLayers(null, heightOverlays,options);

   // var WindSpdHeightControl=L.control.groupedLayers(null, heightOverlays,options)
    

    let Mapping = new Map();
    Mapping.set('Surface Temperature',TSurfTimeLayer);
    Mapping.set('Albedo',AlbedoTimeLayer);
    Mapping.set('T-0,3 Meter',T_0_3TimeLayer);
    Mapping.set('T-40,5 Meter',T_40_5TimeLayer);
    Mapping.set('WindSpd-0,3 Meter',WindSpd_0_3TimeLayer);
    Mapping.set('WindSpd-40,5 Meter',WindSpd_40_5TimeLayer);

    let dummyMapping = new Map();
    dummyMapping.set('0,3 Meter',dummy0_3);
    dummyMapping.set('40,5 Meter',dummy40_5);
    dummyMapping.set('T',TDummy);
    dummyMapping.set('WindSpd',WindSpdDummy);

//Called before Removing other layers
    map.on('overlayadd', function(eventLayer) {
        if (Mapping.has(eventLayer.name)){
            Mapping.get(eventLayer.name).addTo(map);
            map.removeLayer(HeightControl);//Not a heightLayer - therefore disabling Heightcontrol
            HeightControl.remove(); 
        }
        else if(Mapping.has(activeHeightLayer+'-'+eventLayer.name)){ //Height Layers
            Mapping.get(activeHeightLayer+'-'+eventLayer.name).addTo(map);
            activeHeight=eventLayer.name;   
        } 
        else{ //preparing Height Variable
            activeHeightLayer=eventLayer.name;
            HeightControl.addTo(map);
        }         
    });

    map.on('overlayremove', function(eventLayer) {

        if (Mapping.has(eventLayer.name)){ //removing basic layer
            Mapping.get(eventLayer.name).removeFrom(map);
        }
        else if(Mapping.has(activeHeightLayer+'-'+eventLayer.name)){ //removing Height Layers
            Mapping.get(activeHeightLayer+'-'+eventLayer.name).removeFrom(map);        
            activeHeight=null;
        }
        else{ // removing height variable
            Mapping.get(eventLayer.name+'-'+activeHeight).removeFrom(map);//remove last used layer
            dummyMapping.get(activeHeight).removeFrom(map)
            dummyMapping.get(eventLayer.name).removeFrom(map) //remove dummies to reset heightcontrol       
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


