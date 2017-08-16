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
    place: "Tower Bridge",
    type: "Landmark",
    latLng: {lat: 51.5055111, lng: -0.0775479},
    selected: true
  },
  {
    place: "Bengal Clipper London",
    type: "Restaurant",
    latLng: {lat: 51.5026788, lng: -0.0733441},
    selected: true
  },
]

function Marker(data){
  this.place = data.place;
  this.type = data.type;
  this.selected = ko.observable(data.selected);
}

// var stopTypes = [
//   {name: "All"},
//   {name: "Shopping Centre"},
//   {name: "Landmark"},
//   {name: "Restaurant"}
// ]
//
// function StopType(data){
//   this.name = data.name;
// }

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
    mapMarkers.forEach(function(data){
      if(data.type !== self.selection()){
        data.setMap(null);
      }
      else {
        data.setMap(map);
      }
    });
  };
  this.showInfo = function(data){
    var marker;
    mapMarkers.forEach(function(markerData){
      if(markerData.title === data.place){
        marker = markerData;
      }
    });
    console.log(marker.title);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    populateInfoWindow(marker, largeInfoWindow);
    setTimeout(function(){
      marker.setAnimation(null);
    }, 750);
  };
};

ko.applyBindings(new ViewModel());
