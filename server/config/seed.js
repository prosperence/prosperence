/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var testUser = require('../../tests/testUser');
var Question = require('../api/question/question.model');

var testUserID, testAdvisorID;

User.find({}).remove(function() {
  User.create(testUser, {
    provider: 'local',
    name: 'Test Advisor',
    email: 'advisor@test.com',
    password: 'advisor',
    isAdvisor: true,
    forum: {
      starred: {},
      comments: {}
    },
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
  )
  .then(function(user, advisor) {
    testUserID = user._id;
    testAdvisorID = advisor._id;
  })
  .then(function() {
    Question.find({}).remove(function() {
      Question.create({
        text: 'When are ETFs better than mutual funds?',
        author: 'Test User',
        authorID: testUserID,
        rating: 47,
        comments: [{
          name: 'Example Advisor',
          comenterID: testAdvisorID,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 7
        }, {
          name: 'Example Advisor 2',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 3
        }, {
          name: 'Example Advisor 3',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 13
        }]
      }, {
        text: 'Should I contribute to my Roth 401k or Traditional 401k?',
        author: 'Test User 2',
        authorID: null, // Not important for testing purposes.
        rating: 18,
        comments: [{
          name: 'Example Advisor',
          comenterID: testAdvisorID,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 4
        }, {
          name: 'Example Advisor 2',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 14
        }]
      }, {
        text: 'Is whole life insurance a scam?',
        author: 'Test User 2',
        authorID: null, // Not important for testing purposes.
        rating: 12345,
        comments: [{
          name: 'Example Advisor',
          comenterID: testAdvisorID,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 9
        }, {
          name: 'Example Advisor 2',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 19
        }]
      }, {
        text: 'Can a municipal bond fund be used as an emergency reserve?',
        author: 'Test User 2',
        authorID: null, // Not important for testing purposes.
        rating: 77,
        comments: [{
          name: 'Example Advisor',
          comenterID: testAdvisorID,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 2
        }, {
          name: 'Example Advisor 2',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 12
        }]
      }, {
        text: 'How can I protect my estate from potential lawsuits?',
        author: 'Test User',
        authorID: testUserID,
        rating: 4,
        comments: [{
          name: 'Example Advisor',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 1
        }, {
          name: 'Example Advisor 2',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 7
        }]
      }, {
        text: 'How should I balance paying off my debts while still trying to save for retirement?',
        author: 'Test User',
        authorID: testUserID,
        rating: 317,
        comments: [{
          name: 'Example Advisor',
          comenterID: testAdvisorID,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 21
        }, {
          name: 'Example Advisor 2',
          comenterID: null,
          text: 'Great question, [insert appropriate, well written, unbiased response here].',
          rating: 2
        }]
      }, function() {
        console.log('Finished populating questions.');
      });
    });
  })
});
