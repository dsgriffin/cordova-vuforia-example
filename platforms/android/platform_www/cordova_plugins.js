cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
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
    "cordova-plugin-android-support-v4": "21.0.1",
    "cordova-plugin-device": "1.1.2",
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-vuforia": "2.0.0"
};
// BOTTOM OF METADATA
});