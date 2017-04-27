'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootReducer = undefined;

var _redux = require('redux');

var _reactReduxSweetalert = require('react-redux-sweetalert');

var _flashMessagesReducer = require('./flashMessagesReducer');

var _flashMessagesReducer2 = _interopRequireDefault(_flashMessagesReducer);

var _userReducer = require('./userReducer');

var _userReducer2 = _interopRequireDefault(_userReducer);

var _documentReducer = require('./documentReducer');

var _documentReducer2 = _interopRequireDefault(_documentReducer);

var _roleReducer = require('./roleReducer');

var _roleReducer2 = _interopRequireDefault(_roleReducer);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = exports.rootReducer = (0, _redux.combineReducers)({
  auth: _auth2.default,
  flashMessages: _flashMessagesReducer2.default,
  users: _userReducer2.default,
  documents: _documentReducer2.default,
  roles: _roleReducer2.default,
  sweetalert: _reactReduxSweetalert.reducer
});

exports.default = rootReducer;