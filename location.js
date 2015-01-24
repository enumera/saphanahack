$(document).ready(function(){
var cycle_count = 0;
var no_of_locations = 0;
var locations_added_to_map =0;
var intervalPeriod = 1000;

// setInterval(function(){
//   // console.log("checking for changes");
//   console.log("number of locations")
//   console.log(no_of_locations);
//  var locations_a = $('#location').val();
//  var locations_b = locations_a.split(";");
//  // console.log(locations_b.length);
//     console.log(locations_b);

//  // if(no_of_locations != locations_b.length){
//  //   // console.log("reloading");
//  //   no_of_locations = locations_b.length;
//   google.maps.event.addDomListener('load', setUpData());
//     // };
//   if(cycle_count!=0){
 
//     intervalPeriod = 10000;
//     }

//   }, 10000)

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


var locationToShow = [];
// new google.maps.LatLng(57.782551, -1.445368),
//   new google.maps.LatLng(57.782745, -1.444586),
//   new google.maps.LatLng(0.782842, -1.443688)
// ];
function setUpData(){
// cycle_count++
var requests = 0;
// var locations_x = $('#location').val();
// var locations_before_uniqueness_check = locations_x.split(";")

// locations = locations_before_uniqueness_check.unique();

console.log(locations)

// locations = shuffle(locations);
console.log("locations after shuffle")
console.log(locations)


requests = locations.length;

// console.log(locations.length);

console.log("locations added")
console.log(locations_added_to_map)

// if(locations_added_to_map!=0){
//     for(var i=0;i<locations_added_to_map;i++){
//       locations.shift();
//     }
//   }

console.log("locations length");
console.log(locations.length)

var number_of_locations_to_get = 0;

// if (locations.length < 9){
  number_of_locations_to_get = locations.length;
// }else{
//   number_of_locations_to_get = 9;
// }



for(var i=0;i<number_of_locations_to_get;i++){

    var geocoder = new google.maps.Geocoder();
    var address = locations[i];
    // console.log("address")
    // console.log(address);
    
        geocoder.geocode( { 'address': address}, function(results, status) {
            console.log("Status:")
            console.log(status)
   
            // console.log("here")

          if (status == "OK"){
          var latitude = results[0].geometry.location.lat();
          var longtitude = results[0].geometry.location.lng();

          // console.log(latitude)
          // console.log(longtitude)


           ownerLocation = new google.maps.LatLng(latitude, longtitude);
       
           
           locationToShow.push(ownerLocation);
          // locations_added_to_map++;
          // console.log("locations added")
          // console.log(locations_added_to_map)

           // console.log(pictureOwner);
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
var map, pointarray, heatmap;
var map = null;



var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.5072, 0.1275),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  document.getElementById('map_canvas').innerHTML ="";

  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);
 
  
  pointArray = new google.maps.MVCArray(locationToShow);
  
  // console.log("create a new heatmap")
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

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
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

initialize();
setUpData();


// google.maps.event.addDomListener('load', setUpData());


// setInterval(function(){setUpData()}, 10000)
})


