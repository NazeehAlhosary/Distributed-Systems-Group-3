var app = require('express')();
var express = require('express');

var server = require('http').Server(app);
var socket = require('socket.io-client')('http://192.168.43.215:3001');
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

app.get('/v1', function (req, res) {
  res.sendfile('controllers/tree.html');
});
app.get('/v2', function (req, res) {
  res.sendfile('controllers/sunBurst.html');
});


socket.on('fromMaster', function (data) {


  if (data !== undefined && data !==null) {    
    globaldata = data;

    fromMasterMo();
  }
  else{

  
    
  }
  
 
});

var globalObject;
io.on('connection', function (socket) {
  socket.on('fromHome', function (data,data2) {

    
    globaldata = data ;
    globalObject = data2;
    sendToMaster();

  });
 
  socket.on('data', function (data) {
    fromMasterMoh(data);

    

  });

});

function sendToMaster() {
  socket.emit('fromSlave', globaldata,globalObject);
}
function fromMasterMo() {
  io.emit('fromSlaveToHome',globaldata);
}

function fromMasterMoh(data) {
  socket.emit('deleteClass',data);
}




