var TGEyes = angular.module('TGEyes', ["ui.router"]);
TGEyes.config(function($stateProvider, $urlRouterProvider){
  //send unmatched urls to blogList
  $urlRouterProvider.otherwise("/viewBlogs")

  $stateProvider
    .state('viewBlogs', {
      url: "/viewBlogs", 
      templateUrl: "viewBlogs.html",
      controller: "postController"
    })
    .state('addBlog', {
      url: "/addBlog", 
      templateUrl: "addBlog.html",
      controller: "postController"
    })
})

TGEyes.controller('postController', ['$scope', 'PostFactory', function($scope, PostFactory){
  

  $scope.data = [];


  $scope.addText = "SCOPE DISPLAY WORKING";
  $scope.viewText = "ADD BLOG IS WORKING";
  
  $scope.fetchPosts = function(){
    PostFactory.getPosts()
      .then(function(data){
        $scope.data = data;
        console.log($scope.data);
        console.log('\n\n\nfetchedPosts from controller!!!!!\n\n\n');
      })
  }

  $scope.fetchPosts();

}])


TGEyes.factory('PostFactory', ['$http', function($http){
  return {
    getPosts: function(){
      return $http.get('http://localhost:3000/data').then(function(res){
        console.log(res);
        return res.data;
      });
    }
  }
}])





