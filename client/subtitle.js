TGEyes.controller('subtitle', ['$scope', function($scope){
  
  $scope.test = "testing!";

  $scope.list = {
  1: "The app that boasts the most posts on this coast.", 
  2: "Always keep your eyes on the blogs." ,
  3: "You were there. You heard of them first." ,
  4: "Keep \"tabs\" on your friends' blogs." ,
  5: "Certified. Collated. Convenient.", 
  6: "The blog app that cares." 
};
  
  $scope.randomize = function(){
    var random = Math.floor(Math.random() * 6) + 1;
    $scope.test = $scope.list[random];
  };

  $scope.randomize();
  

}])