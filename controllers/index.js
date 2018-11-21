var path = require('path');
var express = require('express');
var router = express.Router()


router.get('/api', function(req, res) {
    res.json({"message": "Welcome to your DIT355 Mini Project: Distributed Systems Development project!"});
});

// Insert routes below
router.use('/api/classes', require('./classes'));
router.use('/api/shoppingcarts', require('./shoppingcarts'));
router.use('/api/users', require('./users'));
router.use('/api/categories', require('./categories'));

// All other routes redirect to the index.html
router.route('/*').get(function (req, res) {
    var relativeAppPath = req.app.get('appPath');
    var absoluteAppPath = path.resolve(relativeAppPath);
    res.sendFile(absoluteAppPath + '/index.html');
});

module.exports = router
