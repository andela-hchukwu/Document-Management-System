'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _index = require('./components/HomePage/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./components/AboutPage/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./components/SignupPage/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./components/LoginPage/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./components/Documents/index');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('./components/DashBoard/index');

var _index12 = _interopRequireDefault(_index11);

var _manageRolePage = require('./components/AdminComponent/manageRolePage');

var _manageRolePage2 = _interopRequireDefault(_manageRolePage);

var _handleUsersPage = require('./components/AdminComponent/handleUsersPage');

var _handleUsersPage2 = _interopRequireDefault(_handleUsersPage);

var _index13 = require('./components/ProfilePage/index');

var _index14 = _interopRequireDefault(_index13);

var _requireAuth = require('./components/Util/requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _requireAdminAuth = require('./components/Util/requireAdminAuth');

var _requireAdminAuth2 = _interopRequireDefault(_requireAdminAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _App2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _index2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'dashboard', component: (0, _requireAuth2.default)(_index12.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _index6.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _index8.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'thedocuments', component: (0, _requireAuth2.default)(_index10.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'profilepages', component: (0, _requireAuth2.default)(_index14.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _index4.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'admin/manageroles',
    component: (0, _requireAdminAuth2.default)(_manageRolePage2.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'admin/handleusers',
    component: (0, _requireAdminAuth2.default)(_handleUsersPage2.default) })
);