# City Map

This website presents users with a map and a series of marked locations. Users can filter locations using preset categories. When a location is clicked on in the map or sidebar the name and a photograph from Foursquare is shown.

## Install

Can be installed from github repository.

`git clone ...`

## Usage

### Requirements

To run the server a Vagrantfile is included in the repository. This will set up a virtual machine with all the necessary dependencies.

Running the virtual machine requires vagrant and Virtual Box.

Instructions for downloading Virtual Box can be found [here](https://www.virtualbox.org/).

And instructions for installing vagrant can be found [here](https://www.vagrantup.com/downloads.html).

Navigate to the map_project directory and use the command `vagrant up` to start the machine. Use `vagrant halt` to stop it.

### Running the server

To start the server navigate to the map_project directory and run the app.py module using python 3 eg:

`python3 app.py`

Visit localhost:5000 once the server is running to access the website.

## APIs

This project makes use of the Google Maps Javascript API and the Foursquare API.
