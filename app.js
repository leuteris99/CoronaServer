var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const sqlite3 = require("sqlite3").verbose();
const dbQueries = require("./src/db");

let db = dbQueries.openCreateConnection(sqlite3);

const https = require("https");

https.get('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/', (resp) => {
    let data = '';
    const jsonData = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        const jsonData = JSON.parse(data);
        const recordsCount = Object.keys(jsonData["records"]).length;
        console.log("records count : " + recordsCount);
        console.log(jsonData["records"][1]);
        dbQueries.RefreshDB(db, jsonData);
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});


// dbQueries.closeConnection(db);

module.exports = app;
