/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./server/config/environment/index');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./server/config/seed'); }

// Setup server
var app = express();
require('./server/config/express')(app);
require('./server/routes')(app);

// Start server
var server = app.listen(config.port, function () {
  var port = server.address().port;
  console.log('Example app listening on port %s', port)
});

// Expose app
exports = module.exports = app;
