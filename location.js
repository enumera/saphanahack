$(document).ready(function(){
var cycle_count = 0;
var no_of_locations = 0;
var locations_added_to_map =0;
var intervalPeriod = 1000;



Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


var locations = ["London", "London", "london", "Glasgow", "Sheffield"];
var locations2 = ["Edinburgh", "Edinburgh", "Edinburgh"];

var locationToShow = [];
// new google.maps.LatLng(57.782551, -1.445368),
//   new google.maps.LatLng(57.782745, -1.444586),
//   new google.maps.LatLng(0.782842, -1.443688)
// ];

// google.maps.LatLng(59.2000, -6.600)

var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]

var heatMapData = [
  {location: new google.maps.LatLng(58.5, -6.600), weight: 10},
  // new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(58.5, -6.730), weight: 10},
  {location: new google.maps.LatLng(58.4, -6.830), weight: 10},
  {location: new google.maps.LatLng(58.3, -6.930), weight: 10},
  // new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(59.2, -7.930), weight: 50},
   {location: new google.maps.LatLng(59.2, -8.000), weight: 50},
  {location: new google.maps.LatLng(58.2, -7.930), weight: 50},
    {location: new google.maps.LatLng(58.2, -8.000), weight: 50},
      {location: new google.maps.LatLng(58.2, -8.100), weight: 50},
 
];

heatMapData2 = [
  {location: new google.maps.LatLng(58.5, -6.600), weight: 10},
  // new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(58.5, -6.730), weight: 10},
  {location: new google.maps.LatLng(58.4, -6.830), weight: 10},
  {location: new google.maps.LatLng(58.3, -6.930), weight: 10},
  // new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(59.2, -7.930), weight: 50},
   {location: new google.maps.LatLng(59.2, -8.000), weight: 50},
  {location: new google.maps.LatLng(58.2, -7.930), weight: 50},
    {location: new google.maps.LatLng(58.2, -8.000), weight: 50},
      {location: new google.maps.LatLng(58.2, -8.100), weight: 50},
  {location: new google.maps.LatLng(59.0, -8.00), weight: 100},
  // new google.maps.LatLng(37.785, -122.443),
    {location: new google.maps.LatLng(58.0, -8.00), weight: 100}
];


$(document.body).on("change", '.category_x', function(){
console.log("this works");
  locations = locations2
  console.log(locations);
  initialize();
  setUpData();
})


function setUpData(){
// cycle_count++
var requests = 0;

requests = locations.length;

var number_of_locations_to_get = 0;

  number_of_locations_to_get = locations.length;

for(var i=0;i<number_of_locations_to_get;i++){

    var geocoder = new google.maps.Geocoder();
    var address = locations[i];
   
    
        geocoder.geocode( { 'address': address}, function(results, status) {
            console.log("Status:")
            console.log(status)
   
          if (status == "OK"){
          var latitude = results[0].geometry.location.lat();
          var longtitude = results[0].geometry.location.lng();

           ownerLocation = new google.maps.LatLng(latitude, longtitude);
           
           locationToShow.push(ownerLocation);
       
         }
           requests--
           console.log("requests left")
           console.log(requests)
           if (requests==0) done();
        }); 
    };
  
  }

  function done(){
    initialize();
  }
// }

function initialize() {
var map, pointArray, heatmap, heatmap2, pointArray2;
var map = null;
var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(59.2000, -6.600),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  document.getElementById('map_canvas').innerHTML ="";

  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);
 
  
  pointArray = new google.maps.MVCArray(heatMapData2);
    pointArray2 = new google.maps.MVCArray(heatMapData);
  
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    gradient: gradient
  });

    heatmap2 = new google.maps.visualization.HeatmapLayer({
    data: pointArray2,
    // gradient: gradient
  });

 
  // changeGradient();
  // changeRadius();
  heatmap.setMap(map);
}



function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 100);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}


setUpData();
initialize();
secondHeatMap();
// setUpData();





// google.maps.event.addDomListener('load', setUpData());


// setInterval(function(){setUpData()}, 10000)
})


