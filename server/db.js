var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');

var db = mongoose.connection; 
var Post;
var exports = module.exports;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  
  var PostSchema = mongoose.Schema({
    title: String, 
    text: String,
    blogName: String,
    blogger: String
  })

  Post = mongoose.model('Post', PostSchema);

  var post = new Post({
    title: "Five Things To Like", 
    text: "Today, I'd like to introduce you to something.", 
    blogName: "LaborCrib", 
    blogger: "Jon Tippens"
  })

  post.save(function(err, post){
    if (err) return console.error(err); 
    console.log('promised saved post', post);
    return post;
  })
  .then(function(post){
    post.find().then(function(posts){
      console.log(posts);
    })
  })

  exports.getPosts = function(){
    //must return a promise
    return Post.find({}, function(err, data){
      if(err){ console.log(err)} 
      else {
        return data
      }

    })
  }

  exports.savePost = function(postObj){
    console.log('POST STORED', postObj);

    var post = new Post(postObj); 

    post.save(function(err, post){
      if (err) return console.error(err);
      console.log('promised save of post', post);
      return post;
    })
    .then(function(post){
      post.find().then(function(posts){
        console.log(posts);
      })
    })

  }



})






