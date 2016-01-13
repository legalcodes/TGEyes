
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

  $scope.tags = {
    post: "",
    text: ""
  }

  $scope.post = {
    title: "",
    text: "",
    blogName: $scope.blog.name,
    blogger: $scope.blog.author
  }
  
  $scope.fetchBlogs = function(){
    PostFactory.getBlogs()
      .then(function(data){
        $scope.data = data;
        console.log($scope.data);
        //console.log($scope.data);
        //console.log('\n\n\nfetchedBlogs from controller!!!!!\n\n\n');
      })
  }

  $scope.storeBlog = function(blog, tags){
    //console.log('FROM WITHIN STOREBLOG', blog, tags);
    PostFactory.xray(blog, tags, tags)
      .then(function(xblog){
        console.log('PRE SAVE', xblog)
        PostFactory.saveBlog(xblog);
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

    },
    xray: function(blog, postTag, textTag){

      //console.log('\n\n\nFROM WITHIN XRAY FUNCTION: ', blog, postTag, textTag, '\n\n\n')

      var data = {
        url: blog.url,
        postTag: postTag,
        textTag: textTag
      }
      
      return $http.post('/data/xray', data)
        .then(function(res){


          console.log('RESPONSE FROM XRAY', res.data)
          var xblog = {
            author: blog.author,
            url: blog.url,
            name: blog.name,
            posts: res.data   // posts should be an array
          };
          return xblog;
      })
    }
  }
}])





