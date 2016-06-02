# Cordova Vuforia Example

A simple example of using [cordova-plugin-vuforia](https://github.com/thisisbd/cordova-plugin-vuforia) to utilise [Vuforia](http://www.vuforia.com/) in your Cordova project.

### Features

* Custom files (replace the files inside `www/targets` with your own)

### Requirements

Cordova 6, iOS 8 minimum (if building for iOS Devices), Android 2.2 minimum (if building for Android devices)

### Build

First, clone the repo.

Next, replace `YOUR_VUFORIA_KEY` in the `startVuforia` function (inside `www/js/index.js`) with your Vuforia key.

Then run `cordova prepare ios` or `cordova prepare android` (depending on what device you're testing on).

Finally, make sure your device is connected and build/run the application:

* on Android it should just be `cordova run android`
* for iOS, open up the iOS project in XCode (`platforms/ios/HelloCordova.xcodeproj`) then click run

## License

MIT