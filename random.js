var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(request, response) {
  var method = request.method;
  var url = request.url;
  console.log('Incoming ' + method + ' request' + ' to ' + url);
  // GET /randomNumber ===> 1-10
  if (method === 'GET' && url === '/random') {
    var randomNumber = Math.floor( Math.random() * 10 );
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write( "You get " + randomNumber );
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
