var http = require('http');
var socket = require('socket.io');

var app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

socket.listen(app);

app.listen(process.env.C9_PORT, "0.0.0.0");

console.log('Server running at http://movr.pjvds.c9.io:'+process.env.C9_PORT);