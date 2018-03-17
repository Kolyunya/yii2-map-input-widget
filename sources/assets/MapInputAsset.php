<?php

namespace kolyunya\yii2\assets;

/**
 * Class MapInputAsset
 *
 * To configure asset manager use the following configuration
 *
 * return [
 *     // ...
 *     'components' => [
 *         'assetManager' => [
 *             'bundles' => [
 *                 \kolyunya\yii2\assets\MapInputAsset::class => [
 *                     'options' => [
 *                         'key' => 'YOUR_GOOGLE_MAPS_API_KEY',
 *                         'language' => 'en',
 *                         'libraries' => 'places',
 *                     ],
 *                 ],
 *             ],
 *         ],
 *     ],
 * ];
 *
 * http://www.yiiframework.com/doc-2.0/guide-structure-assets.html#customizing-asset-bundles
 *
 * @package kolyunya\yii2\assets
 */

class MapInputAsset extends \yii\web\AssetBundle
{
    public $sourcePath = '@kolyunya/yii2-map-input-widget/sources/web';

    public $depends =
    [
        'yii\web\JqueryAsset',
    ];

    public $jsOptions =
    [
        'position' => \yii\web\View::POS_END,
    ];

    /** @var array */
    public $options = [];

    /**
     * @return void
     */
    public function init()
    {
        $this->js[] = '//maps.googleapis.com/maps/api/js?' . http_build_query($this->options);

        if (YII_DEBUG) {
            $this->js[] = 'js/map-input-widget.js';
            $this->css[] = 'css/map-input-widget.css';
        } else {
            $this->js[] = 'js/map-input-widget.min.js';
            $this->css[] = 'css/map-input-widget.min.css';
        }
    }
}
