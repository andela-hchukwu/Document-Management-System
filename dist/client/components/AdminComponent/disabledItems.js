'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDisabledClass = addDisabledClass;
var disabledRoles = ['admin', 'regularUser'];
var disabledUsers = exports.disabledUsers = ['admin'];
var disabledDocuments = exports.disabledDocuments = ['regular', 'children', 'rated'];

/**
 * @export
 * @param {any} str
 * @param {any} roles
 * @returns {string}
 */
function addDisabledClass(str) {
  var roles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : disabledRoles;

  return roles.indexOf(str) >= 0 ? 'disabled' : '';
}