---
title: 
description: 
date: 
tags: 
draft: "true"
---
```cpp
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>

// Wi-Fi credentials
const char* ssid = "Salameh";           // Replace with your Wi-Fi SSID
const char* password = "1271985@MAHA";  // Replace with your Wi-Fi password

// WebSocket server details
const char* websocketServer = "192.168.1.7";  // Server IP
const int websocketPort = 4000;               // Server port
const char* websocketPath = "/";              // WebSocket path  

WebSocketsClient webSocket;
bool ledIsOn = false;  // Track LED state locally


#define LED_BUILTIN 2  // GPIO2 (D4) is the built-in LED
void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("[WSc] Disconnected");
      digitalWrite(LED_BUILTIN, HIGH);  // Turn off LED
      ledIsOn = false;
      webSocket.sendTXT("DISCONNECTED"); // Notify frontend
      break;
    case WStype_CONNECTED:
      Serial.println("[WSc] Connected");
      webSocket.sendTXT("CONNECTED"); // Notify frontend
      webSocket.sendTXT(ledIsOn ? "ON" : "OFF"); // Send LED state
      break;
    case WStype_TEXT:
      {
        String message = (char*)payload;
        if (message == "PING") {
          webSocket.sendTXT("CONNECTED"); // Respond with connected status
        } else if (message == "GET_STATE") {
          webSocket.sendTXT(ledIsOn ? "ON" : "OFF");
        } else if (message == "ON" || message == "OFF") {
          bool requestedState = (message == "ON");
          if (requestedState != ledIsOn) {
            digitalWrite(LED_BUILTIN, requestedState ? LOW : HIGH);
            ledIsOn = requestedState;
            webSocket.sendTXT(message.c_str());
            Serial.printf("LED: %s\n", message.c_str());
          }
        }
        break;
      }
    case WStype_ERROR:
      Serial.println("[WSc] Error");
      break;
  }
}
void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);  // Start with LED OFF
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  webSocket.begin(websocketServer, websocketPort, websocketPath);
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();  // No heartbeats needed
}
```

```js
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

const socket = new WebSocket('ws://192.168.1.7:4000');
  

const LedController = () => {
    const [ledStatus, setLedStatus] = useState('OFF');
    const [isEspConnected, setIsEspConnected] = useState(false);
    let pingTimeout = null;

  

    useEffect(() => {
        const sendPing = () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send('PING');


                // Wait 5 seconds for a response, otherwise mark ESP as disconnected

                pingTimeout = setTimeout(() => {
                    setIsEspConnected(false);
                }, 5000);
            }
        };

  

        const handleMessage = (event) => {
            const message = event.data;
            if (message === 'CONNECTED') {
                setIsEspConnected(true);
                clearTimeout(pingTimeout); // Clear timeout if ESP responds
                socket.send('GET_STATE'); // Ask for LED state
            } else if (message === 'DISCONNECTED') {
                setIsEspConnected(false);
            } else if (message === 'ON' || message === 'OFF') {
                setLedStatus(message);
            }
        }

        const handleOpen = () => {
            sendPing(); // Check ESP status on WebSocket connection
            setInterval(sendPing, 5000); // Keep checking every 5 seconds
        };

        const handleClose = () => {
            setIsEspConnected(false);
        };

        socket.addEventListener('open', handleOpen);
        socket.addEventListener('message', handleMessage);
        socket.addEventListener('close', handleClose);

        return () => {
            socket.removeEventListener('open', handleOpen);
            socket.removeEventListener('message', handleMessage);
            socket.removeEventListener('close', handleClose);
            clearTimeout(pingTimeout);
        };

    }, []);

  

    const handleLedControl = (status) => {
        if (status === ledStatus || !isEspConnected) return;
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(status);
        }
    };

  

    return (
        <Box sx={{ marginTop: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleLedControl('ON')}
                sx={{ marginRight: 2 }}
                disabled={!isEspConnected}
            >

                Turn LED ON

            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleLedControl('OFF')}
                disabled={!isEspConnected}
            >

                Turn LED OFF

            </Button>

  

            <Box sx={{
                marginTop: 2,
                width: 50,
                height: 50,
                backgroundColor: !isEspConnected ? 'gray' : (ledStatus === 'ON' ? 'green' : 'red'),
                transition: 'background-color 0.3s ease'
            }} />
        </Box>

    );

};

export default LedController;
```

## the version that works with the lots of users
```cpp
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// Wi-Fi credentials
const char* ssid = "Airbox-E798";           // Replace with your Wi-Fi SSID
const char* password = "HH65Cm6U";  // Replace with your Wi-Fi password

// WebSocket server details
const char* websocketServer = "192.168.1.164";  // Server IP
const int websocketPort = 4000;               // Server port
const char* websocketPath = "/";              // WebSocket path

WebSocketsClient webSocket;
bool ledIsOn = false;  // Track LED state locally

#define LED_BUILTIN 2  // GPIO2 (D4) is the built-in LED

// Generate a unique ESP ID based on the chip ID
String espId = "ESP_" + String(ESP.getChipId());

// Function to send JSON message
void sendJsonMessage(const char* type, const char* value) {
    StaticJsonDocument<256> jsonDoc;
    jsonDoc["espId"] = espId;
    jsonDoc["type"] = type;
    jsonDoc["value"] = value;

    String jsonString;
    serializeJson(jsonDoc, jsonString);
    webSocket.sendTXT(jsonString);
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
    switch (type) {
        case WStype_DISCONNECTED:
            Serial.println("[WSc] Disconnected");
            digitalWrite(LED_BUILTIN, HIGH);  // Turn off LED
            ledIsOn = false;
            sendJsonMessage("status", "DISCONNECTED");
            break;

        case WStype_CONNECTED:
            Serial.println("[WSc] Connected");
            sendJsonMessage("status", "CONNECTED");
            sendJsonMessage("ledState", ledIsOn ? "ON" : "OFF");
            break;

        case WStype_TEXT: {
            String message = (char*)payload;
            Serial.printf("Received: %s\n", message.c_str());

            // Parse incoming JSON
            StaticJsonDocument<256> jsonDoc;
            DeserializationError error = deserializeJson(jsonDoc, message);
            if (error) {
                Serial.println("JSON Parsing Failed");
                return;
            }

            // Check if the message is meant for this ESP
            if (!jsonDoc.containsKey("espId") || jsonDoc["espId"] != espId) {
                Serial.println("Message ignored (not for this ESP)");
                return;
            }

            // Process the command
            if (jsonDoc.containsKey("command")) {
                String command = jsonDoc["command"];

                if (command == "PING") {
                    sendJsonMessage("status", "CONNECTED");
                } else if (command == "GET_STATE") {
                    sendJsonMessage("ledState", ledIsOn ? "ON" : "OFF");
                } else if (command == "ON" || command == "OFF") {
                    bool requestedState = (command == "ON");

                    if (requestedState != ledIsOn) {
                        digitalWrite(LED_BUILTIN, requestedState ? LOW : HIGH);
                        ledIsOn = requestedState;
                        sendJsonMessage("ledState", command.c_str());
                        Serial.printf("LED: %s\n", command.c_str());
                    }
                }
            }
            break;
        }

        case WStype_ERROR:
            Serial.println("[WSc] Error");
            break;
    }
}

void setup() {
    Serial.begin(115200);
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);  // Start with LED OFF

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");

    webSocket.begin(websocketServer, websocketPort, websocketPath);
    webSocket.onEvent(webSocketEvent);
}

void loop() {
    webSocket.loop();  // No heartbeats needed
}

```

```js
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

const LedController = ({ espId }) => {
    const [ledStatus, setLedStatus] = useState('OFF');
    const [isEspConnected, setIsEspConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    let pingTimeout = null;

    useEffect(() => {
        const newSocket = new WebSocket('ws://192.168.1.164:4000');
        setSocket(newSocket);

        const sendPing = () => {
            if (newSocket.readyState === WebSocket.OPEN) {
                const pingMessage = JSON.stringify({ espId, command: 'PING' });
                newSocket.send(pingMessage);

                // Wait 5 seconds for a response, otherwise mark ESP as disconnected
                pingTimeout = setTimeout(() => {
                    setIsEspConnected(false);
                }, 5000);
            }
        };

        const handleMessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.espId !== espId) return; // Ignore messages not meant for this ESP

            if (message.type === 'status') {
                if (message.value === 'CONNECTED') {
                    setIsEspConnected(true);
                    clearTimeout(pingTimeout);
                    newSocket.send(JSON.stringify({ espId, command: 'GET_STATE' })); // Ask for LED state
                } else if (message.value === 'DISCONNECTED') {
                    setIsEspConnected(false);
                }
            } else if (message.type === 'ledState') {
                setLedStatus(message.value);
            }
        };

        const handleOpen = () => {
            sendPing();
            setInterval(sendPing, 5000);
        };

        const handleClose = () => {
            setIsEspConnected(false);
        };

        newSocket.addEventListener('open', handleOpen);
        newSocket.addEventListener('message', handleMessage);
        newSocket.addEventListener('close', handleClose);

        return () => {
            newSocket.removeEventListener('open', handleOpen);
            newSocket.removeEventListener('message', handleMessage);
            newSocket.removeEventListener('close', handleClose);
            clearTimeout(pingTimeout);
            newSocket.close();
        };
    }, [espId]); // Reconnect if espId changes

    const handleLedControl = (status) => {
        if (status === ledStatus || !isEspConnected) return;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ espId, command: status }));
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleLedControl('ON')}
                sx={{ marginRight: 2 }}
                disabled={!isEspConnected}
            >
                Turn LED ON
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleLedControl('OFF')}
                disabled={!isEspConnected}
            >
                Turn LED OFF
            </Button>

            <Box sx={{
                width: 20,
                height: 20,
                mx: 2,
                borderRadius: '50%',
                backgroundColor: !isEspConnected ? 'gray' : (ledStatus === 'ON' ? 'green' : 'red'),
                transition: 'background-color 0.3s ease'
            }} />
        </Box>
    );
};

export default LedController;

```

## led truns off from esp with real button
```cpp
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

const char* ssid = "Airbox-E798";           
const char* password = "HH65Cm6U";  

const char* websocketServer = "192.168.1.164";  
const int websocketPort = 4000;               
const char* websocketPath = "/";              

WebSocketsClient webSocket;
bool ledIsOn = false;  // Track LED state locally

#define LED_BUILTIN 2  // GPIO2 (D4) is the built-in LED
#define D1_PIN 5  // GPIO5 (D1) as input_pullup for OFF control

String espId = "ESP_" + String(ESP.getChipId());

void sendJsonMessage(const char* type, const char* value) {
    StaticJsonDocument<256> jsonDoc;
    jsonDoc["espId"] = espId;
    jsonDoc["type"] = type;
    jsonDoc["value"] = value;

    String jsonString;
    serializeJson(jsonDoc, jsonString);
    webSocket.sendTXT(jsonString);
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
    switch (type) {
        case WStype_DISCONNECTED:
            Serial.println("[WSc] Disconnected");
            digitalWrite(LED_BUILTIN, HIGH);  
            ledIsOn = false;
            sendJsonMessage("status", "DISCONNECTED");
            break;

        case WStype_CONNECTED:
            Serial.println("[WSc] Connected");
            sendJsonMessage("status", "CONNECTED");
            sendJsonMessage("ledState", ledIsOn ? "ON" : "OFF");
            break;

        case WStype_TEXT: {
            String message = (char*)payload;
            Serial.printf("Received: %s\n", message.c_str());

            StaticJsonDocument<256> jsonDoc;
            DeserializationError error = deserializeJson(jsonDoc, message);
            if (error) {
                Serial.println("JSON Parsing Failed");
                return;
            }

            if (!jsonDoc.containsKey("espId") || jsonDoc["espId"] != espId) {
                Serial.println("Message ignored (not for this ESP)");
                return;
            }

            if (jsonDoc.containsKey("command")) {
                String command = jsonDoc["command"];

                if (command == "PING") {
                    sendJsonMessage("status", "CONNECTED");
                } else if (command == "GET_STATE") {
                    sendJsonMessage("ledState", ledIsOn ? "ON" : "OFF");
                } else if (command == "ON" && !ledIsOn) {
                    digitalWrite(LED_BUILTIN, LOW);  // Turn LED ON
                    ledIsOn = true;
                    sendJsonMessage("ledState", "ON");
                }
            }
            break;
        }

        case WStype_ERROR:
            Serial.println("[WSc] Error");
            break;
    }
}

void setup() {
    Serial.begin(115200);
    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(D1_PIN, INPUT_PULLUP);  // D1 pin as input with internal pull-up resistor
    digitalWrite(LED_BUILTIN, HIGH);  // Start with LED OFF

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");

    webSocket.begin(websocketServer, websocketPort, websocketPath);
    webSocket.onEvent(webSocketEvent);
}

void loop() {
    webSocket.loop();

    // Check if D1 pin is connected to GND (LOW), turn off LED if it is
    if (digitalRead(D1_PIN) == LOW && ledIsOn) {
        digitalWrite(LED_BUILTIN, HIGH);  // Turn LED OFF
        ledIsOn = false;
        sendJsonMessage("ledState", "OFF");
    }
}

```