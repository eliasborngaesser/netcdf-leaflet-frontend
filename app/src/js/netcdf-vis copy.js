//Non Height Layers
var TSurfLayer = L.tileLayer.betterWms(WMS_URL, { //dynamic tilelayers
    layers: 'netcdf:TSurf',
    format: 'image/png',
    transparent: true,
});

var AlbedoLayer = L.tileLayer.betterWms(WMS_URL, {
    layers: 'netcdf:Albedo',
    format: 'image/png',
    transparent: true,
});

//Height Layers
var T_0_3Layer = L.tileLayer.betterWms(WMS_URL, { //dynamic tilelayers
    layers: 'netcdf:T_0_3',
    format: 'image/png',
    transparent: true,
});

var T_1_5Layer = L.tileLayer.betterWms(WMS_URL, {
    layers: 'netcdf:T_1_5',
    format: 'image/png',
    transparent: true,
});
//TimeLayers
var timeOptions ={updateTimeDimension: true}

var T_0_3TimeLayer = L.timeDimension.layer.wms(T_0_3Layer, timeOptions);

var T_1_5LTimeLayer = L.timeDimension.layer.wms(T_1_5Layer, timeOptions);

var TSurfTimeLayer = L.timeDimension.layer.wms(TSurfLayer, timeOptions);

var AlbedoTimeLayer = L.timeDimension.layer.wms(AlbedoLayer, timeOptions);



//Overlays
var fakeLayer=L.marker([0,0])
var groupedOverlays = {
    "Climate Elements": {
        "Surface Temperature": TSurfLayer,
        "Albedo": AlbedoLayer,
        "T": fakeLayer
    }
};
var heightOverlays = {
    "Temperature Heights": {
        "0,3 Meter": T_0_3Layer,
        "1,5 Meter": T_1_5Layer
    }
};

//Use Radio Buttons instead of Checkboxes
var options = {
    // Make the "Landmarks" group exclusive (use radio inputs)
    exclusiveGroups: ["Climate Elements","Temperature Heights"],
    // Show a checkbox next to non-exclusive group labels for toggling all
    groupCheckboxes: true
  };
L.control.groupedLayers(baseLayers, groupedOverlays,options).addTo(map);


var BasicControl =L.control.groupedLayers(baseLayers, groupedOverlays,options).addTo(map);
var HeightControl=L.control.groupedLayers(null, heightOverlays,options)

map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'Surface Temperature') {
        TSurfTimeLayer.addTo(this);
        activeLayer=TSurfTimeLayer
    } else if (eventLayer.name == 'Albedo') {
        AlbedoTimeLayer.addTo(this);
        activeLayer = AlbedoTimeLayer
    } else if (eventLayer.name == '0,3 Meter') {
        T_0_3TimeLayer.addTo(this);
        activeLayer = T_0_3TimeLayer
    } else if (eventLayer.name == '1,5 Meter') {
        T_1_5LTimeLayer.addTo(this);
        activeLayer = T_1_5LTimeLayer  
    } else if (eventLayer.name=='T') {
        HeightControl.addTo(this);
    }
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
});

map.on('overlayremove', function(eventLayer) {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
});

map.on('overlayremove', function(eventLayer) {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
});


