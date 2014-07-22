<?php

    // Yii2 map input widget allows selecting geographical coordinates.
    // Copyright (C) 2014 Nikolay Oleynikov

    // This program is free software: you can redistribute it and/or modify
    // it under the terms of the GNU General Public License as published by
    // the Free Software Foundation, either version 3 of the License, or
    // (at your option) any later version.

    // This program is distributed in the hope that it will be useful,
    // but WITHOUT ANY WARRANTY; without even the implied warranty of
    // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    // GNU General Public License for more details.

    // You should have received a copy of the GNU General Public License
    // along with this program.  If not, see <http://www.gnu.org/licenses/>.

    // Author email: OleynikovNY@mail.ru

    use yii\helpers\Html;
    use yii\helpers\Url;

    // Register asset bundle
    \kolyunya\yii2\assets\MapInputAsset::register($this);

    // [BEGIN] - Map input widget container
    echo Html::beginTag
    (
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
            ],
        ]
    );

        // The actual hidden input
        echo Html::activeHiddenInput
        (
            $model,
            $attribute,
            [
                'class' => 'kolyunya-map-input-widget-input',
            ]
        );

        // Map canvas
        echo Html::tag
        (
            'div',
            '',
            [
                'class' => 'kolyunya-map-input-widget-canvas',
                'style' => "width: 100%; height: 100%",
            ]
        );

    // [END] - Map input widget container
    echo Html::endTag('div');

?>
