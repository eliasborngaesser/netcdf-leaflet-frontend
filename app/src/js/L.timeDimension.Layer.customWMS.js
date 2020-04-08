L.TimeDimension.Layer.customWMS = L.TimeDimension.Layer.WMS.extend({
    
    _onNewTimeLoading: function(ev) {
        // console.log('Layer._onNewTimeLoading: ' + this._baseLayer.wmsParams.layers + ' with time: ' + new Date(ev.time).toISOString());
        var layer = this._getLayerForTime(ev.time);
        if (!this._map.hasLayer(layer)) {
            this._map.addLayer(layer);
            // console.log('Layer._onNewTimeLoading: layer added to map');
        }
        if (document.getElementById("dynamicStyles").checked)
            _currentStyle=this._baseLayer.options.layers+map.timeDimension.getCurrentTimeIndex()
        else
            _currentStyle=this._baseLayer.options.layers
        if (this._baseLayer.options.styles!=(_currentStyle)){
                    this.setParams({styles: _currentStyle});
        }  
    },
     });
    L.timeDimension.layer.customWMS = function (layer, options) {
        this.layerName
        return new L.TimeDimension.Layer.customWMS(layer, options);  
      };
      