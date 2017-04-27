'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentUser = setCurrentUser;
exports.logout = logout;
exports.login = login;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _util = require('../util/util');

var _util2 = _interopRequireDefault(_util);

var _actionTypes = require('./actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * set current user action creator
 * @export
 * @param {object} user
 * @returns {object} payload containing type and user object
 */
function setCurrentUser(user) {
  return {
    type: _actionTypes.SET_CURRENT_USER,
    user: user
  };
}

/**
 * logout action creator
 * @export
 * @returns {function}
 */
function logout() {
  return function (dispatch) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    (0, _util2.default)(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 * login action creator
 * @export
 * @param {object} data
 * @returns {function}
 */
function login(data) {
  return function (dispatch) {
    return _axios2.default.post('/users/login', data).then(function (response) {
      var token = response.data.token;
      var user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwtToken', token);
      (0, _util2.default)(token);
      dispatch(setCurrentUser((0, _jwtDecode2.default)(token)));
    });
  };
}