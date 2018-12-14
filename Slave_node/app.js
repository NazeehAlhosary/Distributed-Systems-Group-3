var app = require('express')();
var server = require('http').Server(app);
var socket = require('socket.io-client')('http://192.168.43.215:3000');
var io = require('socket.io')(server);
server.listen(3000);

var globaldata;


app.get('/', function (req, res) {
 
   if (globaldata !== null) {
      res.sendfile('vizulizer.html');
   }
   else{
      res.sendfile('menu.html');
   }


  });

  app.get('/SBvisualization', (req,res) => {

    res.sendFile(path.join(__dirname + '/controllers/sunBurst.html'));
});

app.get('/RTvisualization', (req,res) => {

    res.sendFile(path.join(__dirname + '/controllers/radialTree.html'));
});

  socket.emit('add', {
   message: 'Majed Dalain'
 });
 socket.on('add', function(data){
   console.log(data);
 });
  socket.on('check', function(data){
   globaldata = data;
   console.log(globaldata);


   
});
   
io.on('connection', function (socket) {
  socket.on('FromHtml', function (data) {
    console.log(data);
  });
});