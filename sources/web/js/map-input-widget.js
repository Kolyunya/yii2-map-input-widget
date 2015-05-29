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

    const canvasSelector = 'div.kolyunya-map-input-widget-canvas';

    var self = this;

    var input;

    var canvas;

    var map;

    var initializeComponents = function()
    {
        input = $(widget).find(inputSelector).get(0);
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

// MAXXER START
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    var markers = [];

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      self.setPosition(place.geometry.location);
      // Create a marker for each place.
      /**
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);
      */

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
// MAXXER END

    };

    var initializeWidget = function()
    {
        var point = getInitialValue();
        self.setPosition(point);
        $(widget).data('initialized',true);
    };

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

$(window).load
(
    function()
    {

        // Create an instance of widget manager
        mapInputWidgetManager = new MapInputWidgetManager();

        // Initialize widgets
        mapInputWidgetManager.initializeWidgets();

    }
);
