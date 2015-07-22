if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['jquery'], function ($) {

    "use strict";

    var AjaxCacheManager = function (options) {
        this.setOptions(options);
    };

    AjaxCacheManager.prototype = {
        options : {
            cache_container: null,
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

            if (_self.options.cache_container === null && typeof callback === 'undefined') {
                throw "No cache container or callback is set.";
            }

            if (_self.get(url) === null) {
                if (_self.options.cache_container !== null) {
                    $(_self.options.cache_container).html("Loading...");
                }
                $.get(url, function(data) {
                    _self.cache(url, data);

                    _self._updateContainer(url, callback);
                    _self._updateCallback(url, callback);
                });
            } else {
                _self._updateContainer(url, callback);
                _self._updateCallback(url, callback);
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
        changeContainer: function(containerSelector) {
            _self.options.cache_container = containerSelector;
        },
        _updateContainer: function(url, callback) {
            var _self = this;

            if (_self.options.cache_container === null) {
                return;
            }
            var containerHTML = _self.get(url);
            $(_self.options.cache_container).html(containerHTML);
        },
        _updateCallback: function(url, callback) {
            var html = this.get(url);

            if (typeof callback !== 'undefined') {
                callback(html);
            }
        }
    };

    return AjaxCacheManager;
});
