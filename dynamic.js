var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;

var routes = [
  { method: 'GET', path: '/', content: hello},
  { method: 'GET', path: '/kittens', content: meow},
  { method: 'GET', path: '/randomNumber', content: randomNumber},
  { method: 'GET', path: '/eightball', content: shake}
];

function hello() {
  return "Hello & welcome";
}

function meow() {
  return "meow";
}

function shake() {
  var ball = ['yes', 'no', 'maybe'];
  var i = Math.floor( Math.random() * ball.length);
  var message = ball[i];
  console.log(message);
  return message;
};

var server = http.createServer(function(request, response) {
  var method = request.method;
  var url = request.url;
  console.log('Incoming ' + method + ' request' + ' to ' + url);
  var route = routes.find(function(route) {
    return route.method === request.method && route.path === request.url
  });
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.write( route.content() );
  response.end();
  // GET /randomNumber ===> 1-10
  // if (method === 'GET' && url === '/random') {
  //   var randomNumber = Math.floor( Math.random() * 10 );
  //   response.statusCode = 200;
  //   response.setHeader('Content-Type', 'text/plain');
  //   response.write( "you get " + randomNumber);
  //   response.end();
  // } else if (method === 'GET' && url === '/eightball' ) {
  //   response.statusCode = 200;
  //   response.setHeader('Content-Type', 'text/html');
  //   response.write( shake() );
  //   response.end();
  // } else {
  //   response.statusCode = 404;
  //   response.write('uhoh');
  //   response.end();
  // }
});

server.listen(port, hostname, function(){
  console.log('Server running at http://' + hostname + ':' + port);
});


