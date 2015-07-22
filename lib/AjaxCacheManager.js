if (typeof define !== 'function') { var define = require('amdefine')(module) }
    
define(['jquery'], function ($) {

    "use strict";

    var AjaxCacheManager = function (options) {
        this.setOptions(options);
    };

    AjaxCacheManager.prototype = {
        options : {
            cache_container: '.js-dynamic-container',
        },
        setOptions : function (options) {
            this.options = $.extend({}, this.options, options);
            this.init();
        },
        init : function () {
            this._htmlCache = [];
        },
        load: function(url, callback) {
            var _self = this;
            if (_self.get(url) === null) {
                $(_self.options.cache_container).html("Loading...");
                $.get(url, function(data) {
                    _self.cache(url, data);
                    _self._updateContainer(url, callback);        
                });
            } else {
                _self._updateContainer(url, callback);
            }
        },
        cache: function (url, html) {
            this._htmlCache[url] = html;
            this._lastUrl = url;
        },
        get: function (url) {
            this._lastUrl = url;

            if (typeof this._htmlCache[url] === 'undefined') {
                return null;
            }
            return this._htmlCache[url];
        },
        _updateContainer: function(url, callback) {
            var containerHTML = _self.get(url);
            $(_self.options.cache_container).html(containerHTML);
            
            if (typeof callback !== 'undefined') {
                callback(containerHTML);
            }
        }
    };

    return AjaxCacheManager;
});
