'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = userReducer;

var _actionTypes = require('../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.users;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case types.RETRIEVE_USERS_SUCCESS:
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(state), [{ allUsers: action.allUsers }]));
    case types.UPDATE_USER_SUCCESS:
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(state), [{ allUsers: action.user }]));
    case types.GET_USER_INFO_SUCCESS:
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(state), [{ user: action.user }]));
    default:
      return state;
  }
}