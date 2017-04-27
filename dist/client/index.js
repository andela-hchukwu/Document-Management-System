'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _authenticationAction = require('./actions/authenticationAction');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _util = require('./util/util');

var _util2 = _interopRequireDefault(_util);

require('../node_modules/materialize-css/dist/js/materialize.min');

require('../node_modules/materialize-css/dist/css/materialize.min.css');

require('../node_modules/material-icons/css/material-icons.css');

require('../node_modules/sweetalert/dist/sweetalert.css');

require('./styles/styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _configureStore2.default)(); /* eslint-disable import/no-extraneous-dependencies */


if (localStorage.jwtToken) {
  (0, _util2.default)(localStorage.jwtToken);
  store.dispatch((0, _authenticationAction.setCurrentUser)((0, _jwtDecode2.default)(localStorage.jwtToken)));
}

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default })
), document.getElementById('app'));