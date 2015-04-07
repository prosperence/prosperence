'use strict';

var _ = require('lodash');
var Advisor = require('./advisor.model');

// Get list of advisors.
exports.index = function(req, res) {
  Advisor.find(function (err, advisors) {
    if(err) { return handleError(res, err); }
    return res.json(200, advisors);
  });
};

// Get a single advisor.
exports.show = function(req, res) {
  Advisor.findById(req.params.id, function (err, advisor) {
    if(err) { return handleError(res, err); }
    if(!advisor) { return res.send(404); }
    return res.json(advisor);
  });
};

// Create a new advisor in the DB.
exports.create = function(req, res) {
  Advisor.create(req.body, function(err, advisor) {
    if(err) { return handleError(res, err); }
    return res.json(201, advisor);
  });
};

// Updates an existing advisor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Advisor.findById(req.params.id, function (err, advisor) {
    if (err) { return handleError(res, err); }
    if(!advisor) { return res.send(404); }
    var updated = _.merge(advisor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, advisor);
    });
  });
};

// Deletes an advisor from the DB.
exports.destroy = function(req, res) {
  Advisor.findById(req.params.id, function (err, advisor) {
    if(err) { return handleError(res, err); }
    if(!advisor) { return res.send(404); }
    advisor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
