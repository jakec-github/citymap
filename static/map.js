// TODO Separate out tokens/secrets
// TODO Check all quotation marks. Some should be apostrophes

initialCenter = {lat: 51.5074, lng: -0.1278};

var largeInfoWindow;

function recenterMap(latLng){
  latLng.lng -= 0.05;
  return latLng;
}

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

function getFourSquarePhoto(marker, infoWindow){
  var fourSquareTimeout = setTimeout(function(){
    console.log("FourSquare timeout");
    infoWindow.setContent(infoWindow.getContent() + '<p>No Photo Available</p>');
  }, 8000);
  position = marker.getPosition().toUrlValue();
  url = 'http://api.foursquare.com/v2/venues/search?ll=';
  url += position;
  url += "&client_id=2YYXN2WBQXGN2DXBR44B4O232RSQNS0FNXEWCJG4C02RY0C0&client_secret=BFDLM5IG313AEAQFSNLNSKMXBIXDBL34Z3TMV1QR3ZSQU4NF&v=20170707&query=";
  url += marker.title.replace(/ /g, '+');
  $.ajax({
    url: url,
    dataType: "json",
    success: function(response){
      id = response.response.venues[0].id;
      url = "http://api.foursquare.com/v2/venues/";
      url += id;
      url += '/photos?client_id=2YYXN2WBQXGN2DXBR44B4O232RSQNS0FNXEWCJG4C02RY0C0&client_secret=BFDLM5IG313AEAQFSNLNSKMXBIXDBL34Z3TMV1QR3ZSQU4NF&v=20170707&limit=1';
      $.ajax({
        url: url,
        dataType: "json",
        success: function(response){
          imgUrl = response.response.photos.items[0].prefix;
          imgUrl += "150x150";
          imgUrl += response.response.photos.items[0].suffix;
          infoWindow.setContent(infoWindow.getContent() + '<img src="' + imgUrl + '">');
          clearTimeout(fourSquareTimeout);
        }
      });
    }
    // clearTimeout(fourSquareTimeout);
  });

};

var map;
var mapMarkers = [];


function initMap() {

  var self = this;

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

  largeInfoWindow = new google.maps.InfoWindow();

  markers.forEach(function(data){
    var marker = new google.maps.Marker({
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
    marker.addListener('click', function(){
      marker.setAnimation(null);
    });
  mapMarkers.push(marker);
  });
}
