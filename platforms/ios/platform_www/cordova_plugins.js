cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-vuforia/www/VuforiaPlugin.js",
        "id": "cordova-plugin-vuforia.VuforiaPlugin",
        "pluginId": "cordova-plugin-vuforia",
        "clobbers": [
            "navigator.VuforiaPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-vuforia": "1.1.1",
    "cordova-plugin-whitelist": "1.2.2"
}
// BOTTOM OF METADATA
});