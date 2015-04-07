/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Advisor = require('./advisor.model');

exports.register = function(socket) {
  Advisor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Advisor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('advisor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('advisor:remove', doc);
}