var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// init the all files in the folder controllers
//app.use('controllers', express.static(path.join(__dirname,'controllers')));
app.get('/', (req,res) => {

    res.sendFile(path.join(__dirname + '/controllers/MainPage.html'));
});

app.get('/Classes', (req,res) => {

    res.sendFile(path.join(__dirname + '/controllers/index.html'));
});

//app.listen(3000,() => console.log("Server Started..,") );
// Error handler (must be registered last)
var env = app.get('env');
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        "message": err.message,
        "error": {}
    };
    if (env === 'development') {
        err_res["error"] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(3000,() => console.log("Server Started..,") );


module.exports = app;

