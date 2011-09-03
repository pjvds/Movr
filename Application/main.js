var http = require('http');
var socket = require('socket.io');
var clients = [];

var app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

var io = socket.listen(app);

app.listen(process.env.C9_PORT, "0.0.0.0");

console.log('Server running at http://movr.pjvds.c9.io:'+process.env.C9_PORT);

io.sockets.on('connection', function (socket) {
    clients.push(socket);
  
    socket.on('spawn', function (data) {
        clients.forEach(function(client){
            if(client != socket){
                client.emit('spawn', data);    
            }
        });
    });

    io.sockets.on('disconnect', function (socket) {
        delete clients[socket];
    });
});