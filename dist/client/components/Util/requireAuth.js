'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComposedComponent) {
  var Authenticate = function (_React$Component) {
    _inherits(Authenticate, _React$Component);

    function Authenticate() {
      _classCallCheck(this, Authenticate);

      return _possibleConstructorReturn(this, (Authenticate.__proto__ || Object.getPrototypeOf(Authenticate)).apply(this, arguments));
    }

    _createClass(Authenticate, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.props.isAuthenticated) {
          this.props.addFlashMessage({
            type: 'error',
            text: 'You need to login to access this page'
          });
          this.context.router.push('/login');
        }
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        if (!nextProps.isAuthenticated) {
          this.context.router.push('/');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, this.props);
      }
    }]);

    return Authenticate;
  }(_react2.default.Component);

  Authenticate.contextTypes = {
    router: _react2.default.PropTypes.object.isRequired
  };

  Authenticate.propTypes = {
    isAuthenticated: _react2.default.PropTypes.bool.isRequired,
    addFlashMessage: _react2.default.PropTypes.func.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return (0, _reactRedux.connect)(mapStateToProps, { addFlashMessage: _flashMessages.addFlashMessage })(Authenticate);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _flashMessages = require('../../actions/flashMessages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }