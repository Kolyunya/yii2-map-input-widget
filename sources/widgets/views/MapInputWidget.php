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

    ?> <input id="pac-input" class="controls" type="text" placeholder="Search Box"> 
     <style>
               .controls {
        margin-top: 16px;
        border: 1px solid transparent;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        height: 32px;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }

      #pac-input {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 400px;
      }

      #pac-input:focus {
        border-color: #4d90fe;
      }

      .pac-container {
        font-family: Roboto;
      }


         </style>
    <?php
    // Map canvas
    echo Html::tag(
        'div',
        '',
        [
            'class' => 'kolyunya-map-input-widget-canvas',
            'style' => "width: 100%; height: 100%",
        ]
    );

// [END] - Map input widget container
echo Html::endTag('div');
