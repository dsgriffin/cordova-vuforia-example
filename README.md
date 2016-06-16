# Cordova Vuforia Example

A simple example Cordova project using [cordova-plugin-vuforia](https://github.com/thisisbd/cordova-plugin-vuforia).

### Features

* Custom files (replace the files inside `www/targets` with your own, or use absolute paths as specified [here](https://github.com/mattrayner/cordova-plugin-vuforia#configxml)).
* Demos starting, automatically stopping and manually stopping the plugin.

### Requirements

* Cordova 6.* 
* iOS 8 minimum (if running on an iOS device) 
* Android 4 minimum (if running on an Android device)

### Build

First, clone the repo.

Next, replace `YOUR_VUFORIA_KEY` in the `startVuforia` function (inside `www/js/index.js`) with your Vuforia key.

Then, make sure your device is properly connected and run either `cordova prepare ios && cordova run ios` or `cordova prepare android && cordova run android`, depending on your device type of course.

:tada:
 
## License

MIT