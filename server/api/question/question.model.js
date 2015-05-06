'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  text: String, // This is the actual question.
  active: { // If question is active or not.
    type: Boolean,
    default: true
  },
  author: String, // Who asked the question.
  authorID: String, // ID of the author.
  rating: { // Keeps track of how many users starred the question.
    type: Number,
    default: 0
  },
  timestamp: {}, // Date object of when the question was asked.
  comments: [{ // Replies to the question.
    name: String, // Name of who replied (links to profile if advisor).
    comenterID: String, // User ID of the advisor who authored the comment.
    text: String, // Reply message.
    rating: { // Keeps track of up/down votes of the comment.
      type: Number,
      default: 0
    },
    timestamp: { type: Date, default: Date.now } // Date object of when the comment was authored.
  }]
});

module.exports = mongoose.model('Question', QuestionSchema);
