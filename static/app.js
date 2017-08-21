// Array of locations
let places = [
  {
    title: 'Westfield, Stratford City',
    type: 'Shopping Centre',
    latLng: {lat: 51.5431462, lng: -0.0094241},
    selected: true
  },
  {
    title: 'Westfield, Sheperd\'s Bush',
    type: 'Shopping Centre',
    latLng: {lat: 51.5072009, lng: -0.2234408},
    selected: true
  },
  {
    title: 'Big Ben',
    type: 'Landmark',
    latLng: {lat: 51.5007292, lng: -0.1268141},
    selected: true
  },
  {
    title: 'Trafalgar Square',
    type: 'Landmark',
    latLng: {lat: 51.50809, lng: -0.1291379},
    selected: true
  },
  {
    title: 'Picadilly Circus',
    type: 'Landmark',
    latLng: {lat: 51.5100913, lng: -0.1367563},
    selected: true
  },
  {
    title: 'St. Paul\'s Cathedral',
    type: 'Landmark',
    latLng: {lat: 51.5137036, lng: -0.1235211},
    selected: true
  },
  {
    title: 'Tower Bridge',
    type: 'Landmark',
    latLng: {lat: 51.5055111, lng: -0.0775479},
    selected: true
  },
  {
    title: 'Côte Brasserie, Covent Garden',
    type: 'Restaurant',
    latLng: {lat: 51.510732, lng: -0.129011},
    selected: true
  },
  {
    title: 'Bengal Clipper London',
    type: 'Restaurant',
    latLng: {lat: 51.5026788, lng: -0.0733441},
    selected: true
  },
  {
    title: 'The Jugged Hare',
    type: 'Restaurant',
    latLng: {lat: 51.5209403, lng: -0.0944057},
    selected: true
  },
  {
    title: 'SUSHISAMBA',
    type: 'Restaurant',
    latLng: {lat: 51.5161743, lng: -0.0831289},
    selected: true
  },
  {
    title: 'The Blues Kitchen, Camden',
    type: 'Restaurant',
    latLng: {lat: 51.536966, lng: -0.1433907},
    selected: true
  },
  {
    title: 'The Angel',
    type: 'Restaurant',
    latLng: {lat: 51.5340176, lng: -0.109621},
    selected: true
  }
];

// Creates the Place class including observable from the places array
function Place(data){
  this.title = data.title;
  this.type = data.type;
  this.selected = ko.observable(data.selected);
}

function ViewModel(){
  let self = this;

  // Controls the filter. Initiaised to 'All' or result in localStorage
  if (localStorage.getItem("selection")){
    this.selection = ko.observable(localStorage.getItem("selection"));
  }
  else {
    this.selection = ko.observable('All');
  }

  // Stores all the places in an observable Array
  this.markerList = ko.observableArray([]);
  places.forEach(function(data){
    self.markerList.push(new Place(data));
  });

  // Stores all the filters in an observable Array
  this.stopTypeList = ko.observableArray([
    'All',
    'Shopping Centre',
    'Landmark',
    'Restaurant'
  ]);

  //Computes which places should be shown when the filter is used
  this.activeMarkerList = ko.computed(function(){
    if(self.selection() === 'All'){
      return self.markerList();
    }
    else {
      let newList = [];
      places.forEach(function(data){
        if(data.type === self.selection()){
          newList.push(new Place(data));
        }
      });
      return newList;
    }
  });

  // Changes the selection and adjusts map markers
  this.changeSelection = function(newSelection){
    self.selection(newSelection);
    if(self.selection() === 'All'){
      mapMarkers.forEach(function(data){
        data.setMap(map);
      });
    }
    else {
      mapMarkers.forEach(function(data){
        if(data.type !== self.selection()){
          data.setMap(null);
        }
        else {
          data.setMap(map);
        }
      });
    }

    // Stores the selection
    localStorage.setItem("selection", self.selection());
  };

  // Opens the info window when an item is clicked in the list
  this.showInfo = function(data){
    let marker;
    mapMarkers.forEach(function(markerCheck){
      if(markerCheck.title === data.title){
        marker = markerCheck;
      }
    });

    // Places selected marker in the centre of the map
    map.panTo(recenterMap(marker.getPosition().toJSON()));

    marker.setAnimation(google.maps.Animation.BOUNCE);
    populateInfoWindow(marker, largeInfoWindow);
    setTimeout(function(){
      marker.setAnimation(null);
    }, 750);
  };
}

ko.applyBindings(new ViewModel());
