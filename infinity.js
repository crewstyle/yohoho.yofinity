/*! *//*!
 * infinity.js v1.0.0 - "SOGEKINNNNNGGG - One Piece"
 * ~~~~~~~~~~~~~~~~~~
 *
 * Example of use HTML:
 * <a href="http://example.com/page/2" title="Next posts" rel="next">Loading...</a>
 *
 * Example of use JS:
 * $('body').infinity({
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
    var Infinity = function ($el, options){
        //vars
        var _infinity = this;
        _infinity.$el = $el;
        _infinity.options = $.extend({}, options);
        _infinity.$context = $(_infinity.options.context);

        //initialize
        _infinity.initialize();
    };

    Infinity.prototype.options = {};
    Infinity.prototype.$el = null;
    Infinity.prototype.$context = null;

    Infinity.prototype.initialize = function (){
        var _infinity = this;
        var _time = null;

        //bind scroll event
        _infinity.$context.on('scroll', function (e){
            //check timer
            if (_time) {
                clearTimeout(_time);
                _time = null;
            }

            //set timer
            _time = setTimeout(function (){
                _infinity.check();
            }, 250);
        });
    };

    Infinity.prototype.check = function (){
        var _infinity = this;

        //get all children
        var $navs = _infinity.$el.find(_infinity.options.navSelector);

        //check children
        if (!$navs.length) {
            _infinity._log('End.');
        }
        else {
            //update distances
            var _wbot = _infinity.$context.scrollTop() + _infinity.$context.height();

            //iterate on all
            $.each($navs, function (){
                var $nav = $(this),
                    _dist = $nav.offset().top - _wbot;

                //check buffer
                if (_dist > _infinity.options.buffer) {
                    _infinity._log((_dist - _infinity.options.buffer) + 'px before loading.');
                }
                else {
                    _infinity.next($nav);
                }
            });
        }
    };

    Infinity.prototype.next = function ($link){
        var _infinity = this,
            _href = $link.attr('href');

        //check href
        if ('#' == _href || '' == _href) {
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
                _infinity._loading($link);
            },
            error: function (){
                _infinity._error($link);
            },
            success: function (resp){
                _infinity._success($link, resp);
            }
        });
    };

    Infinity.prototype._loading = function ($link){
        var _infinity = this;

        //change status
        $link.attr('data-loading', true);
        _infinity._log('Loading next page.');

        //call loading method
        if (typeof _infinity.options.loading === 'function') {
            _infinity.options.loading($link);
        }
    };

    Infinity.prototype._error = function ($link){
        var _infinity = this;

        //change status
        $link.removeAttr('data-loading');
        _infinity._log('Error while loading next page.');

        //call error method
        if (typeof _infinity.options.error === 'function') {
            _infinity.options.error($link);
        }
    };

    Infinity.prototype._success = function ($link, response){
        var _infinity = this;

        //change status
        $link.removeAttr('data-loading');
        _infinity._log('Next page loaded.');

        //call success method
        if (typeof _infinity.options.success === 'function') {
            _infinity.options.success($link, response);
        }
    };

    Infinity.prototype._log = function (msg){
        var _infinity = this;

        //check debug
        if (_infinity.options.debug && typeof console !== 'undefined' && console !== null) {
            console.log('Infinity ~ ' + msg);
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

                new Infinity($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.infinity = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.Infinity');
        }
    };
})(window.jQuery);
