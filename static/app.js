// TODO Sort out variable names markers, place/title

var markers = [
  {
    place: "Westfield, Stratford City",
    type: "Shopping Centre",
    latLng: {lat: 51.5431462, lng: -0.0094241},
    selected: true
  },
  {
    place: "Westfield, Sheperd's Bush",
    type: "Shopping Centre",
    latLng: {lat: 51.5072009, lng: -0.2234408},
    selected: true
  },
  {
    place: "Big Ben",
    type: "Landmark",
    latLng: {lat: 51.5007292, lng: -0.1268141},
    selected: true
  },
  {
    place: "Trafalgar Square",
    type: "Landmark",
    latLng: {lat: 51.50809, lng: -0.1291379},
    selected: true
  },
  {
    place: "Picadilly Circus",
    type: "Landmark",
    latLng: {lat: 51.5100913, lng: -0.1367563},
    selected: true
  },
  {
    place: "St. Paul's Cathedral",
    type: "Landmark",
    latLng: {lat: 51.5137036, lng: -0.1235211},
    selected: true
  },
  {
    place: "Tower Bridge",
    type: "Landmark",
    latLng: {lat: 51.5055111, lng: -0.0775479},
    selected: true
  },
  {
    place: "Côte Brasserie, Covent Garden",
    type: "Restaurant",
    latLng: {lat: 51.510732, lng: -0.129011},
    selected: true
  },
  {
    place: "Bengal Clipper London",
    type: "Restaurant",
    latLng: {lat: 51.5026788, lng: -0.0733441},
    selected: true
  },
  {
    place: "The Jugged Hare",
    type: "Restaurant",
    latLng: {lat: 51.5209403, lng: -0.0944057},
    selected: true
  },
  {
    place: "SUSHISAMBA",
    type: "Restaurant",
    latLng: {lat: 51.5161743, lng: -0.0831289},
    selected: true
  },
  {
    place: "The Blues Kitchen, Camden",
    type: "Restaurant",
    latLng: {lat: 51.536966, lng: -0.1433907},
    selected: true
  },
  {
    place: "The Angel",
    type: "Restaurant",
    latLng: {lat: 51.5340176, lng: -0.109621},
    selected: true
  }
]

function Marker(data){
  this.place = data.place;
  this.type = data.type;
  this.selected = ko.observable(data.selected);
}

function ViewModel(){
  var self = this;

  this.selection = ko.observable("All");

  this.markerList = ko.observableArray([]);

  this.stopTypeList = ko.observableArray(["All", "Shopping Centre", "Landmark", "Restaurant"]);

  console.log(this.stopTypeList());

  markers.forEach(function(data){
    self.markerList.push(new Marker(data));
  });

  this.activeMarkerList = ko.computed(function(){
    if(self.selection() === "All"){
      return self.markerList();
    }
    else {
      var newList = [];
      markers.forEach(function(data){
        if(data.type === self.selection()){
          newList.push(new Marker(data));
        }
      })
      return newList;
    }
  });

  this.changeSelection = function(newSelection){
    self.selection(newSelection);
    if(self.selection() === "All"){
      mapMarkers.forEach(function(data){
        data.setMap(map);
      });
    }
    else{
      mapMarkers.forEach(function(data){
        if(data.type !== self.selection()){
          data.setMap(null);
        }
        else {
          data.setMap(map);
        }
      });
    }
  };
  this.showInfo = function(data){
    var marker;
    mapMarkers.forEach(function(markerData){
      if(markerData.title === data.place){
        marker = markerData;
      }
    });
    map.setCenter(recenterMap(marker.getPosition().toJSON()));
    console.log(marker.title);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    populateInfoWindow(marker, largeInfoWindow);
    setTimeout(function(){
      marker.setAnimation(null);
    }, 750);
  };
};

ko.applyBindings(new ViewModel());
