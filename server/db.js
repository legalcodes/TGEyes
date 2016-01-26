var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tgeyes');

var db = mongoose.connection; 
var Post;
var Blog;
var exports = module.exports;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  
//   POST SCHEMA
  
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
    //console.log('promised saved post', post);
    return post;
  })
  .then(function(post){
    post.find().then(function(posts){
      //console.log(posts);
    })
  })

//   BLOG SCHEMA

  var BlogSchema = mongoose.Schema({
    name: String,
    url: String,
    author: String,
    posts: Array
  })

  Blog = mongoose.model('Blog', BlogSchema);

  // var blog = new Blog({
  //   name: 'Raph Blog',
  //   url: 'http://raphaelbaskerville.github.io/',
  //   author: 'Raphael Baskerville',
  //   posts: []
  // })

  // blog.save(function(err, blog){
  //   if (err) return console.error(err);
  //   return blog;
  // })

  // exports.getPosts = function(){
  //   //must return a promise
  //   return Post.find({}, function(err, data){
  //     if(err){ console.log(err)} 
  //     else {
  //       return data;
  //     }
  //   })
  // }

  exports.getBlogs = function(){
    //must return a promise
    return Blog.find({}, function(err, data){
      if(err){ console.log(err)} 
      else {
        return data;
      }
    })
  }

  exports.saveBlog = function(blog){
    //console.log('\n\n\nDATA SENT TO DATABASE', blog, '\n\n\n')
    var blog = new Blog({
      name: blog.name,
      url: blog.url,
      author: blog.author,
      posts: blog.posts
    })
    
    blog.save(function(err, blog){
      if (err) return console.error(err);
      return blog;
    })

    return blog;
    // blog.save(function(err, blog){
    //   if (err) return console.error(err);
    // })
  }
  

  // exports.savePost = function(postObj){
  //   console.log('POST STORED', postObj);

  //   var post = new Post(postObj); 

  //   post.save(function(err, post){
  //     if (err) return console.error(err);
  //     console.log('promised save of post', post);
  //     return post;
  //   })
  //   .then(function(post){
  //     post.find().then(function(posts){
  //       console.log(posts);
  //     })
  //   })

  })



// })






