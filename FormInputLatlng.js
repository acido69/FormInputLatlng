;(function($, google, document) {

    $.formInputLatlng = function(el, options) {

        var defaults = {
            elemetAddr  : null,
            mapClass    : '',
            hiddeInput  : true,
            map         : {
                zoom                    : 1,
                center                  : new google.maps.LatLng(15.453680,-31.640625),
                mapTypeControl          : false,
                streetViewControl       : false,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId               : google.maps.MapTypeId.ROADMAP
            },
            errorLocation: function() {}
        }

        var plugin      = this;

        /*
         * @note
         * Google Geocoding API allowing 2,500 geolocation requests per day so that
         * I dropped Google map JSON parsing with jquery. (Google Maps API Premier
         * allows 100,000 requests per day.)
         */
        var geocoder    = new google.maps.Geocoder();
        
        plugin.settings = {}

        var init = function() {
            plugin.settings     = $.extend({}, defaults, options);
            plugin.el           = el;
            renderMap(plugin.el);
            renderMarker(plugin.el);
            addEventMap(plugin.el);
            try{
                navigator.geolocation.getCurrentPosition(runMapForNavigationLocation);
            }catch(e){plugin.settings.errorLocation()}
            if(plugin.settings.hiddeInput){
                plugin.el.css({'position':'absolute', 'width':'1px', 'height':'1px'});
            }
        }

        var renderMap = function(el) {
            var canvas  = $('<div></div>', {id:'inputLatLng'+Math.floor(Math.random()*69)});
            canvas.addClass(plugin.settings.mapClass)
            el.after(canvas);
            var map     = new google.maps.Map( document.getElementById( canvas.attr('id') )
                    , plugin.settings.map);
            el.data('map', map);
            return el;
        }

        var renderMarker = function(el) {
            var map     = el.data('map');
            var marker  = new google.maps.Marker({
                  position  : map.getCenter(),
                  map       : map,
                  title     : "You are here!"
              });
            el.data('marker', marker);
        }

        var runMapForNavigationLocation = function(position){
            var el          = plugin.el;
            var latLng      = new google.maps.LatLng(position.coords.latitude
                    , position.coords.longitude);
            var map = el.data('map');
            if(map){
                map.setCenter(latLng);
                map.setZoom(15);
            }
        }

        var addEventMap = function(el){
            var map     = el.data('map');
            var marker  = el.data('marker');
            google.maps.event.addListener(map, 'center_changed', function(){
                var latLng = this.getCenter();
                marker.setPosition(latLng);
                el.attr('value', latLng.toUrlValue());
                if(plugin.settings.elemetAddr === null){
                    return null;
                }
                geocoder.geocode( { 'latLng': latLng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        plugin.settings.elemetAddr.attr('value', results[0].formatted_address);
                    }
                    return this;
                });
            })
            if(plugin.settings.elemetAddr === null){
                return null;
            }
            plugin.settings.elemetAddr.bind('change', function(e){
                var address = $(this).attr('value');
                var map     = plugin.el.data('map');
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                    }
                    return this;
                });
                return this;
            })
            return null;
        }
        init();
    }

})(jQuery, google, document);