(function() {  

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

  var app = angular.module('SapHana', []);  

    app.controller('SapHanaController', ['$http' , '$scope', '$interval', function($http, $scope, $interval){  

    $scope.flickrPhotos = [];
    $scope.flickrPhotoIds = [];
    $scope.flickrPhotoInfo = "";
    $scope.flickrPhotoUrls = [];
    $scope.flickrPhotosx = [];
    $scope.url = "";
    $scope.categories = ['Fish Farms', 'Plankton Type A (PA)', 'Plankton Type B (PB)', 'PA Possible Future location', 'PB Possible Future Location']
    // $scope.musicGenre = ['skiiing', 'winter%20sport'];
    // $scope.locationWord = "in%20London";

   
    // console.log($scope.musicGenre)




 
      
  }]);

})();






