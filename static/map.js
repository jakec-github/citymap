initialCenter = {lat: 51.5074, lng: -0.1278};

function recenterMap(latLng){
  latLng.lng -= 0.028;
  return latLng;
}

console.log(recenterMap(initialCenter));

var map;
function initMap() {

  var mapStyle = new google.maps.StyledMapType(
    [
      {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#569AF8"
          },
          {
              "lightness": "2"
          }
      ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#F96365"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
], {name: 'City Map'}
  );
  map = new google.maps.Map(document.getElementById('map'), {
    center: recenterMap(initialCenter),
    zoom: 12,
    mapTypeControl: false,
    mapTypeId: 'styled_map',
    // scrollwheel: false
  });
  map.mapTypes.set('styled_map', mapStyle);
}
