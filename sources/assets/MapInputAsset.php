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

    namespace kolyunya\yii2\assets;

    class MapInputAsset extends \yii\web\AssetBundle
    {

        public static $key;

        public $sourcePath = '@kolyunya/yii2-map-input-widget/sources/web';

        public $depends =
        [
            'yii\web\JqueryAsset',
        ];

        public $jsOptions =
        [
            'position' => \yii\web\View::POS_END,
        ];

        public function __construct( $config = [] )
        {
            $this->js[] = $this->getGoogleMapScriptUrl();
            $this->js[] = 'js/map-input-widget.js';
            parent::__construct($config);
        }

        private function getGoogleMapScriptUrl()
        {
            $scriptUrl  = "http://maps.googleapis.com/maps/api/js?";
            $scriptUrl .= http_build_query
            (
                [
                    'key' => self::$key,
                    'sensor' => 'false',
                ]
            );
            return $scriptUrl;
        }

    }

?>
