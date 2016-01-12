<?php

use yii\helpers\Html;
use yii\helpers\Url;

// Register asset bundle
\kolyunya\yii2\assets\MapInputAsset::register($this);

// [BEGIN] - Map input widget container
echo Html::beginTag(
    'div',
    [
        'class' => 'kolyunya-map-input-widget',
        'style' => "width: $width; height: $height;",
        'id' => $id,
        'data' =>
        [
            'latitude' => $latitude,
            'longitude' => $longitude,
            'zoom' => $zoom,
            'pattern' => $pattern,
            'map-type' => $mapType,
            'animate-marker' => $animateMarker,
            'align-map-center' => $alignMapCenter,
            'enable-search-bar' => $enableSearchBar,
        ],
    ]
);

    // The actual hidden input
    echo Html::activeHiddenInput(
        $model,
        $attribute,
        [
            'class' => 'kolyunya-map-input-widget-input',
        ]
    );

    // Search bar input
    echo Html::input(
        'text',
        null,
        null,
        [
            'class' => 'kolyunya-map-input-widget-search-bar',
        ]
    );

    // Map canvas
    echo Html::tag(
        'div',
        '',
        [
            'class' => 'kolyunya-map-input-widget-canvas',
        ]
    );

// [END] - Map input widget container
echo Html::endTag('div');
