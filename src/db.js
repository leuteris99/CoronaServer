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
                for(let i = 0; i < recordsCount; i++){
                    db.run("insert into record values (?,?,?,?,?,?,?,?,?,?,?)",
                        [jsonData['records'][i]['dateRep'],jsonData['records'][i]['day'],jsonData['records'][i]['month'],jsonData['records'][i]['year'],jsonData['records'][i]['cases'],jsonData['records'][i]['deaths'],
                            jsonData['records'][i]['countriesAndTerritories'],jsonData['records'][i]['geoId'],jsonData['records'][i]['countryterritoryCode'],
                            jsonData['records'][i]['popData2018'],jsonData['records'][i]['continentExp']],(err)=>{
                            if (err){
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
    closeConnection: function (db) {
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}


