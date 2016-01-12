var express = require('express');
var server = express();
var port = process.env.PORT || 3000;
var db = require('./db.js');
var morgan = require('morgan'); 
var bodyParser = require('body-parser');


server.use(morgan('combined')); 
server.use(express.static(__dirname + '/../client'));
server.use(bodyParser.json()); 

server.use(function(req, res, next){
  //console.log("middleware! here is the data ", req.body);
  next();
});


//Express Routes
server.get('/data', function(req, res, next){
  //console.log('\n\nRECIEVED GET REQUEST FOR DATA:\n\n');
  //get posts from MongoDB
  db.getBlogs().then(function(data){
    //console.log(data);
    res.status(200).send(data);
  })
})
.get('/', function(req, res, next){
  //console.log('Received GET request for /');
})
.post('/data', function(req, res, next){ 
  db.saveBlog(req.body);
})


server.listen(port);