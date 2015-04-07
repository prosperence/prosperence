'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// This is to store the information for advisors that don't have an account.
// Information will be gathered from FINRA sources (broker check).
var AdvisorSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Advisor', AdvisorSchema);
