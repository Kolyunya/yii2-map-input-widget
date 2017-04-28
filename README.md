# Yii2 map input widget

## Description
A [Yii2 input widget](http://www.yiiframework.com/doc-2.0/yii-widgets-inputwidget.html) which provides a user-friendly interface for selecting geographical coordinates via [Google maps](https://www.google.com/maps/preview). Allows users to select geographical coordinates by clicking on an interative Google map embedded into you web-page. Also allows users to type in a place name to search for it via Google Places API.

The widget is [composer](https://getcomposer.org/)-enabled. You can aquire the latest available version from the [packagist repository](https://packagist.org/packages/kolyunya/yii2-map-input-widget).

## Demo
A simple widget demo is available [here](http://kolyunya.github.io/yii2-map-input-widget/). You may inspect the hidden input value via some web-developer tool (e.g. [Firebug](https://addons.mozilla.org/ru/firefox/addon/firebug/)) to see how geographical coordinates are represented inside the widget.

## Usage examples

### Minimal example
All widget parameters are optional, have some sensible default values and may not be configured.
~~~php
echo $form->field($model, 'coordinates')->widget('kolyunya\yii2\widgets\MapInputWidget');
~~~

### Extended example
An exhaustive list of widget parameters (which are not derived from [yii\widgets\InputWidget](http://www.yiiframework.com/doc-2.0/yii-widgets-inputwidget.html)) available for configuration is described in the following example.
~~~php
echo $form->field($model, 'coordinates')->widget(
    'kolyunya\yii2\widgets\MapInputWidget',
    [

        // Google maps browser key.
        'key' => $key,

        // Initial map center latitude. Used only when the input has no value.
        // Otherwise the input value latitude will be used as map center.
        // Defaults to 0.
        'latitude' => 42,

        // Initial map center longitude. Used only when the input has no value.
        // Otherwise the input value longitude will be used as map center.
        // Defaults to 0.
        'longitude' => 42,

        // Initial map zoom.
        // Defaults to 0.
        'zoom' => 12,

        // Map container width.
        // Defaults to '100%'.
        'width' => '420px',

        // Map container height.
        // Defaults to '300px'.
        'height' => '420px',

        // Coordinates representation pattern. Will be use to construct a value of an actual input.
        // Will also be used to parse an input value to show the initial input value on the map.
        // You can use two macro-variables: '%latitude%' and '%longitude%'.
        // Defaults to '(%latitude%,%longitude%)'.
        'pattern' => '[%longitude%-%latitude%]',

        // Google map type. See official Google maps reference for details.
        // Defaults to 'roadmap'
        'mapType' => 'satellite',

        // Marker animation behavior defines if a marker should be animated on position change.
        // Defaults to false.
        'animateMarker' => true,

        // Map alignment behavior defines if a map should be centered when a marker is repositioned.
        // Defaults to true.
        'alignMapCenter' => false,

        // A flag which defines if a search bar should be rendered over the map.
        'enableSearchBar' => true,

    ]
);
~~~
