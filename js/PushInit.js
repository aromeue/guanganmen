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


function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);

    if(networkState==Connection.NONE) {
        //window.location="senseconnexio.html";
    } else {
        //if(window.location=="file:///android_asset/www/senseconnexio.html") <!-- Per a Androids -->
        //	window.location="index.html";
    }

    //alert("url:"+window.location);
}

function registerPush() {
    //$("#app-status-ul").append("<li>Creant pushNotificaion</li>");
    var pushNotification = window.plugins.pushNotification;

    //$("#app-status-ul").append("<li>Registrant</li>");
    var res = pushNotification.register(
        function (token) {
            //$("#app-status-ul").append("<li>Token:"+token+"</li>");
            console.log(token);
        },
        function (error) {
            //$("#app-status-ul").append("<li>Error:"+error+"</li>");
            console.log(error);
        },
        {
            "senderID":"675581025503",
            "ecb":"onNotification"
        });
   // $("#app-status-ul").append("<li>Resultat:"+res+"</li>");

}

function FBLogin() {
	var appId = "549790568449986";
	facebookConnectPlugin.browserInit(appId);
}

function onNotification(e) {
   // $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
              //  $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
                $.post('http://www.clinicasguanganmen.es/m/push/registro.php',{'name':device.uuid,regId: e.regid});
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( e.foreground )
            {
             //   $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
                // on Android soundname is outside the payload.
                // On Amazon FireOS all custom attributes are contained within payload
                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/"+ soundfile);
                my_media.play();
            }
		/*
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
			
                if ( e.coldstart )
                {
                    //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                    alert('--COLDSTART NOTIFICATION--')
                }
                else
                {
                    //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    alert('--BACKGROUND NOTIFICATION--')
                }
            }
            alert('MESSAGE -> MSG: ' + e.payload.message + '\nMESSAGE -> MSGCNT: ' + e.payload.msgcnt);
		*/
			
            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.callback + '</li>');
            //Only works for GCM
            //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            //Only works on Amazon Fire OS
            //$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
            break;

        case 'error':
            //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

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
        document.addEventListener("offline", this.onGoOffline, false);
        document.addEventListener("online", this.onGoOffline, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('onNotification', this.onNotification, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        registerPush();
		FBLogin();
        app.receivedEvent('deviceready');
    },
    onGoOffline: function() {
        //Comprova conexio a internet
        checkConnection();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        alert(id);
    },
    successHandler: function(result) {
        alert('Callback Success! Result = '+result)
    },
    errorHandler:function(error) {
        alert(error);
    }
};
