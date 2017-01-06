var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;

// var server = http.createServer(function(request, response) {
//   var method = request.method;
//   var url = request.url;
//   console.log('Incoming ' + method + ' request' + ' to ' + url);
//   response.statusCode = 302;
//   response.setHeader('Location', 'http://www.google.com');
//   response.write('Hello');
//   response.end();
// });

var routes = [
  { method: 'GET', path: '/', content: 'Hello & Welcome'},
  { method: 'GET', path: '/kittens', content: 'meow'}
  // { method: 'GET', path: '/randomNumber', content: '________'},
  // { method: 'GET', path: '/eightball', content: '________'},
  // { method: 'GET', path: '/greet/[name]', content: 'Hello ' + name + '!'},
  // { method: 'GET', path: '/coinToss', content: '________'},
  // { method: 'GET', path: '/visit?destination=paris', content: '________'},
];

var server = http.createServer(function(request, response) {
  var method = request.method;
  var url = request.url;
  console.log('Incoming ' + method + ' request' + ' to ' + url);
  var action = routes.find(function(route){
    return route.method === method && route.path === url;
  });
  if ( action ) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write( action.content );
    response.end();
  } else {
    response.statusCode = 404;
    response.write('uhoh');
    response.end();
  }
});

server.listen(port, hostname, function(){
  console.log('Server running at http://' + hostname + ':' + port);
});
