'use strict';

var _ = require('lodash');
var Question = require('./question.model');

// Get list of questions.
exports.index = function(req, res) {
  Question.find(function(err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, questions);
  });
};

// Get a single question.
exports.show = function(req, res) {
  Question.findById(req.params.id, function(err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    return res.json(question);
  });
};

// Get all questions submitted by current user.
exports.mine = function(req, res) {
  Question.find({ authorID: req.params.id }, function(err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, questions);
  });
};

// Get all questions starred by current user.
exports.starred = function(req, res) {
  // req.params.starred is a stringified array of question ids.
  var starred = JSON.parse(req.params.starred);
  Question.find({ '_id': { $in: starred } }, function(err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, questions);
  });
};

// Get all questions that match the keywords.
// Keywords are passed in as a stringified array to req.params.keywords
exports.search = function(req, res) {
  var keywords = JSON.parse(req.params.keywords);
  Question.find({}, function(err, questions) {
    if(err) { return handleError(res, err); }
    var results = [];
    for (var i=0, n=questions.length; i<n; i++) {
      for (var j=0, m=keywords.length; j<m; j++) {
        if (questions[i].text.toLowerCase().match(keywords[j].toLowerCase())) {
          results.push(questions[i])
          j = m; // stop searching once it matches one keyword.
        }
      }
    }
    return res.json(200, results);
  })
};

// Create a new question in the DB.
exports.create = function(req, res) {
  Question.create(req.body, function(err, question) {
    if(err) { return handleError(res, err); }
    return res.json(201, question);
  });
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function(err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    var updated = question;
    for (var key in req.body) {
      if (updated[key]) updated[key] = req.body[key];
    }
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, question);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function(err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
