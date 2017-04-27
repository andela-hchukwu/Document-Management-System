'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveUsersSuccess = retrieveUsersSuccess;
exports.updateUserSuccess = updateUserSuccess;
exports.getUserInfoSuccess = getUserInfoSuccess;
exports.retrieveUsers = retrieveUsers;
exports.deleteUser = deleteUser;
exports.updateUserAdmin = updateUserAdmin;
exports.updateUserInfo = updateUserInfo;
exports.getUserInfo = getUserInfo;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * action to successfully get a user
 * @export
 * @param {any} users
 * @returns  {object} user
 */
function retrieveUsersSuccess(allUsers) {
  return {
    type: types.RETRIEVE_USERS_SUCCESS,
    allUsers: allUsers
  };
}

function updateUserSuccess(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user: user
  };
}

function getUserInfoSuccess(user) {
  return {
    type: types.GET_USER_INFO_SUCCESS,
    user: user
  };
}

/**
 * dispatching the action to get users
 * @export
 * @returns {object}
 */
function retrieveUsers() {
  return function (dispatch) {
    return _axios2.default.get('/users').then(function (response) {
      dispatch(retrieveUsersSuccess(response.data));
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * dispatching the action to get users
 * @param {any} id
 * @export
 * @returns {object}
 */
function deleteUser(id) {
  return function (dispatch) {
    return _axios2.default.delete('/users/' + id).then(function () {
      dispatch(retrieveUsers());
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * dispatching the action to update a user details
 * @export
 * @param {any} user
 * @returns {object}
 */
function updateUserAdmin(user) {
  return function (dispatch) {
    return _axios2.default.put('/users/' + user.id, user).then(function () {
      dispatch(retrieveUsers());
    }).catch(function (error) {
      throw error;
    });
  };
}

function updateUserInfo(userInfo) {
  var user = JSON.parse(localStorage.getItem('user'));
  return function (dispatch) {
    return _axios2.default.put('/users/' + user.id, userInfo).then(function (response) {
      dispatch(updateUserSuccess(userInfo));
    }).catch(function (error) {
      throw error;
    });
  };
}

function getUserInfo() {
  var user = JSON.parse(localStorage.getItem('user'));
  return function (dispatch) {
    return _axios2.default.get('/users/' + user.id).then(function (response) {
      dispatch(getUserInfoSuccess(response.data));
    }).catch(function (error) {
      throw error;
    });
  };
}