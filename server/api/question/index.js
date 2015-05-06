'use strict';

var express = require('express');
var controller = require('./question.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show); // Get a single question.
router.get('/mine/:id', controller.mine); // Get all questions submitted by current user.
router.get('/starred/:starred', controller.starred); // Get all questions starred by current user.
router.get('/search/:keywords', controller.search); // Get all questions that match the keywords.
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
