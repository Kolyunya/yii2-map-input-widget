<?php

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
            if ( YII_DEBUG )
            {
                $this->js[] = 'js/map-input-widget.js';
            }
            else
            {
                $this->js[] = 'js/map-input-widget.min.js';
            }
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
