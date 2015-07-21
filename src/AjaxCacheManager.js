define(['jquery'], function ($) {

    "use strict";

    var CacheManager = function (options) {
        this.setOptions(options);
    };

    CacheManager.prototype = {
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
        load: function(url) {
            var _self = this;
            if (_self.get(url) === null) {
                $(_self.options.cache_container).html("Loading...");
                $.get(url, function(data) {
                    _self.cache(url, data);
                    $(_self.options.cache_container).html(_self.get(url));
                });
            } else {
                $(_self.options.cache_container).html(_self.get(url));
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
        }
    };

    return CacheManager;
});
