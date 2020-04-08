L.TimeDimension.Layer.customWMS = L.TimeDimension.Layer.WMS.extend({

    _update: function() {
        //Changed Code
        if (!this._map)
            return;
        if (document.getElementById("dynamicStyles").checked)
            _currentStyle=this._baseLayer.options.layers+map.timeDimension.getCurrentTimeIndex()
        else
            _currentStyle=this._baseLayer.options.layers
        if (this._baseLayer.options.styles!=(_currentStyle)){
                    this.setParams({styles: _currentStyle});
        }
        // Original Code from socib/TimeDimension
        var time = this._timeDimension.getCurrentTime();
        var layer = this._getLayerForTime(time);
        if (this._currentLayer == null) {
            this._currentLayer = layer;
        }
        if (!this._map.hasLayer(layer)) {
            this._map.addLayer(layer);
        } else {
            this._showLayer(layer, time);
        }
    },
});
    L.timeDimension.layer.customWMS = function (layer, options) {
        this.layerName
        return new L.TimeDimension.Layer.customWMS(layer, options);  
      };
      