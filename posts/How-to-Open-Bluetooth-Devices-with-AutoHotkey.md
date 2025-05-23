---
title: How to Open Bluetooth Devices with Win + Shift + B Using AutoHotkey
description: Learn how to create a custom keyboard shortcut using AutoHotkey to open Bluetooth settings with Win + Shift + B on Windows.
date: 2025-04-02
tags:
  - Automation
draft: "false"
---
If you're looking to streamline your workflow and access Bluetooth settings quickly, using **Win + Shift + B** to open Bluetooth devices is a fantastic shortcut! Here’s a step-by-step guide on how to set it up with **AutoHotkey (AHK)**.

---

### Step 1: Install AutoHotkey

First, you'll need to install AutoHotkey on your system.

1. Go to the [AutoHotkey website](https://www.autohotkey.com/) and download the installer.
2. Follow the instructions to install AutoHotkey on your computer.
    

---

### Step 2: Create the AutoHotkey Script

Now that you have AutoHotkey installed, you’ll need to create a script that maps the **Win + Shift + B** keyboard shortcut to open Bluetooth settings.

1. **Right-click on your Desktop**, select **New**, and then **AutoHotkey Script**.
    
2. Name the script **BluetoothShortcut.ahk**.
    
3. **Right-click** the newly created file and select **Edit Script**.
    
4. Delete any default content inside the file, and paste the following code:

```ahk
#+b::Run, ms-settings:bluetooth
return
```
**Explanation:**
    - `#` = Win key
    - `+` = Shift key
    - `b` = B key		
This line of code tells AutoHotkey to open Bluetooth settings when **Win + Shift + B** is pressed.
    
5. **Save the file** and **double-click** it to run the script.
    

After this, pressing **Win + Shift + B** will instantly open Bluetooth settings on your Windows machine.

---

### Step 3 (Optional): Run on Startup

If you want the script to run automatically every time you boot your computer, you can add it to your startup folder:

1. Press **Win + R**, type `shell:startup`, and hit **Enter**.
2. Copy your **BluetoothShortcut.ahk** script file into the **Startup** folder.
    

Now, every time you start Windows, the Bluetooth shortcut will be ready to use! 🎉