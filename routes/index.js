var express = require('express');
var router = express.Router();

var path = require('path');
var curr = path.dirname(__dirname);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/cases-number-per-country', function (request, resource) {
    resource.sendFile(path.join(curr,'/public/cases-number-per-country.html'));
});

module.exports = router;
