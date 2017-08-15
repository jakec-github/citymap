var markers = [
  {
    place: "Westfield, Stratford City",
    type: "Shopping Centre",
    selected: true
  },
  {
    place: "Westfield, Sheperd's Bush",
    type: "Shopping Centre",
    selected: true
  },
  {
    place: "Big Ben",
    type: "Landmark",
    selected: true
  },
  {
    place: "Tower Bridge",
    type: "Landmark",
    selected: true
  },
  {
    place: "Bengal Clipper London",
    type: "Restaurant",
    selected: true
  },
]

function Marker(data){
  this.place = data.place;
  this.type = data.type;
  this.selected = ko.observable(data.selected);
}

var stopTypes = [
  {name: "All"},
  {name: "Shopping Centre"},
  {name: "Landmark"},
  {name: "Restaurant"}
]

function StopType(data){
  this.name = data.name;
}

function ViewModel(){
  var self = this;

  this.markerList = ko.observableArray([]);
  // this.activeMarkerList = ko.observableArray([]);

  this.stopTypeList = ko.observableArray([]);

  stopTypes.forEach(function(data){
    self.stopTypeList.push(new StopType(data));
  })
  console.log(this.stopTypeList());

  markers.forEach(function(data){
    self.markerList.push(new Marker(data));
  })

  this.changeSelection = function(type){
    if (type === "All"){
      this.selected = true;
    }
    else{
      if(type === this.type){
        this.selected = true;
      }
      else{
        this.selected = false;
      }
    }
  }
};

ko.applyBindings(new ViewModel());
