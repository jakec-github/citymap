const FOURSQUARE_CLIENT_ID = "2YYXN2WBQXGN2DXBR44B4O232RSQNS0FNXEWCJG4C02RY0C0";
const FOURSQUARE_CLIENT_SECRET = "BFDLM5IG313AEAQFSNLNSKMXBIXDBL34Z3TMV1QR3ZSQU4NF";
const INITIAL_CENTER = {lat: 51.5074, lng: -0.1278};

// Defines infoWindow outside initMap so that it can be accessed in ViewModel
let largeInfoWindow;

// Compensates for floating sidebar
function recenterMap(latLng){
  latLng.lng -= 0.05;
  return latLng;
}

// Creates an infoWindow for the marker including photo
function populateInfoWindow(marker, infoWindow){
  if (infoWindow != marker){
    infoWindow.setContent('<div>' + marker.title + '</div>');
    getFourSquarePhoto(marker, infoWindow);
    infoWindow.marker = marker;
    infoWindow.open(map, marker);
    infoWindow.addListener('closeclick', function(){
      infoWindow.marker = null;
    });
  }
}

// Uses ajax calls to the Foursquare API to get a photo from each location
function getFourSquarePhoto(marker, infoWindow){

  //Uses the marker title and latLng to identify the venue on Foursquare
  let fourSquareTimeout = setTimeout(function(){
    infoWindow.setContent(infoWindow.getContent() + '<p>No Photo Available</p>');
  }, 8000);
  position = marker.getPosition().toUrlValue();
  url = 'https://api.foursquare.com/v2/venues/search?ll=';
  url += position;
  url += '&client_id=';
  url += FOURSQUARE_CLIENT_ID;
  url += '&client_secret=';
  url += FOURSQUARE_CLIENT_SECRET;
  url += '&v=20170707&query=';
  url += marker.title.replace(/ /g, '+');

  // First call gets the 'venue id'
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(response){
      id = response.response.venues[0].id;
      url = 'https://api.foursquare.com/v2/venues/';
      url += id;
      url += '/photos?client_id=';
      url += FOURSQUARE_CLIENT_ID;
      url += '&client_secret=';
      url += FOURSQUARE_CLIENT_SECRET;
      url += '&v=20170707&limit=1';

      //Second call uses the id to get the photo
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(response){
          imgUrl = response.response.photos.items[0].prefix;
          imgUrl += '150x150';
          imgUrl += response.response.photos.items[0].suffix;
          infoWindow.setContent(infoWindow.getContent() + '<img src="' + imgUrl + '">');
          clearTimeout(fourSquareTimeout);
        }
      });
    }
  });

}

// Defines the map and an array for the markers outside initMap
let map;
let mapMarkers = [];


function initMap() {

  let self = this;

  // Custom map style with modified colours
  let mapStyle = new google.maps.StyledMapType(
    [
      {
      'featureType': 'water',
      'elementType': 'all',
      'stylers': [
          {
              'visibility': 'on'
          },
          {
              'color': '#569AF8'
          },
          {
              'lightness': '2'
          }
      ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#F96365'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }
], {name: 'City Map'}
  );

  // Defines map using INITIAL_CENTER and applies style
  map = new google.maps.Map(document.getElementById('map'), {
    center: recenterMap(INITIAL_CENTER),
    zoom: 12,
    mapTypeControl: false,
    mapTypeId: 'styled_map',
    // scrollwheel: false
  });
  map.mapTypes.set('styled_map', mapStyle);

  // Assigns InfoWindow class to largeInfoWindow
  largeInfoWindow = new google.maps.InfoWindow();

  // Creates markers for each location
  places.forEach(function(data){
    let marker = new google.maps.Marker({
      map: map,
      position: data.latLng,
      title: data.title,
      type: data.type,
      animation: google.maps.Animation.DROP,
      icon: ('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
    });
    marker.addListener('click', function(){
      populateInfoWindow(this, largeInfoWindow);
    });
  mapMarkers.push(marker);
  });
}
