const path = require('path');
const dbPath = path.join(path.dirname(__dirname), 'DB/');
const srcPath = path.join(path.dirname(__dirname), 'src/');

const recordImport = require(path.join(srcPath, 'record.js'));

module.exports = {
    openCreateConnection: function (sqlite3) {
        let db = new sqlite3.Database(path.join(dbPath, 'data.db'), (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to database.');
        });
        return db;
    },
    openReadWriteConnection: function (sqlite3) {
        let db = new sqlite3.Database(path.join(dbPath, 'data.db'), sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to database.');
        });
        return db;
    },
    openReadOnlyConnection: function (sqlite3) {
        let db = new sqlite3.Database(path.join(dbPath, 'data.db'), sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to database.');
        });
        return db;
    },
    RefreshDB: function (db, jsonData) {
        db.get("SELECT name from sqlite_master where type='table' and name='record'", (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            db.serialize(() => {
                if (row !== undefined) {
                    db.run("drop table record", (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                    });
                }
                db.run("CREATE TABLE record(dateRep text, day int, month int, year int, cases int, deaths int, countriesAndTerritories text, geoId text, countryterritoryCode text, popData2018 int, continentExp text)", (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Table record created.');
                });

                const recordsCount = Object.keys(jsonData["records"]).length;
                // console.log(jsonData['records']);
                for (let i = 0; i < recordsCount; i++) {
                    db.run("insert into record values (?,?,?,?,?,?,?,?,?,?,?)",
                        [jsonData['records'][i]['dateRep'], jsonData['records'][i]['day'], jsonData['records'][i]['month'], jsonData['records'][i]['year'], jsonData['records'][i]['cases'], jsonData['records'][i]['deaths'],
                            jsonData['records'][i]['countriesAndTerritories'], jsonData['records'][i]['geoId'], jsonData['records'][i]['countryterritoryCode'],
                            jsonData['records'][i]['popData2018'], jsonData['records'][i]['continentExp']], (err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                        });
                }
                console.log("data inserted to db!");
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Close the database connection.');
                });
            });

        });
    },
    getCountries: function (db, callback) {
        const sql = "select distinct countriesANdTerritories from record";
        const array = [];
        let i = 0;
        db.all(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                array[i++] = {countriesAndTerritories: row.countriesAndTerritories};
            })
            callback(array);
        });
    },
    getCasesNumberPerCountry: function (db, country, callback) {
        const sql = "select cases, deaths, dateRep from record where countriesAndTerritories == ?";
        const array = [];
        let i = 0;
        db.all(sql, [country], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                array[i++] = {cases: row.cases, deaths: row.deaths, dateRep: row.dateRep};
            });
            callback(array);
        });
    },
    getCasesNumberPerTime: function (db, startDate, endDate, country, callback) {
        const sql = "select cases, deaths, dateRep from record where  day<= ? and day >= ? and month <= ? and month>= ? and year <= ? and year >= ? and countriesAndTerritories == ?";
        const array = [];
        let i = 0;
        console.log(startDate);
        let srep = startDate;
        let smonth = srep.slice(5, 7);
        let sday = srep.slice(8, 10);
        let syear = srep.slice(0, 4);
        let erep = endDate;
        let emonth = erep.slice(5, 7);
        let eday = erep.slice(8, 10);
        let eyear = erep.slice(0, 4);
        db.all(sql, [eday, sday, emonth, smonth, eyear, syear, country], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {

                array[i++] = {
                    cases: row.cases,
                    deaths: row.deaths,
                    dateRep: row.dateRep
                };
            });
            callback(array);
        });
    },
    getTop5Cases: function (db, startDate, endDate, callback) {
        const sql = "select countriesAndTerritories, cases from (select countriesAndTerritories, sum(cases) cases from record where  day<= ? and day >= ? and month <= ? and month>= ? and year <= ? and year >= ? group by countriesAndTerritories order by sum(cases) desc limit 5) order by countriesAndTerritories";
        const array = [];
        let i = 0;
        let srep = startDate;
        let smonth = srep.slice(5, 7);
        let sday = srep.slice(8, 10);
        let syear = srep.slice(0, 4);
        let erep = endDate;
        let emonth = erep.slice(5, 7);
        let eday = erep.slice(8, 10);
        let eyear = erep.slice(0, 4);
        db.all(sql, [eday, sday, emonth, smonth, eyear, syear], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                array[i++] = {
                    country: row.countriesAndTerritories,
                    cases: row.cases
                };
            });
            callback(array);
        });
    },
    getCasesByPopulation: function (db, country, callback) {
        const sql = "select sum(cases) cases, popData2018 from record where countriesAndTerritories == ?";
        const array = [];
        db.get(sql, [country], (err, rows) => {
            if (err) {
                throw err;
            }
            array[0] = {cases: rows.cases, popData2018: rows.popData2018};
            console.log(array);
            callback(array);
        });
    },
    getContinents: function (db, startDate, endDate, callback) {
        const sql = "select continentExp, sum(cases) cases, sum(deaths) deaths from record where  day<= ? and day >= ? and month <= ? and month>= ? and year <= ? and year >= ? group by continentExp order by continentExp";
        const array = [];
        let i = 0;
        let srep = startDate;
        let smonth = srep.slice(5, 7);
        let sday = srep.slice(8, 10);
        let syear = srep.slice(0, 4);
        let erep = endDate;
        let emonth = erep.slice(5, 7);
        let eday = erep.slice(8, 10);
        let eyear = erep.slice(0, 4);
        db.all(sql, [eday, sday, emonth, smonth, eyear, syear], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                array[i++] = {
                    continentExp: row.continentExp,
                    cases: row.cases,
                    deaths: row.deaths
                }
            });
            callback(array);
        });
    },
    closeConnection: function (db) {
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}


