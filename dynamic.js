var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;

var routes = [
  { method: 'GET', path: '/', content: hello},
  { method: 'GET', path: '/kittens', content: meow},
  { method: 'GET', path: '/randomNumber', content: random},
  { method: 'GET', path: '/eightball', content: shake},
  { method: 'GET', path: '/coinToss', content: coinToss}
];

var server = http.createServer(function(request, response) {
  var method = request.method;
  var url = request.url;
  console.log('Incoming ' + method + ' request' + ' to ' + url);
  var route = routes.find(function(route) {
    return route.method === request.method && route.path === request.url
  });
  if (route) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write( route.content() );
    response.end();
  } else {
    response.statusCode = 404;
    response.write('uhoh');
    response.end();
  }
});

function hello() {
  return "Hello & welcome";
}

function meow() {
  return "meow";
}

function random() {
  var randomNumber = Math.floor( Math.random() * 10 );
  console.log(randomNumber);
  return randomNumber;
}

function shake() {
  var ball = ['yes', 'no', 'maybe'];
  var i = Math.floor( Math.random() * ball.length);
  var message = ball[i];
  console.log(message);
  return message;
};

function coinToss() {
  var coin = ["heads", "tails"];
  var i = Math.floor(Math.random() * coin.length);
  var side = coin[i];
  return side;
};

server.listen(port, hostname, function(){
  console.log('Server running at http://' + hostname + ':' + port);
});


