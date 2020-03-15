// function getFeatureInfoUrl(map, layer, latlng, params) {

//     var point = map.latLngToContainerPoint(latlng, map.getZoom()),
//         size = map.getSize(),
//         bounds = map.getBounds(),
//         sw = bounds.getSouthWest(),
//         ne = bounds.getNorthEast(),
//         sw = crs.projection._proj.forward([sw.lng, sw.lat]),
//         ne = crs.projection._proj.forward([ne.lng, ne.lat]);

//     var defaultParams = {
//         request: 'GetFeatureInfo',
//         service: 'WMS',
//         srs: layer._crs.code,
//         styles: '',
//         version: layer._wmsVersion,
//         format: layer.options.format,
//         bbox: [sw.join(','), ne.join(',')].join(','),
//         height: size.y,
//         width: size.x,
//         layers: layer.options.layers,
//         query_layers: layer.options.layers,
//         info_format: 'text/html'
//     };

//     params = L.Util.extend(defaultParams, params || {});

//     params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
//     params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

//     return layer._url + L.Util.getParamString(params, layer._url, true);

// }