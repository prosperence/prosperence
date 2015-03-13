'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // Server IP
  ip:       process.env.IP ||
            'localhost',

  // Server port
  port:     process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI || 'mongodb://localhost/prosperence-dev'
  }

};
