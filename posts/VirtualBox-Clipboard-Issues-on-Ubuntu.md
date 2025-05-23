---
title: VirtualBox Clipboard Issues on Ubuntu
date: 2024-12-09
tags:
  - linux
description: Having trouble with clipboard sharing in VirtualBox on Ubuntu? Despite enabling bidirectional settings and installing Guest Additions, copy-paste between host and guest systems fails. Here’s how to fix it by updating packages and enabling clipboard support.
draft: "false"
---

I'm running Ubuntu on VirtualBox on a Windows host. Despite setting up everything I could think of, the clipboard functionality refuses to cooperate. Here’s a breakdown of my situation and the steps I’ve tried so far.

#### What’s Set Up:

1. **Guest Additions Installed**:  
    The `vbox_GAs_6.1.36` icon appears correctly, and shared folders between the VirtualBox guest and the Windows host work without a hitch.
    
2. **Extension Pack Installed**:  
    I’ve installed `Oracle_VM_VirtualBox_Extension_Pack.vbox-extpack-6.1.36a`.
    
3. **Clipboard Settings**:  
    Clipboard sharing is set to _Bidirectional_ under the **Devices** menu.
    
4. **Drag and Drop**:  
    Set to _Bidirectional_ as well, but it doesn’t work either.
    

#### The Problem:

- Copying text from Google Chrome on the host and pasting it into Firefox within the VirtualBox guest doesn’t work.
- Copying text from Notepad on the host and pasting it into LibreOffice Writer on the guest also fails.

#### What I’ve Tried:

I’ve double-checked all settings and even reinstalled Guest Additions, but the clipboard issue persists.

#### Possible Solution:

If you’re facing a similar problem, the following commands might resolve it:

1. **Update and Install Necessary Packages**  
    Run the following commands in your Ubuntu terminal:
    
    ```bash
    sudo apt-get update
    sudo apt-get install virtualbox-guest-x11
    sudo apt install linux-headers-$(uname -r) build-essential dkms
    ```
    
2. **Enable Clipboard Support**  
    Once the above packages are installed, run:
    
    ```bash
    sudo VBoxClient --clipboard
    ```
    
    Then, restart your virtual machine, after restarting the VM if it still does not work do the same command again and it will work inshallah:
    

These steps should enable clipboard functionality. If it still doesn’t work, double-check that the Guest Additions installation was successful and matches your VirtualBox version.