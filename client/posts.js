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
  $scope.blog = {
    author: "",
    url: "",
    name: "",
    posts: []
  };
  
  $scope.fetchBlogs = function(){
    PostFactory.getBlogs()
      .then(function(data){
        $scope.data = data;
        //console.log($scope.data);
        //console.log('\n\n\nfetchedBlogs from controller!!!!!\n\n\n');
      })
  }

  $scope.storeBlog = function(blog){
    //console.log(blog);
    PostFactory.saveBlog(blog)
      .then(function(data){
        //console.log('\n\n\nstoreBlog called from posts.js', blog, '\n\n\n');
      })
  }

  $scope.fetchBlogs();

}])







TGEyes.factory('PostFactory', ['$http', function($http){
  return {
    getBlogs: function(){
      return $http.get('http://localhost:3000/data').then(function(res){
        //console.log(res);
        return res.data;
      });      
    },
    saveBlog: function(blog){
      console.log(blog);
      return $http.post('http://localhost:3000/data', blog).then(function(res){
        //console.log(res);
        return res;
      })
    }
  }
}])





