'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFlashMessage = addFlashMessage;
exports.deleteFlashMessage = deleteFlashMessage;

var _actionTypes = require('./actionTypes');

function addFlashMessage(message) {
  return {
    type: _actionTypes.ADD_FLASH_MESSAGE,
    message: message
  };
}

function deleteFlashMessage(id) {
  return {
    type: _actionTypes.DELETE_FLASH_MESSAGE,
    id: id
  };
}