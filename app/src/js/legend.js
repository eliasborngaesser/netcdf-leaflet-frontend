

    var TSurfLegend = { 
        "colors": [ "#0000ff", "#ffff00", "#ff0000",],
        "values": [ "13.63", "26.34", "51.77",],
        "unit": "degree Celsius",
    };

    var AlbedoLegend = { 
        "colors": [ "#000000", "#ffffff",],
        "values": [ "0", "1",],
        "unit": "",
    };

    var WindSpd_0_3Legend = { 
        "colors": [ "#0000ff", "#ffff00", "#ff0000",],
        "values": [ "0.0", "0.73", "2.2",],
        "unit": "m s-1",
    };

    var WindSpd_10_5Legend = { 
        "colors": [ "#0000ff", "#ffff00", "#ff0000",],
        "values": [ "0.0", "0.83", "2.49",],
        "unit": "m s-1",
    };

    var WindSpd_40_5Legend = { 
        "colors": [ "#0000ff", "#ffff00", "#ff0000",],
        "values": [ "0.88", "1.71", "3.39",],
        "unit": "m s-1",
    };

    var T_0_3Legend = { 
        "colors": [ "#0000ff", "#ffff00", "#ff0000",],
        "values": [ "-273.15", "-170.63", "34.42",],
        "unit": "degree Celsius",
    };

    var T_10_5Legend = { 
        "colors": [ "#0000ff", "#ffff00", "#ff0000",],
        "values": [ "-273.15", "-170.96", "33.41",],
        "unit": "degree Celsius",
    };

    var T_40_5Legend = { 
        "colors": [ "#0000ff", "#ffff00", "#ff0000",],
        "values": [ "16.74", "21.79", "31.9",],
        "unit": "degree Celsius",
    };


let legendMapping = new Map();
 legendMapping.set('Surface Temperature',TSurfLegend);
 legendMapping.set('Surface Albedo',AlbedoLegend);
 legendMapping.set('Wind Speed-0.3 Meter',WindSpd_0_3Legend);
 legendMapping.set('Wind Speed-10.5 Meter',WindSpd_10_5Legend);
 legendMapping.set('Wind Speed-40.5 Meter',WindSpd_40_5Legend);
 legendMapping.set('Potential Air Temperature-0.3 Meter',T_0_3Legend);
 legendMapping.set('Potential Air Temperature-10.5 Meter',T_10_5Legend);
 legendMapping.set('Potential Air Temperature-40.5 Meter',T_40_5Legend);


var legend = L.control({position: 'bottomright'});

var legendName=null

function addLegend (map,legendName){
    this.legendName=legendName;
    legend.addTo(map);
    };
function removeLegend (){
    legend.remove();
    };

legend.onAdd = function (map) {
    legendObject=legendMapping.get(legendName)

    var div = L.DomUtil.create('div', 'info legend'),
        grades = legendObject.values,
        colors = legendObject.colors;

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML='<h4>'+legendName+'</h4>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' + grades[i] +' '+legendObject.unit+'<br></br>' ;
    }

    return div;
};