var Xray = require('x-ray');
var xray = new Xray();


var url = 'https://ksiddana.github.io/'
var postTag = '.post'


xray(url, postTag, [{
    title: 'a',
    text: 'p', 
    url: xray('a', '@href')
  }])



/*

xray('https://ksiddana.github.io/', '.post', [{
  title: 'a', 
  text: 'p', 
  url: xray('a', '@href')
}])
  .write('results.json');

*?










/*

xray(html, '.item', [{
  title: 'h2',
  tags: x('.tags', ['li'])
}])(function(err, arr) {
  console.log(arr);
});


*/