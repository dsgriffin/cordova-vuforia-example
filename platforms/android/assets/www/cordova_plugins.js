cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-vuforia/www/VuforiaPlugin.js",
        "id": "cordova-plugin-vuforia.VuforiaPlugin",
        "clobbers": [
            "navigator.VuforiaPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-vuforia": "1.1.1"
};
// BOTTOM OF METADATA
});