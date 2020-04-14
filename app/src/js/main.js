
var activeLayer=null//refering to actual height
function initMap() {

    var activeOverlay=null//refering to actual selected overlay
    var activeHeight=null//refering to actual height

    var map = L.map('map', {
        minZoom: 12,
        maxZoom: 18,
        
        timeDimension: true,
        timeDimensionOptions: get_timeDimensionOptions(),
        timeDimensionControl: true,

    });

    L.control.scale().addTo(map)
    map.timeDimension.setCurrentTime(0);
    map.setView(get_Location(), 15)


    map.timeDimension.on('timeload', function(data) {
        if (document.getElementById("dynamicStyles").checked)
            addLegend(map,layer=activeLayer);
    });
    var baseLayers = getCommonBaseLayers(map); //from baselayers js
    var BasicControl =L.control.groupedLayers(baseLayers, groupedOverlays,controlOptions).addTo(map);
    L.control.slideMenu(projectHandling).addTo(map);

    map.on('overlayadd', function(eventLayer) {
        if (layerMapping.has(eventLayer.name)){
            activeLayer=eventLayer.name
            layerMapping.get(eventLayer.name).addTo(map);
            addLegend(map,layer=activeLayer);

            map.removeLayer(HeightControl);//Not a heightLayer - therefore disabling Heightcontrol
            HeightControl.remove(); 
        }
        else if(layerMapping.has(activeOverlay+'-'+eventLayer.name)){ //Height Layers
            activeLayer=activeOverlay+'-'+eventLayer.name
            layerMapping.get(activeOverlay+'-'+eventLayer.name).addTo(map);
            addLegend(map,layer=activeLayer);
            activeHeight=eventLayer.name;   
        } 
        else{ //preparing Height Variable
            removeLegend(); //remove basic legend
            activeOverlay=eventLayer.name;
            HeightControl.addTo(map);
        }         
    });

    map.on('overlayremove', function(eventLayer) {

        if (layerMapping.has(eventLayer.name)){ //removing basic layer
            layerMapping.get(eventLayer.name).removeFrom(map);
        }
        else if(layerMapping.has(activeOverlay+'-'+eventLayer.name)){ //removing Height Layers
            layerMapping.get(activeOverlay+'-'+eventLayer.name).removeFrom(map);
        }
        else{ // removing height variable
            if(layerMapping.has(eventLayer.name+'-'+activeHeight)){
                layerMapping.get(eventLayer.name+'-'+activeHeight).removeFrom(map);//remove last used layer (needed beacause activeOverlay has already changed)
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
$(function () {
    setNavigation();
});

function styleHandlingChanged(){ //reload Layer and Legend Control
    if (activeLayer){
        map.timeDimension.fire('timeload')
        addLegend(map,layer=activeLayer);
    }
}

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    path_array = path.split('/');
    project= path_array[path_array.length-2];

    $(".sidenav a").each(function () {
        href_array=$(this).attr('href').split('/');
        href= href_array[href_array.length-2];
        if (project === href) {
            $(this).closest('a').addClass('w3-green');
        }
    });
}