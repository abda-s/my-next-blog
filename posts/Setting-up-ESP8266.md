---
title: Setting up ESP8266
date: 2024-12-12
draft: "false"
tags:
  - ESP
description: A guide when you start out with esp8266
---

# esp8266 Diagram 
![](/images/8a1901b6b834b9f702bc8b98f1865959.png)

1.  In your Arduino IDE, go to File> Preferences
	![](/images/25c1dcb22468c322c64fae03eeb38268.png)
	
2. Enter the following into the “Additional Board Manager URLs” field:
```
 http://arduino.esp8266.com/stable/package_esp8266com_index.json
```
click the “OK” button:
	![](/images/cb2a6a5bc38d8fb0ed3c738c7666fb57.png)
**Note**:if you already have the ESP8266 boards URL, you can separate the URLs with a comma as follows
```txt
https://dl.espressif.com/dl/package_esp32_index.json, http://arduino.esp8266.com/stable/package_esp8266com_index.json
```
	
3. Open the Boards Manager. Go to Tools > Board > Boards Manager…
	![](/images/dca58c790d2582c1a35485c0f4eeb457.png)
	
4. Search for ESP8266 and press install button for the “ESP32 by Espressif Systems“:
	![](/images/4cf3bafdc181e501c758294e42974b24.png)
	
5. That’s it. It should be installed after a few seconds.
	![](/images/aa1a8bef9d8e750951f1346f42f92aed.png)