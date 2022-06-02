# DOD Marking tool v2
Author: Sean Brady

## Requirements
### Software
- sudo
- npm
- wget 
- lsof
- git
- OS:Linux but any Unix system should work;
### Hardware
TODO

## Installation guide

Before following this guide, ensure you are an logged in to a non root user with sudo permissions in an owned folder. This guide currently assumes you are testing locally on a machine.

To begin, clone this git repo to your local machine and change directory into the folder.

For the following installs, you may need to replace `--global` with `--location=global`

You need http-server to run the local web server. If you haven't installed this yet you can do this with the following command:

`npm install --global http-server`
You need Office-Addin-dev-certs to generate self-signed certificates to run the local web server. If you haven't installed this yet you can do this with the following command:

`npm install --global office-addin-dev-certs`
Clone or download this sample to a folder on your computer. Then go to that folder in a console or terminal window.

Run the following command to generate a self-signed certificate that you can use for the web server.

`npx office-addin-dev-certs install`
The previous command will display the folder location where it generated the certificate files.

Go to the folder location where the certificate files were generated. Copy the localhost.crt and localhost.key files to the hello world sample folder.

Run the following command:

`http-server -S -C localhost.crt -K localhost.key --cors . -p 3000`
The http-server will run and host the current folder's files on localhost:3000.

Now that your localhost web server is running, you can sideload the manifest-localhost.xml file provided in the outlook-hello-world folder. Using the manifest-localhost.xml file, follow the steps in Run the sample on Outlook on Web to sideload and run the add-in.

# TODO

Improve software Design
Improve frontend looks






