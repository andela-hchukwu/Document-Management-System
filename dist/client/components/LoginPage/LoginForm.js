'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _TextInputTemplate = require('../Common/TextInputTemplate');

var _TextInputTemplate2 = _interopRequireDefault(_TextInputTemplate);

var _loginValidation = require('../../util/loginValidation');

var _loginValidation2 = _interopRequireDefault(_loginValidation);

var _authenticationAction = require('../../actions/authenticationAction');

var _flashMessages = require('../../actions/flashMessages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'isValid',
    value: function isValid() {
      var _validateInput = (0, _loginValidation2.default)(this.state),
          errors = _validateInput.errors,
          isValid = _validateInput.isValid;

      if (!isValid) {
        return this.setState({ errors: errors });
      }
      return isValid;
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      if (this.isValid()) {
        this.setState({ errors: {}, isLoading: true });
        this.props.login(this.state).then(function (res) {
          _this2.context.router.push('/dashboard');
          _toastr2.default.success('Logged in Successfully!');
        }, function (err) {
          return _this2.setState({ errors: err.response.data.errors, isLoading: false });
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          errors = _state.errors,
          email = _state.email,
          password = _state.password,
          isLoading = _state.isLoading;

      return _react2.default.createElement(
        'form',
        { className: 'login-form', onSubmit: this.onSubmit },
        _react2.default.createElement(
          'div',
          { className: 'row margin' },
          _react2.default.createElement(_TextInputTemplate2.default, {
            icon: 'contact_mail',
            field: 'email',
            label: 'Email',
            value: email,
            error: errors.email,
            onChange: this.onChange,
            type: 'text'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'row margin' },
          _react2.default.createElement(_TextInputTemplate2.default, {
            icon: 'lock',
            field: 'password',
            label: 'Password',
            value: password,
            error: errors.password,
            onChange: this.onChange,
            type: 'password'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'center-align' },
          _react2.default.createElement(
            'button',
            { disabled: isLoading, className: 'btn blue-grey', type: 'submit' },
            'Login',
            _react2.default.createElement(
              'i',
              { className: 'material-icons right' },
              'thumb_up'
            )
          ),
          errors.form && _react2.default.createElement(
            'div',
            { className: 'card-panel red darken-1' },
            errors.form
          )
        )
      );
    }
  }]);

  return LoginForm;
}(_react2.default.Component);

LoginForm.propTypes = {
  login: _react.PropTypes.func.isRequired,
  addFlashMessage: _react.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(null, { login: _authenticationAction.login, addFlashMessage: _flashMessages.addFlashMessage })(LoginForm);