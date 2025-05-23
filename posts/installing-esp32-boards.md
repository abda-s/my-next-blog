---
title: Setting up ESP32
description: A guide when you start out with esp32
date: 2025-01-08
tags:
  - ESP
draft: "false"
---
1. In your Arduino IDE, go to File> Preferences
![](/my-next-blog/images/cb01610af34d69ff1a3188871c335dcb.png)
2. Enter the following into the “Additional Board Manager URLs” field:
```
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```
Then, click the “OK” button:
![](/my-next-blog/images/f7abe2e74e2ffe95efd890f0edf59f5a.png)

**Note**:if you already have the ESP8266 boards URL, you can separate the URLs with a comma as follows
```txt
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json, http://arduino.esp8266.com/stable/package_esp8266com_index.json
```

3. Open the Boards Manager. Go to Tools > Board > Boards Manager…
![](/my-next-blog/images/52d1a8a26fe7b9561762c910a3ec0a93.png)

4. Search for ESP32 and press install button for the “ESP32 by Espressif Systems“:
![](/my-next-blog/images/dd29c64227718cbc1cbccf3384af0775.png)

5. That’s it. It should be installed after a few seconds.
![](/my-next-blog/images/b45bcc6dbf1e890d6af528b697911467.png)


6. and don't forget to download the [drivers](https://drive.google.com/file/d/1TCEtkAoYKrJs-ypomD6y4LwpcRnMuvAK/view?usp=sharing) for windows 



