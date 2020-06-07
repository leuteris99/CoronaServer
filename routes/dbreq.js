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

router.get('/get-countries', function (request, resource) {
    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getCountries(db, fetch);
})

router.get('/get-cases-and-deaths', function (request, resource) {
    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getCasesAndDeaths(db, fetch);
})

router.post("/cases-number-per-country", function (request, resource) {
    const countries = [];
    countries.push(request.body.country);

    let t = false;
    try {
        countries[0].forEach(country => {
            if (country === 'null') {
                t = true;
            }
        });
    } catch (e) {
        if (countries[0] === 'null') {
            t = true;
        }
    }

    function fetch(array) {
        if (array.length > 0 && !t) {
            let url = "../cases-number-per-country?";
            resource.redirect(url + "countries=" + countries);
        } else {
            if (t) {
                resource.render('country-error', {title: '500 country is not selected'});
            } else {
                console.log('404: fetch cases number per country');
            }
        }
    }

    dbQueries.getCasesNumberPerCountry(db, countries, fetch);

});

router.get("/cases-number-per-country/:countries", function (request, resource) {
    const tmp = request.params.countries;
    let countries = tmp.split(',');

    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getCasesNumberPerCountry(db, countries, fetch);
});

router.post("/cases-number-per-time", function (request, resource) {
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;
    const country = request.body.country;

    function fetch(array) {
        if (array.length > 0 && country !== 'null') {
            resource.redirect('../cases-number-per-time?country=' + country + '&startDate=' + startDate + '&endDate=' + endDate);
        } else {
            if (country === 'null') {
                resource.render('country-error', {title: '500 country is not selected'});
            } else {
                console.log('404: fetch cases number per time');
                resource.render('time-error', {title: "404 data not found"});
            }
        }
    }

    dbQueries.getCasesNumberPerTime(db, startDate, endDate, country, fetch);
});

router.get("/cases-number-per-time/:country&:startDate&:endDate", function (request, resource) {
    const country = request.params.country;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getCasesNumberPerTime(db, startDate, endDate, country, fetch);
});

router.post("/top-5-cases", function (request, resource) {
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;

    function fetch(array) {
        if (array.length > 0) {
            resource.redirect('../top-5-cases?startDate=' + startDate + '&endDate=' + endDate);
        } else {
            console.log('404: fetch top 5 cases');
            resource.render('time-error', {title: "404 data not found"});
        }
    }

    dbQueries.getTop5Cases(db, startDate, endDate, fetch);
});

router.get("/top-5-cases/:startDate&:endDate", function (request, resource) {
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getTop5Cases(db, startDate, endDate, fetch);
});

router.post("/cases-by-population", function (request, resource) {
    const country = request.body.country;

    function fetch(array) {
        if (array.length > 0 && country !== 'null') {
            resource.redirect("../cases-by-population?country=" + country);
        } else {
            if (country === 'null') {
                resource.render('country-error', {title: '500 country is not selected'});
            } else {
                console.log('404: fetch cases by population');
            }
        }
    }

    dbQueries.getCasesByPopulation(db, country, fetch);
});

router.get("/cases-by-population/:country", function (request, resource) {
    const country = request.params.country;

    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getCasesByPopulation(db, country, fetch);
});

router.post("/continents", function (request, resource) {
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;

    function fetch(array) {
        if (array.length > 0) {
            resource.redirect('../continents?startDate=' + startDate + '&endDate=' + endDate);
        } else {
            console.log('404: fetch continents');
            resource.render('time-error', {title: "404 data not found"});
        }
    }

    dbQueries.getContinents(db, startDate, endDate, fetch);
});

router.get("/continents/:startDate&:endDate", function (request, resource) {
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    function fetch(array) {
        resource.send(array);
    }

    dbQueries.getContinents(db, startDate, endDate, fetch);
});
module.exports = router;