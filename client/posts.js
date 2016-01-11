var TGEyes = angular.module('TGEyes', []);

TGEyes.controller('postController', ['$scope', 'PostFactory', function($scope, PostFactory){
  $scope.data = ["!"];
  $scope.display = "Scope display is working!";
  
  $scope.fetchPosts = function(){
    PostFactory.getPosts()
      .then(function(data){
        $scope.data = data;
        console.log('\n\n\nfetchedPosts from controller!!!!!\n\n\n');
      })
  }

  $scope.fetchPosts();

}])


TGEyes.factory('PostFactory', ['$http', function($http){
  return {
    getPosts:function(){
      return $http.get('http://localhost:3000/data').then(function(res){
        console.log(res);
        return res;
      });
    }
  }
}])