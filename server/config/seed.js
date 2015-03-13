/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var testUser = require('../../tests/testUser');

User.find({}).remove(function() {
  User.create(testUser,
    // {
    //   provider: 'local',
    //   role: 'admin',
    //   name: 'Admin',
    //   email: 'admin@admin.com',
    //   password: 'admin'
    // },
    function() {
      console.log('finished populating users');
    }
  );
});
