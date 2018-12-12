/*var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);
var redis = require('socket.io-redis');
server.listen(3000);
// WARNING: app.listen(80) will NOT work here!
var dataSaved ;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  console.log("****index****");
});

io.sockets.on('connection', function (socket) {
   // socket.emit('news', { hello: 'world' });
    socket.emit('connection', { hello: 'Connections' });
    socket.on('message', function (message) {
      socket.send(dataSaved);
    });

    socket.on('disconnect', function (data) {
      console.log(data );
    });

    socket.on('chating',function(socket){
      socket.emit('chating', { hello: 'chatting from Nazeeh' });
      socket.on('parsing', function (data) {
        console.log(data + " LOG");
      });
    });

});

*/