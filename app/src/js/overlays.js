    
var activeHeightLayer=null//refering to actual selected overlay
var activeHeight=null//refering to actual height

var WMS_URL = "http://localhost:8080/geoserver/wms?"; 
var timeOptions = {updateTimeDimension: true}


    var TSurfLayer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:TSurf',
        format: 'image/png', 
        transparent: true,
    });
    var TSurfTimeLayer = L.timeDimension.layer.wms(TSurfLayer,timeOptions)

    var AlbedoLayer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:Albedo',
        format: 'image/png', 
        transparent: true,
    });
    var AlbedoTimeLayer = L.timeDimension.layer.wms(AlbedoLayer,timeOptions)

    var WindSpd_0_3Layer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:WindSpd_0_3',
        format: 'image/png', 
        transparent: true,
    });
    var WindSpd_0_3TimeLayer = L.timeDimension.layer.wms(WindSpd_0_3Layer,timeOptions)

    var WindSpd_10_5Layer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:WindSpd_10_5',
        format: 'image/png', 
        transparent: true,
    });
    var WindSpd_10_5TimeLayer = L.timeDimension.layer.wms(WindSpd_10_5Layer,timeOptions)

    var WindSpd_40_5Layer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:WindSpd_40_5',
        format: 'image/png', 
        transparent: true,
    });
    var WindSpd_40_5TimeLayer = L.timeDimension.layer.wms(WindSpd_40_5Layer,timeOptions)

    var T_0_3Layer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:T_0_3',
        format: 'image/png', 
        transparent: true,
    });
    var T_0_3TimeLayer = L.timeDimension.layer.wms(T_0_3Layer,timeOptions)

    var T_10_5Layer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:T_10_5',
        format: 'image/png', 
        transparent: true,
    });
    var T_10_5TimeLayer = L.timeDimension.layer.wms(T_10_5Layer,timeOptions)

    var T_40_5Layer = L.tileLayer.betterWms(WMS_URL, { 
        layers: 'NetCDF:T_40_5',
        format: 'image/png', 
        transparent: true,
    });
    var T_40_5TimeLayer = L.timeDimension.layer.wms(T_40_5Layer,timeOptions)


//Prepare Controls
var controlOptions = {
        // Make the "Landmarks" group exclusive (use radio inputs)
        exclusiveGroups: ["Climate Elements","Heights"],
        // Show a checkbox next to non-exclusive group labels for toggling all
        groupCheckboxes: true,
        collapsed: false
    };

//BasicControl

var groupedOverlays = {
    "Climate Elements": {
         "Surface Temperature": TSurfLayer,
         "Surface Albedo": AlbedoLayer,
         "Wind Speed": L.marker([0,0]),
         "Potential Air Temperature": L.marker([0,0]),
        
    }
};


//HeightControl
//Those dummys are needed because leaflet control needs layer to be removed and added
//They are only used to reset the HeightControl, but never displayed

 var dummy0_3=L.marker([0,0]); 
 var dummy10_5=L.marker([0,0]); 
 var dummy40_5=L.marker([0,0]); 
 var dummy0_3=L.marker([0,0]); 
 var dummy10_5=L.marker([0,0]); 
 var dummy40_5=L.marker([0,0]); 


var heightOverlays = {
    "Heights": {
         "0.3 Meter": dummy0_3,
         "10.5 Meter": dummy10_5,
         "40.5 Meter": dummy40_5,
         "0.3 Meter": dummy0_3,
         "10.5 Meter": dummy10_5,
         "40.5 Meter": dummy40_5,
        
    }
};
var HeightControl=L.control.groupedLayers(null, heightOverlays,controlOptions);


//Mappings (used for ading and removing layers)

//LayerMapping
let layerMapping = new Map();
 layerMapping.set('Surface Temperature',TSurfTimeLayer);
 layerMapping.set('Surface Albedo',AlbedoTimeLayer);
 layerMapping.set('Wind Speed-0.3 Meter',WindSpd_0_3TimeLayer);
 layerMapping.set('Wind Speed-10.5 Meter',WindSpd_10_5TimeLayer);
 layerMapping.set('Wind Speed-40.5 Meter',WindSpd_40_5TimeLayer);
 layerMapping.set('Potential Air Temperature-0.3 Meter',T_0_3TimeLayer);
 layerMapping.set('Potential Air Temperature-10.5 Meter',T_10_5TimeLayer);
 layerMapping.set('Potential Air Temperature-40.5 Meter',T_40_5TimeLayer);


//DummyMapping
let dummyMapping = new Map();
 dummyMapping.set('0.3 Meter',dummy0_3);
 dummyMapping.set('10.5 Meter',dummy10_5);
 dummyMapping.set('40.5 Meter',dummy40_5);
 dummyMapping.set('0.3 Meter',dummy0_3);
 dummyMapping.set('10.5 Meter',dummy10_5);
 dummyMapping.set('40.5 Meter',dummy40_5);


    