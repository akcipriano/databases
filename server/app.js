var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());


app.get('/', function (req, res) {
  console.log("Got request from client");
  res.send('Hello World!');
});



// Set up our routes
//app.use('/classes', router);


// Serve the client files
console.log("__dirname:", __dirname);
app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening server on', app.get('port'));
}

