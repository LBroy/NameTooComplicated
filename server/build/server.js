'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var cookie = require('cookie-parser');
var morgan = require('morgan');
var flash = require('connect-flash');
var fs = require('fs');
var configDB = require('./config/database.js');

var app = express();

// *** mongoose *** //
mongoose.connect(configDB.url);

require('./config/passport')(passport);

// *** config middleware *** //
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../public/')));
app.use(session({
  secret: 'draw squad not a squad',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Add headers
app.use(function (req, res, next) {
  console.log('starting server ..');
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://ec2-18-219-119-149.us-east-2.compute.amazonaws.com:3000');
  res.setHeader('Access-Control-Allow-Origin', 'http://drawsquad.me');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// get reference to the client build directory
var staticFiles = express.static(path.join(__dirname, '../../client/build'));
// pass the static files (react app) to the express app.
app.use(staticFiles);
// app.get('/', function(req, res){
//   console.log('auth..')
// })
// authentication
// var auth = require('./auth');
// app.use('/auth', auth);

require('./auth2')(app, passport);
require('./userData')(app);

// app.post('/scene/:id/', function(req, res) {
//   console.log('adding scene');
// });


app.use(function (req, res, next) {
  console.log("HTTP Response", res.statusCode);
});
// const https = require('https');
var http = require('http');
var PORT = 3001;
// const PORT = 3001;

// var privateKey = fs.readFileSync( 'drawsquad.herokuapp.key' );
// var certificate = fs.readFileSync( 'drawsquad.herokuapp.crt' );
// var config = {
//         key: privateKey,
//         cert: certificate
// };
// https.createServer(config, app).listen(PORT, function (err) {
//   if (err) console.log(err);
//   else console.log("The magic happens on port: ", PORT);
// });
//
http.createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);else console.log("The magic happens on port: ", PORT);
});