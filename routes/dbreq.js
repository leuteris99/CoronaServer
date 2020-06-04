var express = require('express');
var router = express.Router();
// path shortcuts
var path = require('path');
const srcPath = path.join(path.dirname(__dirname), '/src/');
// Database setup
var sqlite3 = require('sqlite3');
var dbQueries = require(path.join(srcPath, 'db.js'));
let db = dbQueries.openReadOnlyConnection(sqlite3);

router.post("/", function (req, res) {
    res.send(req.body);
});

router.post("/cases-number-per-country", function (request, resource) {
    const country = request.body.country;

    function fetch(array) {
        console.log(array.length)
        if (array.length > 0) {
            resource.redirect("../cases-number-per-country?country=" + country);
        }
    }

    dbQueries.getCasesNumberPerCountry(db, country, fetch);

});
router.get("/cases-number-per-country/:country", function (request, resource) {
    const country = request.params.country;

    function fetch(array) {
        resource.send(array);

    }

    dbQueries.getCasesNumberPerCountry(db, country, fetch);
})

router.post("/cases-number-per-time", function (request, resource) {
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;

    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getCasesNumberPerTime(db, startDate, endDate, fetch);
});
module.exports = router;