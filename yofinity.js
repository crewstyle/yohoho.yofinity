/*! *//*!
 * yofinity.js v1.0.0 - "Sogeking no shima deeeeeee - One Piece"
 * ~~~~~~~~~~~~~~~~~~
 *
 * Example of use HTML:
 * <a href="http://example.com/page/2" title="Next posts" rel="next">Loading...</a>
 *
 * Example of use JS:
 * $('body').yofinity({
 *     buffer: 1000,
 *     navSelector: 'a[rel="next"]',
 *     success: function ($link, response){
 *         $link.before(response);
 *         $link.attr('href', '/page/2');
 *     },
 *     error: function ($link){
 *         $link.remove();
 *     }
 * });
 *
 * ~~~~~~~~~~~~~~~~~~
 * Copyright 2015 Achraf Chouk <achrafchouk@gmail.com>
 */

(function ($){
    "use strict";
    var Yofinity = function ($el, options){
        //vars
        var _yofinity = this;
        _yofinity.$el = $el;
        _yofinity.options = $.extend({}, options);
        _yofinity.$context = $(_yofinity.options.context);

        //initialize
        _yofinity.initialize();
    };

    Yofinity.prototype.options = {};
    Yofinity.prototype.$el = null;
    Yofinity.prototype.$context = null;

    Yofinity.prototype.initialize = function (){
        var _yofinity = this;
        var _time = null;

        //bind scroll event
        _yofinity.$context.on('scroll', function (e){
            //check timer
            if (_time) {
                clearTimeout(_time);
                _time = null;
            }

            //set timer
            _time = setTimeout(function (){
                _yofinity.check();
            }, 250);
        });
    };

    Yofinity.prototype.check = function (){
        var _yofinity = this;

        //get all children
        var $navs = _yofinity.$el.find(_yofinity.options.navSelector);

        //check children
        if (!$navs.length) {
            _yofinity._log('End.');
        }
        else {
            //update distances
            var _wbot = _yofinity.$context.scrollTop() + _yofinity.$context.height();

            //iterate on all
            $.each($navs, function (){
                var $nav = $(this),
                    _dist = $nav.offset().top - _wbot;

                //check buffer
                if (_dist > _yofinity.options.buffer) {
                    _yofinity._log((_dist - _yofinity.options.buffer) + 'px before loading.');
                }
                else {
                    _yofinity.next($nav);
                }
            });
        }
    };

    Yofinity.prototype.next = function ($link){
        var _yofinity = this,
            _href = $link.attr('href');

        //check href
        if ('#' === _href || '' === _href) {
            return;
        }

        //check status
        if ($link.attr('data-loading')) {
            return;
        }

        //get ajax call
        $.ajax({
            url: _href,
            beforeSend: function (){
                _yofinity._loading($link);
            },
            error: function (){
                _yofinity._error($link);
            },
            success: function (resp){
                _yofinity._success($link, resp);
            }
        });
    };

    Yofinity.prototype._loading = function ($link){
        var _yofinity = this;

        //change status
        $link.attr('data-loading', true);
        _yofinity._log('Loading next page.');

        //call loading method
        if (typeof _yofinity.options.loading === 'function') {
            _yofinity.options.loading($link);
        }
    };

    Yofinity.prototype._error = function ($link){
        var _yofinity = this;

        //change status
        $link.removeAttr('data-loading');
        _yofinity._log('Error while loading next page.');

        //call error method
        if (typeof _yofinity.options.error === 'function') {
            _yofinity.options.error($link);
        }
    };

    Yofinity.prototype._success = function ($link, response){
        var _yofinity = this;

        //change status
        $link.removeAttr('data-loading');
        _yofinity._log('Next page loaded.');

        //call success method
        if (typeof _yofinity.options.success === 'function') {
            _yofinity.options.success($link, response);
        }
    };

    Yofinity.prototype._log = function (msg){
        var _yofinity = this;

        //check debug
        if (_yofinity.options.debug && typeof console !== 'undefined' && console !== null) {
            console.log('Yofinity ~ ' + msg);
        }
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                buffer: 1000,
                context: window,
                debug: false,
                error: null,
                loading: null,
                navSelector: 'a[rel="next"]',
                success: null
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new Yofinity($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.yofinity = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.Yofinity');
        }
    };
})(window.jQuery);
