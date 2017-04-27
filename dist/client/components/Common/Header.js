'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.Header = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _authenticationAction = require('../../actions/authenticationAction');

var _documentActions = require('../../actions/documentActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = exports.Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.logout = _this.logout.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'logout',
    value: function logout(e) {
      e.preventDefault();
      this.props.logout();
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(e) {
      var path = this.props.location.pathname.slice(1);
      if (['dashboard', 'allDocuments'].includes(path)) {
        this.props.searchDocuments(e.target.value);
      }
    }
  }, {
    key: 'getLinks',
    value: function getLinks(_ref) {
      var isAuthenticated = _ref.isAuthenticated,
          user = _ref.user,
          isAdmin = _ref.isAdmin;

      var path = this.props.location.pathname.slice(1);
      var enabled = ['dashboard', 'allDocuments'].includes(path);
      if (isAuthenticated) {
        return _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'form',
              { className: 'leftsearchbox' },
              _react2.default.createElement(
                'div',
                { className: 'input-field' },
                _react2.default.createElement('input', { disabled: !enabled, id: 'search', type: 'search', onChange: this.handleSearch }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'search' },
                  _react2.default.createElement('i', { className: 'mdi mdi-magnify' })
                )
              )
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/dashboard', activeClassName: 'active' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons left' },
                'dashboard'
              ),
              'Dashboard'
            )
          ),
          _react2.default.createElement(
            'li',
            { activeClassName: 'active' },
            _react2.default.createElement(
              'a',
              { href: '#' },
              'Welcome, ',
              user.userName,
              '!'
            )
          ),
          _react2.default.createElement(
            'li',
            { activeClassName: 'active' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/profilepages' },
              'Profile'
            )
          ),
          _react2.default.createElement(
            'li',
            { activeClassName: 'active', id: 'personalDocs' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/thedocuments' },
              'Saved Documents'
            )
          ),
          isAdmin && _react2.default.createElement(
            'li',
            { className: 'admin' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/manageroles' },
              'Manage Roles'
            )
          ),
          isAdmin && _react2.default.createElement(
            'li',
            { className: 'admin', id: 'adminTab' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/handleusers' },
              'Manage Users'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: '#', activeClassName: 'active', onClick: this.logout },
              'Logout'
            )
          )
        );
      }
      return _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/signup', activeClassName: 'active' },
            'Signup'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/login', activeClassName: 'active' },
            'Login'
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var navLinks = this.getLinks(this.props);
      return _react2.default.createElement(
        'nav',
        { className: 'blue-grey' },
        _react2.default.createElement(
          'div',
          { className: 'nav-wrapper' },
          _react2.default.createElement(
            _reactRouter.IndexLink,
            { to: '/', activeClassName: 'active' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons left' },
              'home'
            ),
            'Home'
          ),
          _react2.default.createElement(
            'ul',
            { id: 'nav-mobile', className: 'right' },
            _react2.default.createElement(
              'li',
              null,
              navLinks
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

Header.propTypes = {
  user: _react.PropTypes.object.isRequired,
  location: _react.PropTypes.object.isRequired,
  isAuthenticated: _react.PropTypes.bool.isRequired,
  logout: _react.PropTypes.func.isRequired,
  searchDocuments: _react.PropTypes.func.isRequired,
  isAdmin: _react.PropTypes.bool.isRequired
};

/**
 * @param {object}
 * @returns {object} data
 */
var mapStateToProps = exports.mapStateToProps = function mapStateToProps(state) {
  var _state$auth = state.auth,
      isAuthenticated = _state$auth.isAuthenticated,
      user = _state$auth.user;

  var isAdmin = isAuthenticated && user.userRoleId === 1;
  return {
    isAuthenticated: isAuthenticated,
    user: user,
    isAdmin: isAdmin
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { logout: _authenticationAction.logout, searchDocuments: _documentActions.searchDocuments })(Header);