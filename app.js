var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();
var port = 1515;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// init the all files in the folder controllers
///app.use('controllers', express.static(path.join(__dirname,'controllers')));
app.use(express.static((__dirname,'controllers')));



app.get('/', (req,res) => {

    res.sendFile(path.join(__dirname , 'controllers', 'indexRan.html'));
});


app.get('/test', (req,res) => {

    res.sendFile(path.join(__dirname , 'controllers', 'indexRan.html'));
});



app.get('/Projects', (req,res) => {

    res.sendFile(path.join(__dirname + '/controllers/MainPage.html'));
});

app.get('/Classes', (req,res) => {

    res.sendFile(path.join(__dirname + '/controllers/index.html'));
});

app.listen(port,() =>{
    console.log("Server Started on the PORT: " + port);
    console.log("The server runs on: ((  http://localhost:" + port +" ))");
} );



module.exports = app;

