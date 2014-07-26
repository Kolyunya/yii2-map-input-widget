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

    namespace kolyunya\yii2\widgets;

    \Yii::setAlias('@kolyunya','@vendor/kolyunya');

    class MapInputWidget extends \yii\widgets\InputWidget
    {

        public $key;

        public $latitude = 0;

        public $longitude = 0;

        public $zoom = 0;

        public $width = '100%';

        public $height = '300px';

        public $pattern = '(%latitude%,%longitude%)';

        public $mapType = 'roadmap';

        public $animateMarker = true;

        public function run()
        {

            // Asset bundle should be configured with the application key
            $this->configureAssetBundle();

            return $this->render
            (
                'MapInputWidget',
                [
                    'id' => $this->getId(),
                    'model' => $this->model,
                    'attribute' => $this->attribute,
                    'latitude' => $this->latitude,
                    'longitude' => $this->longitude,
                    'zoom' => $this->zoom,
                    'width' => $this->width,
                    'height' => $this->height,
                    'pattern' => $this->pattern,
                    'mapType' => $this->mapType,
                    'animateMarker' => $this->animateMarker,
                ]
            );
        }

        private function configureAssetBundle()
        {
            \kolyunya\yii2\assets\MapInputAsset::$key = $this->key;
        }

    }

?>
