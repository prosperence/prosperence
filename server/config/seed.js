/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var testUser = require('../../tests/testUser');
var Question = require('../api/question/question.model');

User.find({}).remove(function() {
  User.create(testUser, {
    provider: 'local',
    name: 'Test Advisor',
    email: 'advisor@test.com',
    password: 'advisor',
    isAdvisor: true
  },
    // {
    //   provider: 'local',
    //   role: 'admin',
    //   name: 'Admin',
    //   email: 'admin@admin.com',
    //   password: 'admin'
    // },
    function() {
      console.log('Finished populating users.');
    }
  );
});

Question.find({}).remove(function() {
  Question.create({
    text: 'When are ETFs better than mutual funds?',
    author: 'Test User',
    rating: 47,
    responses: [{
      name: 'Example Advisor',
      text: 'Great question, [insert appropriate, well written, unbiased response here].',
      isAdvisor: true
    }]
  }, {
    text: 'Should I contribute to my Roth 401k or Traditional 401k?',
    author: 'Test User',
    rating: 18,
    responses: [{
      name: 'Example Advisor',
      text: 'Great question, [insert appropriate, well written, unbiased response here].',
      isAdvisor: true
    }]
  }, {
    text: 'Is whole life insurance a scam?',
    author: 'Test User',
    rating: 12345,
    responses: [{
      name: 'Example Advisor',
      text: 'Great question, [insert appropriate, well written, unbiased response here].',
      isAdvisor: true
    }]
  }, {
    text: 'Can a municipal bond fund be used as an emergency reserve?',
    author: 'Test User',
    rating: 77,
    responses: [{
      name: 'Example Advisor',
      text: 'Great question, [insert appropriate, well written, unbiased response here].',
      isAdvisor: true
    }]
  }, {
    text: 'How can I protect my estate from potential lawsuites?',
    author: 'Example User',
    rating: 4,
    responses: [{
      name: 'Example Advisor',
      text: 'Great question, [insert appropriate, well written, unbiased response here].',
      isAdvisor: true
    }]
  }, {
    text: 'How should I balance paying off my debts while still trying to save for retirement?',
    author: 'Example User',
    rating: 317,
    responses: [{
      name: 'Example Advisor',
      text: 'Great question, [insert appropriate, well written, unbiased response here].',
      isAdvisor: true
    }]
  }, function() {
    console.log('Finished populating questions.');
  });
});
