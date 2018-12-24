var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var socket = require('socket.io-client')('http://192.168.1.168:3001');
var io = require('socket.io')(server);
server.listen(4000);

//Data received from Master node saved in globaldata (String) & globalObject (Object)
var globaldata;
var globalObject;


app.use(express.static((__dirname, 'controllers')));
app.set('appPath', 'controllers');


//Default route
app.get('/', function (req, res) {
  if (globaldata !== undefined) {

    res.sendfile('controllers/radialTreeHandler.html');
  }
  else {
    res.sendfile('controllers/home.html');
  }

});

//Routes
app.get('/v1', function (req, res) {
  res.sendfile('controllers/radialTree.html');
});
app.get('/v2', function (req, res) {
  res.sendfile('controllers/sunBurst.html');
});
app.get('/v3', function (req, res) {
  res.sendfile('controllers/tree.html');
});
app.get('/v4', function (req, res) {
  res.sendfile('controllers/sunBurstHandler.html');
});
app.get('/v5', function (req, res) {
  res.sendfile('controllers/treeHandler.html');
});
app.get('/info', function (req, res) {
  res.sendfile('controllers/info.html');
});


//Sync with Master node to get Data
socket.on('fromMaster', function (data) {

  if (data !== undefined && data !== null) {
    globaldata = data;
    DataToHome();
  }

});

//Sync with Master node to get Data (After Delete)
socket.on('fromMasterDelete', function (data) {

  if (data !== undefined && data !== null) {
    globaldata = data;
    DataToHome();
    refresh();
  }
});




io.on('connection', function (socket) {

  socket.on('fromHome', function (data, data2) {

    globaldata = data;
    globalObject = data2;

    Uploaded_DataToMaster();

  });


  socket.on('deletedData', function (data) {

    Deleted_DataToMaster(data);

  });


  Update_DataForHandler();

});




//Functions for sending new uploaded data and Deleted data to Master node

function Uploaded_DataToMaster() {
  socket.emit('fromSlave', globaldata, globalObject);
}

function Deleted_DataToMaster(data) {
  socket.emit('deleteClass', data);
}


//Function for sending data to Home.html 

function DataToHome() {
  io.emit('fromSlaveToHome', globaldata);
}


//Function for sending an order to SunBurst.html & tree.html & radialTree.html to refresh the page 

function refresh() {
  io.emit('ref');
}

//Function for updating the handlers with new chamges to save it in Local storage
function Update_DataForHandler() {
  io.emit('T1', globaldata);
}















