function MapInputWidgetManager()
{

    const widgetSelector = '.kolyunya-map-input-widget';

    var self = this;

    var widgets = Array();

    var initializeWidget = function ( widgetContainer )
    {
        if ( ! $(widgetContainer).data('initialized') )
        {
            var widget = new MapInputWidget(widgetContainer);
            widget.initialize();
            return widget;
        }
        return null;
    };

    var addWidget = function ( widget )
    {
        var widgetId = widget.getId();
        widgets[widgetId] = widget;
    };

    this.initializeWidgets = function()
    {
        $(widgetSelector).each
        (
            function ( widgetIndex , widgetContainer )
            {
                var widget = initializeWidget(widgetContainer);
                if ( widget )
                {
                    addWidget(widget);
                }
            }
        );

    };

    this.getWidget = function ( widgetId )
    {
        var widget = widgets[widgetId];
        return widget;
    };

}

function MapInputWidget ( widget )
{

    const inputSelector = 'input.kolyunya-map-input-widget-input';

    const searchBarSelector = 'input.kolyunya-map-input-widget-search-bar';

    const canvasSelector = 'div.kolyunya-map-input-widget-canvas';

    var self = this;

    var input;

    var searchBar;

    var canvas;

    var map;

    var initializeComponents = function()
    {
        input = $(widget).find(inputSelector).get(0);
        searchBar = $(widget).find(searchBarSelector).get(0);
        canvas = $(widget).find(canvasSelector).get(0);
    };

    var initializeMap = function()
    {

        map = new google.maps.Map
        (
            canvas,
            {
                mapTypeId: $(widget).data('map-type'),
                center: getInitialMapCenter(),
                zoom: $(widget).data('zoom'),
                styles:
                [
                    {
                        featureType: "poi",
                        stylers:
                        [
                            {
                                visibility: "off",
                            },
                        ],
                    },
                ],
                mapTypeControlOptions :
                {
                    mapTypeIds:
                    [
                    ],
                },
            }
        );

        google.maps.event.addListener
        (
            map,
            'click',
            function ( click )
            {
                self.setPosition
                (
                    {
                        latitude: click.latLng.lat(),
                        longitude: click.latLng.lng(),
                    }
                );
            }
        );

    };

    var initializeWidget = function()
    {
        var point = getInitialValue();
        self.setPosition(point);
        $(widget).data('initialized',true);
    };

    var initializeSearchBar = function()
    {
        var searchBarIsEnabled = $(widget).data('enable-search-bar');
        var searchBarIsHidden = !searchBarIsEnabled;
        $(searchBar).prop('hidden',searchBarIsHidden);
        searchBarAutocomplete = new google.maps.places.Autocomplete(searchBar);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBar);
        google.maps.event.addListener(
            searchBarAutocomplete,
            'place_changed',
            function() {
                var place = this.getPlace();
                var placeGeometry = place.geometry;
                if ( placeGeometry )
                {
                    var placeLocation = placeGeometry.location;
                    self.setPosition(placeLocation);
                }
            }
        );
    }

    var makePointString = function ( pointData )
    {
        var pattern = getPattern();
        var point = makePoint(pointData);
        pattern = pattern.replace(/%latitude%/g,point.lat());
        pattern = pattern.replace(/%longitude%/g,point.lng());
        return pattern;
    };

    var hasInitialValue = function()
    {
        var hasInitialValue = $(input).prop('value') != '';
        return hasInitialValue;
    };

    var getInitialValue = function()
    {
        var point;
        var pattern = getPattern();
        var pointString = $(input).prop('value');
        if ( pointString !== '' )
        {
            //  The function has an issue - it will not parse the initial value correctly
            //  if the pattern has more than one occurence of "%latitude%" or "%longitude%"
            //  in a row in the begining of the string.
            //  E.g. the initial value won't be parsed correctly against
            //  the pattern "%latitude% - %latitude% - %longitude%".
            var latitudePosition = pattern.indexOf('%latitude%');
            var longitudePosition = pattern.indexOf('%longitude%');
            var latitudeFirst = latitudePosition < longitudePosition;
            var latitudeIndex = latitudeFirst ? 0 : 1;
            var longitudeIndex = latitudeFirst ? 1 : 0;
            var latitude = pointString.match(/-?\d+(\.\d+)?/g)[latitudeIndex];
            var longitude = pointString.match(/-?\d+(\.\d+)?/g)[longitudeIndex];
            point = new google.maps.LatLng(latitude,longitude);
        }
        else
        {
            point = null;
        }
        return point;
    };

    var getInitialCenter = function()
    {
        var latitude = $(widget).data('latitude');
        var longitude = $(widget).data('longitude');
        var point = new google.maps.LatLng(latitude,longitude);
        return point;
    };

    var getInitialMapCenter = function()
    {
        var initialMapCenter;
        if ( hasInitialValue() )
        {
            initialMapCenter = getInitialValue();
        }
        else
        {
            initialMapCenter = getInitialCenter();
        }
        return initialMapCenter;
    };

    var getPattern = function()
    {
        var pattern = $(widget).data('pattern');
        return pattern;
    };

    // Constructs a point from latitude and langitude
    var makePoint = function ( pointData )
    {
        var point;
        if
        (
            pointData.latitude !== undefined
                &&
            pointData.longitude !== undefined
        )
        {
            var latitude = pointData.latitude;
            var longitude = pointData.longitude;
            point = new google.maps.LatLng(latitude,longitude);
        }
        else
        {
            point = pointData;
        }
        return point;
    }

    // Initializes widget
    this.initialize = function()
    {
        initializeComponents();
        initializeMap();
        initializeWidget();
        initializeSearchBar();
    };

    // Returns widget identifier
    this.getId = function()
    {
        var id = $(widget).prop('id');
        return id;
    };

    // Sets the widget value to specified point;
    // Pans the map to the corresponding point;
    // Sets marker position to the corresponding point.
    this.setPosition = function ( pointData )
    {

        if ( map.marker )
        {
            map.marker.setMap(null);
        }

        if ( pointData === null )
        {
            // Disable the input in order not to send it in POST array
            $(input).prop('disabled',true);
            return;
        }
        else
        {
            // Enable the input in order to send in in POST array
            $(input).prop('disabled',false);
        }

        var point = makePoint(pointData);

        if ( $(widget).data('align-map-center') === 1 )
        {
            map.panTo(point);
        }

        var markerAnimation = null;
        if ( $(widget).data('animate-marker') === 1 )
        {
            markerAnimation = google.maps.Animation.DROP;
        }
        map.marker = new google.maps.Marker
        (
            {
                map: map,
                position: point,
                draggable: true,
                animation: markerAnimation,
            }
        );

        google.maps.event.addListener
        (
            map.marker,
            'dragend',
            function()
            {
                self.setPosition(this.getPosition());
            }
        );

        var pattern = $(widget).data('pattern');
        var pointString = makePointString(point);
        $(input).prop('value',pointString);

    };

    // Pans the map the the specified point
    this.panTo = function ( pointData )
    {
        var point = makePoint(pointData);
        map.panTo(point);
    };

    // Sets the map zoom to a specified value
    this.setZoom = function ( zoom )
    {
        map.setZoom(zoom);
    };


};

// A global instance of map inputs manager.
// Use it to get references to widget instances.
var mapInputWidgetManager;

$(window).on('load', function()
    {

        // Create an instance of widget manager
        mapInputWidgetManager = new MapInputWidgetManager();

        // Initialize widgets
        mapInputWidgetManager.initializeWidgets();

    }
);
