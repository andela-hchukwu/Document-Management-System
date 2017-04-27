'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateInput;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateInput(data) {
  var errors = {};

  if (_validator2.default.isEmpty(data.userName)) {
    errors.userName = 'Username is required';
  }
  if (_validator2.default.isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }
  if (_validator2.default.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }
  if (_validator2.default.isEmpty(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (_validator2.default.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (!_validator2.default.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
}