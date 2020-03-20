function initMap() {

    var map = L.map('map', {
        minZoom: 12,
        maxZoom: 18,
        
        timeDimension: true,
        timeDimensionOptions: {
            timeInterval: "2018-07-06T05:00:00Z/PT30H",//hours minus 1
            period: 'PT60M'
        },
        timeDimensionControl: true,

    });
    L.control.scale().addTo(map)
    map.setView(['49.99286', '8.24725'], 15)

    var baseLayers = getCommonBaseLayers(map); //from baselayers js
    var BasicControl =L.control.groupedLayers(baseLayers, groupedOverlays,controlOptions).addTo(map);

    map.on('overlayadd', function(eventLayer) {
        if (layerMapping.has(eventLayer.name)){
            layerMapping.get(eventLayer.name).addTo(map);
            addLegend(map,legendName=eventLayer.name);
            map.removeLayer(HeightControl);//Not a heightLayer - therefore disabling Heightcontrol
            HeightControl.remove(); 
        }
        else if(layerMapping.has(activeHeightLayer+'-'+eventLayer.name)){ //Height Layers
            layerMapping.get(activeHeightLayer+'-'+eventLayer.name).addTo(map);
            addLegend(map,activeHeightLayer+'-'+eventLayer.name);
            activeHeight=eventLayer.name;   
        } 
        else{ //preparing Height Variable
            removeLegend(); //remove basic legend
            activeHeightLayer=eventLayer.name;
            HeightControl.addTo(map);
        }         
    });

    map.on('overlayremove', function(eventLayer) {

        if (layerMapping.has(eventLayer.name)){ //removing basic layer
            layerMapping.get(eventLayer.name).removeFrom(map);
        }
        else if(layerMapping.has(activeHeightLayer+'-'+eventLayer.name)){ //removing Height Layers
            layerMapping.get(activeHeightLayer+'-'+eventLayer.name).removeFrom(map);
        }
        else{ // removing height variable
            if(layerMapping.has(eventLayer.name+'-'+activeHeight)){
                layerMapping.get(eventLayer.name+'-'+activeHeight).removeFrom(map);//remove last used layer (needed beacause activeHeightLayer has already changed)
            }
            if(dummyMapping.has(activeHeight)){
            dummyMapping.get(activeHeight).removeFrom(map)
            activeHeight=null
            }
        }


    });

    return {
        map: map,
    };

}


var mapStuff = initMap();
var map = mapStuff.map;
//Changing Default Cursor
$('.leaflet-container').css('cursor','crosshair');