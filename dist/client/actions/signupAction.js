'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentUser = setCurrentUser;
exports.createUserSuccess = createUserSuccess;
exports.isUserExists = isUserExists;
exports.userSignupRequest = userSignupRequest;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _util = require('../util/util');

var _util2 = _interopRequireDefault(_util);

var _actionTypes = require('./actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setCurrentUser(user) {
  return {
    type: _actionTypes.SET_CURRENT_USER,
    user: user
  };
}

function createUserSuccess(user) {
  return {
    type: _actionTypes.CREATE_USER_SUCCESS,
    user: user
  };
}

function isUserExists(identifier) {
  return function (dispatch) {
    return _axios2.default.get('/users/findUser/' + identifier);
  };
}

function userSignupRequest(userData) {
  return function (dispatch) {
    return _axios2.default.post('/users', userData).then(function (response) {
      var token = response.data.token;
      var user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwtToken', token);
      (0, _util2.default)(token);
      dispatch(setCurrentUser((0, _jwtDecode2.default)(token)));
    });
  };
}