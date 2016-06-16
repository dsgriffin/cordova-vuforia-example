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
        document.getElementById('start-vuforia').onclick = function () {
            app.startVuforia();
        };

        document.getElementById('start-and-stop-vuforia').onclick = function () {
            app.startVuforia();

            console.log('Starting timer...');

            // Wait for a timeout, then automatically stop Vuforia
            setTimeout(function(){
                app.stopVuforia();
            }, 5000);
        };

        document.getElementById('stop-vuforia').onclick = function () {
            app.stopVuforia();
        }
    },
    // Start the Vuforia plugin
    startVuforia: function(){
        navigator.VuforiaPlugin.startVuforia(
            'www/targets/StonesAndChips.xml',
            [ 'stones', 'chips' ],
            'Point your camera at a test image...',
            'YOUR_VUFORIA_KEY',
            function(data){
                console.log(data);
                alert("Image found: "+data.imageName);
            },
            function(data) {
                alert("Error: " + data);
            }
        );
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
            console.log("Error stopping Vuforia:");
            console.log(data);
        });
    }
};

app.initialize();