# DoD_Markings
Outlook Addin for DoD Markings

## Requirements

### Software
- npm
- sudo 
- git
- (optional) Docker, to use a docker container
- (optional) lsof, to check if port is in use
- Operating system: Any Unix based system (AKA not windows)

## Installation and configuration Guide

This section will describe how to transform the source code into an running webserver awaiting connections.

Client must first install the required packages onto their machine. Then clients must log in to a non root user. To create a new user, look at the Dockerfile attached to this repository.

Pull the code from this repository into the user's home folder (Or anywhere under the users home folder).

Run the following commands

TODO: Complete this section, I could never get Reyburn's app to work on my local machine

If an error occurs, ensure nothing is running on port 3000 by using `lsof -i :3000`


# Developer TODO

- Fix Dockerfile to add secrets
- Complete installation and configuration guide

