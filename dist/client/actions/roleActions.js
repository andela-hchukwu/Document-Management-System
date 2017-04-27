'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadRoleSuccess = loadRoleSuccess;
exports.loadRoles = loadRoles;
exports.saveRole = saveRole;
exports.updateRole = updateRole;
exports.deleteRole = deleteRole;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * action to successfully load a role from state
 * @param  {object} role
 * @return {object}
 */
function loadRoleSuccess(roles) {
  return {
    type: types.LOAD_ROLE_SUCCESS,
    roles: roles
  };
}

/**
 * load roles
 * @return {object}
 */
function loadRoles() {
  return function (dispatch) {
    return _axios2.default.get('/roles').then(function (response) {
      dispatch(loadRoleSuccess(response.data));
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * save new role
 * @param  {object} role
 * @return {object}
 */
function saveRole(role) {
  return function (dispatch) {
    return _axios2.default.post('/roles', role).then(function () {
      dispatch(loadRoles());
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * @param  {object} role
 * @return {function}
 */
function updateRole(role) {
  return function (dispatch) {
    return _axios2.default.put('/roles/' + role.id, role).then(function () {
      dispatch(loadRoles());
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * delete role from db
 * @param  {number} id
 * @return {object}
 */
function deleteRole(id) {
  return function (dispatch) {
    return _axios2.default.delete('/roles/' + id).then(function () {
      dispatch(loadRoles());
    }).catch(function (error) {
      throw error;
    });
  };
}