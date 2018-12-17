var app = require('express')();
var express = require('express');

var server = require('http').Server(app);
var socket = require('socket.io-client')('http://localhost');
var io = require('socket.io')(server);
server.listen(4000);

var globaldata;

app.use(express.static((__dirname, 'controllers')));
app.set('appPath', 'controllers');



app.get('/', function (req, res) {


  if (globaldata !== undefined) {
    res.sendfile('controllers/radialTree.html');
   }
   else{
      res.sendfile('controllers/home.html');
   }

});






socket.on('fromMaster', function (data) {
console.log(data);

  if (data !== undefined && data !==null) {    
    globaldata = data;
    console.log(globaldata);
    fromMasterMo();
  }
  else{

    console.log("Mrr mn hona");
    
  }
  
 
});

io.on('connection', function (socket) {
  socket.on('fromHome', function (data) {
    globaldata = data ;
    console.log(globaldata);
    sendToMaster();

  });
});

function sendToMaster() {
  socket.emit('fromSlave', globaldata);
}
function fromMasterMo() {
  io.emit('fromSlaveToHome','done');
}
