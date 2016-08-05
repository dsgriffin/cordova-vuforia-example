/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Vuforia license
    vuforiaLicense: 'ARWew8T/////AAAAAFfGjmmevkaStzS/ubwzoq41fZDzeg7vVS4hFrktpLuHbBXUVEe7yawMjAXfruf810aenI4bFAH4pHgM/D5ErIyLhsn6ct1qnMRGJy2tqcRsTOHZuqnEMRLiCwtnANvO8qxN5DXztFJSqCgrW2can9708d5o32QvsB/T6eD1BKao9ZIMXApddusf7NLizCHkxAESC7+UQVPZYeiwr1VoJqbyhvaxd1CdDo55/wfGgkuQQenFsRrAnppQcPyYn0C51GmgdCa8JY6ynp6jI5UWMC7TIIji64rO5PSkp3Tn0lRsifD+2MyOCm3jAhrpF42wPaWa/XG3qbXUvXlatcDjVJDM4+prw3U2iOl+xW2cdvBX',
    // Are we launching Vuforia with simple options?
    simpleOptions: null,
    // Which images have we matched?
    matchedImages: [],
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // Start Vuforia using simple options
        document.getElementById('start-vuforia').onclick = function () {
            app.startVuforia(true);
        };

        // Start Vuforia with no overlay text
        document.getElementById('start-vuforia-with-no-overlay-text').onclick = function () {
            app.startVuforia(true, undefined, null)
        };

        // Start Vuforia with simple options and try to close it after 5 seconds
        document.getElementById('start-and-stop-vuforia').onclick = function () {
            app.startVuforia(true);

            console.log('Starting timer...');

            // Wait for a timeout, then automatically stop Vuforia
            setTimeout(function(){
                app.stopVuforia();
            }, 5000);
        };

        // Attempt to stop Vuforia
        document.getElementById('stop-vuforia').onclick = function () {
            app.stopVuforia();
        };

        // Start Vuforia with full options and keep it open when images are found
        document.getElementById('start-vuforia-and-keep-open').onclick = function () {
            app.startVuforia(false);
        };

        //start-vuforia-and-recognise-in-sequence

        // Start Vuforia with full options and keep it open when images are found
        document.getElementById('start-vuforia-and-recognise-in-sequence').onclick = function () {
            var imagesMatched = 0,
                imageSequence = [ 'iceland', ['canterbury-grass', 'brick-lane'], 'iceland' ];

            var successCallback = function(data) {
                console.log('Found '+data.result.imageName);
                
                imagesMatched++;

                app.playSound(); // Play a sound so that the user has some feedback
                
                // Are there more images to match?
                if(imagesMatched < imageSequence.length) {
                    var newTargets = [ imageSequence[imagesMatched] ];

                    console.log('Updating targets to: '+newTargets);

                    navigator.VuforiaPlugin.updateVuforiaTargets(
                        newTargets,
                        function(data){
                            console.log(data);
                            console.log('Updated targets');
                        },
                        function(data) {
                            alert("Error: " + data);
                        }
                    );
                } else {
                    navigator.VuforiaPlugin.stopVuforia(function(){
                        alert("Congratulations!\nYou found all three images!");
                    },
                    app.errorHandler);
                }
            };

            var options = {
                databaseXmlFile: 'PluginTest.xml',
                targetList: [ 'iceland' ],
                overlayMessage: 'Scan images in the order: \'iceland\', (\'canterbury-grass\' or \'brick-lane\'), then \'iceland\'.',
                vuforiaLicense: app.vuforiaLicense,
                autostopOnImageFound: false
            };

            // Start Vuforia with our options
            navigator.VuforiaPlugin.startVuforia(
                options,
                successCallback,
                function(data) {
                    alert("Error: " + data);
                }
            );
        };
    },
    // Start the Vuforia plugin
    startVuforia: function(simpleOptions, successCallback, overlayMessage, targets){
        var options;

        if(typeof overlayMessage == 'undefined')
            overlayMessage = 'Point your camera at a test image...';

        if(typeof targets == 'undefined')
            targets = [ 'stones', 'chips' ];

        // Reset the matched images
        app.matchedImages = [];

        // Set the global simpleOptions flag
        app.simpleOptions = simpleOptions;

        // Log out wether or not we are using simpleOptions
        console.log('Simple options: '+!!app.simpleOptions);

        // Load either simple, or full options
        if(!!app.simpleOptions){
            options = {
                databaseXmlFile: 'www/targets/StonesAndChips.xml',
                targetList: targets,
                overlayMessage: overlayMessage,
                vuforiaLicense: app.vuforiaLicense
            };
        } else {
            options = {
                databaseXmlFile: 'www/targets/StonesAndChips.xml',
                targetList: targets,
                vuforiaLicense: app.vuforiaLicense,
                overlayMessage: overlayMessage,
                showDevicesIcon: true,
                showAndroidCloseButton: true,
                autostopOnImageFound: false
            };
        }

        // Start Vuforia with our options
        navigator.VuforiaPlugin.startVuforia(
            options,
            successCallback || app.vuforiaMatch,
            function(data) {
                alert("Error: " + data);
            }
        );
    },
    vuforiaMatch: function(data) {
        // To see exactly what `data` can contain, see 'Success callback `data` API' within the plugin's documentation.
        console.log(data);

        // Have we found an image?
        if(data.status.imageFound) {
            // If we are using simple options, alert the image name
            if(app.simpleOptions) {
                alert("Image name: "+ data.result.imageName);
            } else { // If we are using full options, add the image to an array of images matched
                app.matchedImages.push(data.result.imageName);
                app.playSound(); // Play a sound so that the user has some feedback
            }
        }
        // Are we manually closing?
        else if (data.status.manuallyClosed) {
            // Let the user know they've manually closed Vuforia
            alert("User manually closed Vuforia!");

            // If we've matched any images, tell the user what we found
            if(app.matchedImages.length){
                alert("Found:\n"+app.matchedImages);
            }
        }
    },
    // Stop the Vuforia plugin
    stopVuforia: function(){
        navigator.VuforiaPlugin.stopVuforia(function (data) {
            console.log(data);

            if (data.success == 'true') {
                alert('TOO SLOW! You took too long to find an image.');
            } else {
                alert('Couldn\'t stop Vuforia\n'+data.message);
            }
        }, function (data) {
            console.log("Error stopping Vuforia:\n"+data);
        });
    },
    // Play a bell sound
    playSound: function(resumeTrackers) {
        // Where are we playing the sound from?
        var soundURL = app.getMediaURL("sounds/sound.wav");

        // Setup the media object
        var media = new Media(soundURL, function(){
            console.log('Sound Played');

            navigator.VuforiaPlugin.startVuforiaTrackers(
                function() {
                    console.log('Started tracking again')
                },
                function() {
                    console.log('Could not start tracking again')
                }
            );
        }, app.mediaError);
        // Play the sound
        media.play();
    },
    // Get the correct media URL for both Android and iOS
    getMediaURL: function(s) {
        if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
        return s;
    },
    // Handle a media error
    mediaError: function(e) {
        alert('Media Error');
        alert(JSON.stringify(e));
    }
};

app.initialize();