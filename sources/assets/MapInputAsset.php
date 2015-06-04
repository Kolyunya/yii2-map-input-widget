<?php

namespace kolyunya\yii2\assets;

class MapInputAsset extends \yii\web\AssetBundle
{

    public static $key;
    
    public static $showSearchBox;

    public $sourcePath = '@kolyunya/yii2-map-input-widget/sources/web';

    public $depends =
    [
        'yii\web\JqueryAsset',
    ];

    public $jsOptions =
    [
        'position' => \yii\web\View::POS_END,
    ];

    public function __construct($config = [])
    {
        $this->js[] = $this->getGoogleMapScriptUrl();
        if (YII_DEBUG) {
            $this->js[] = 'js/map-input-widget.js';
        } else {
            $this->js[] = 'js/map-input-widget.min.js';
        }
        
        if (self::$showSearchBox)
            $this->css[] = 'css/map-input-widget.css';
        
        parent::__construct($config);
    }

    private function getGoogleMapScriptUrl()
    {
        $opts = [
            'key' => self::$key,
            'sensor' => 'false',
        ];
        if (self::$showSearchBox)
            $opts['libraries'] = 'places';
        $scriptUrl  =  "//maps.googleapis.com/maps/api/js?";
        $scriptUrl .= http_build_query($opts);
        return $scriptUrl;
    }
}
