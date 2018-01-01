var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var mongoURL = 'mongodb://ammisaidkaidi:023942332as@ds239217.mlab.com:39217/qapp';

function onDBError(stat, e) {
    console.error("Error", stat + " : \r\n", stat);
}

function connect(url) {
    mongo.MongoClient.connect(mongoURL, function (err, db) {
        if (err) onDBError("connection", err);
        console.log("Database created!");
        db.close();
    });
}
//var t = new MongoClient();
//t.connect()
//t.connect(mongoURL, { keepAlive: true }, (err, db) => {
//    console.log(db.databaseName);
//});

function createCollection() {
    mongo.connect(mongoURL, function (err, db) {
        console.log("B");
        if (err) throw err;
        console.log("C");
        /*
         * First we'll add a few songs. Nothing is required to create the 
         * songs collection; it is created automatically when we insert.
         */
        db.
        console.log(db.collection);
        var songs = db.collection('songs');
        console.log("F");
        // Note that the insert method can take either an array or a dict.

        songs.insert(seedData, function (err, result) {

            if (err) throw err;

            /*
             * Then we need to give Boyz II Men credit for their contribution
             * to the hit "One Sweet Day".
             */

            songs.update(
                { song: 'One Sweet Day' },
                { $set: { artist: 'Mariah Carey ft. Boyz II Men' } },
                function (err, result) {

                    if (err) throw err;

                    /*
                     * Finally we run a query which returns all the hits that spend 10 or
                     * more weeks at number 1.
                     */

                    songs.find({ weeksAtOne: { $gte: 10 } }).sort({ decade: 1 }).toArray(function (err, docs) {

                        if (err) throw err;

                        docs.forEach(function (doc) {
                            console.log(
                                'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
                                ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
                            );
                        });

                        // Since this is an example, we'll clean up after ourselves.
                        songs.drop(function (err) {
                            if (err) throw err;

                            // Only close the connection when your app is terminating.
                            db.close(function (err) {
                                if (err) throw err;
                            });
                        });
                    });
                }
            );
        });
    });

};
try {
    //connect();    
    console.log("A");

    var mongodb = require('mongodb');

    // Create seed data

    var seedData = [
        {
            decade: '1970s',
            artist: 'Debby Boone',
            song: 'You Light Up My Life',
            weeksAtOne: 10
        },
        {
            decade: '1980s',
            artist: 'Olivia Newton-John',
            song: 'Physical',
            weeksAtOne: 10
        },
        {
            decade: '1990s',
            artist: 'Mariah Carey',
            song: 'One Sweet Day',
            weeksAtOne: 16
        }
    ];

    // Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname

    var uri = mongoURL;

    mongodb.MongoClient.connect(uri, function (err, db) {

        if (err) throw err;

        /*
         * First we'll add a few songs. Nothing is required to create the 
         * songs collection; it is created automatically when we insert.
         */

        var songs = db.collection('songs');

        // Note that the insert method can take either an array or a dict.

        songs.insert(seedData, function (err, result) {

            if (err) throw err;

            /*
             * Then we need to give Boyz II Men credit for their contribution
             * to the hit "One Sweet Day".
             */

            songs.update(
                { song: 'One Sweet Day' },
                { $set: { artist: 'Mariah Carey ft. Boyz II Men' } },
                function (err, result) {

                    if (err) throw err;

                    /*
                     * Finally we run a query which returns all the hits that spend 10 or
                     * more weeks at number 1.
                     */

                    songs.find({ weeksAtOne: { $gte: 10 } }).sort({ decade: 1 }).toArray(function (err, docs) {

                        if (err) throw err;

                        docs.forEach(function (doc) {
                            console.log(
                                'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
                                ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
                            );
                        });

                        // Since this is an example, we'll clean up after ourselves.
                        songs.drop(function (err) {
                            if (err) throw err;

                            // Only close the connection when your app is terminating.
                            db.close(function (err) {
                                if (err) throw err;
                            });
                        });
                    });
                }
            );
        });
    });

    //createCollection();
    
} catch (e) {
    console.log(e);
}

module.exports = app;
