# WNM 499: Midterm
## The Problem

You're on your way home from work, and you decide to stop by the grocery store because you remember you're low on milk. But you can't remember what else you need because you didn't make a list that morning. You've considered buying a smart fridge for this very problem, but those cost at least $6,000, and you already have a perfectly working fridge that won't need replacing for the next several years.

## The Solution

A device that can turn any fridge into a smart fridge. It would sit on the counter next to the fridge, and would be equppied with a camera, a small touch screen, and a motion sensor. The touch screen would be the main display and interface. The camera would be used to take pictures of food items. The motion sensor would be used to turn the screen on whenever it senses motion, and turn the screen off when it detects no motion for at least 30 seconds. 

## High Level System Design

![High-Level System Design](https://raw.githubusercontent.com/JesusGuerrero/amber-iot/master/midterm/ConnectivityDiagram.png?token=AU8YJvk0Nre8dwD4mlnn245Hljx2VN38ks5YEYERwA%3D%3D)

The end goal is to have the device connected to the internet so that it can be accessed from devices on different networks. However, for the purposes of early prototyping, we will be testing on a private local area network. Public internet access to be implemented at a later date.

## Prototype

![Prototype](https://raw.githubusercontent.com/JesusGuerrero/amber-iot/master/midterm/Hardware%20Diagram.png?token=AU8YJl1oOOmtVi-1PlbyZNo6oeHBWundks5YEYIbwA%3D%3D)

These are the major components necessary for this project. More sensors and/or outputs may be added at a later date.

## Development
### Provisioning
The RaspberryPi is a mini-computer which needs to be provisioned. Here are the steps:
* Using a personal laptop download [NOOBS](https://www.raspberrypi.org/downloads/noobs/) 
* Extract the contents into a clean micro-sd card with at least 8GB of room
* Open recovery.cmdline and add `silentinstall` at the end (this will allow it to install without user input)
* Put micro-sd card into Pi, turn on, and wait 30 minutes for the installation to finish
* With laptop connected to wireless internet, choose to share internet via ethernet port 
* Use a Unitek USB-to-Ethernet device to connect your laptop computer's usb port into the Pi's ethernet port
* SSH into the Pi with your laptop's terminal. `ssh pi@192.168.2.2` (if that doesn't work try `arp -a` to find the Pi's IP address)
* Using the terminal to control the Pi, download the remote desktop tool. `sudo apt-get install tightvncserver`
* Start VNCServer by typing `vncserver`. The first time you launch it will ask you to create a password.
* On your laptop, download [VNC Viewer](https://www.realvnc.com/download/viewer/) and use the following address to login: 192.168.2.2:1 (or whatever IP address the Pi is at)
* Using the Raspbian Desktop, open up the terminal, then install and configure the following:
   
   * git
   * node
   * vim
   * Chromium
   
* Use the following commands to verify that the above programs are correctly installed:
   * `git --version`
   * `node -v`
   * `npm -v`
   * `vim -v`
   * `chromium-browser --version`
   
### Integrating

*Work in progress*
