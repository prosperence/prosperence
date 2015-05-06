'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  email: { // A user's email address must be unique.
    type: String,
    lowercase: true
  },
  name: String, // This is for display purposes and does not have to be unique.
  role: { // 'user' or 'admin'.
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  isAdvisor: { // Advisors and non-advisors have different privileges.
    type: Boolean,
    default: false
  },
  builderProgress: { // Tracks how much of the plan builder the user has completed.
    // null = not enabled, false = enabled but not complete, true = complete.
    'plan-builder.start':      { type: Boolean, default: true },
    'plan-builder.basics':     { type: Boolean, default: false },
    'plan-builder.assets':     { type: Boolean, default: null },
    'plan-builder.debts':      { type: Boolean, default: null },
    'plan-builder.spending':   { type: Boolean, default: null },
    'plan-builder.savings':    { type: Boolean, default: null },
    'plan-builder.insurances': { type: Boolean, default: null },
    'plan-builder.tax':        { type: Boolean, default: null },
    'plan-builder.goals':      { type: Boolean, default: null }
  },
  // starredQuestions: {},
  forum: { // Tracks forum data, starred questions, comment votes, etc.
    starred: {}, // Object of question ID strings that the user has starred.
    comments: {} // Up/down votes for comments.
  },
  personal: {}, // Personal information: name, age, address, bday, etc.
  plan: {} // This is the user's financial plan, this is the big thing.
});

/**
 * Virtuals
 */
UserSchema
.virtual('password')
.set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
})
.get(function() {
  return this._password;
});

// Public profile information
UserSchema
.virtual('profile')
.get(function() {
  return {
    'name': this.name,
    'role': this.role
  };
});

// Non-sensitive info we'll be putting in the token
UserSchema
.virtual('token')
.get(function() {
  return {
    '_id': this._id,
    'role': this.role
  };
});

/**
 * Validations
 */

// Validate empty email
UserSchema
.path('email')
.validate(function(email) {
  return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema
.path('hashedPassword')
.validate(function(hashedPassword) {
  return hashedPassword.length;
}, 'Password cannot be blank');

// Validate email is not taken
UserSchema
.path('email')
.validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({email: value}, function(err, user) {
    if(err) throw err;
    if(user) {
      if(self.id === user.id) return respond(true);
      return respond(false);
    }
    respond(true);
  });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.hashedPassword))
    next(new Error('Invalid password'));
  else
    next();
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
