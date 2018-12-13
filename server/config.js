//db connection and export it
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
// mongoose.connect(process.env.DATABASE_URL);
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', function(err) {
  console.log("Error in conencting to the database");
});
db.once('open', function() {
  console.log("We are connected");
});

module.exports = db;
