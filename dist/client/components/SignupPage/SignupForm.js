'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signupValidation = require('../../util/signupValidation');

var _signupValidation2 = _interopRequireDefault(_signupValidation);

var _TextInputTemplate = require('../Common/TextInputTemplate');

var _TextInputTemplate2 = _interopRequireDefault(_TextInputTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable import/no-extraneous-dependencies */

var SignupForm = function (_React$Component) {
  _inherits(SignupForm, _React$Component);

  function SignupForm(props) {
    _classCallCheck(this, SignupForm);

    var _this = _possibleConstructorReturn(this, (SignupForm.__proto__ || Object.getPrototypeOf(SignupForm)).call(this, props));

    _this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: 2,
      errors: {},
      isLoading: false,
      invalid: false
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.checkUserExists = _this.checkUserExists.bind(_this);
    return _this;
  }

  _createClass(SignupForm, [{
    key: 'onChange',
    value: function onChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      var _validateInput = (0, _signupValidation2.default)(this.state),
          errors = _validateInput.errors,
          isValid = _validateInput.isValid;

      if (!isValid) {
        this.setState({ errors: errors });
      }
      return isValid;
    }
  }, {
    key: 'checkUserExists',
    value: function checkUserExists(e) {
      var _this2 = this;

      var field = e.target.name;
      var val = e.target.value;
      if (val !== '') {
        this.props.isUserExists(val).then(function (response) {
          var errors = _this2.state.errors;
          var invalid = void 0;
          if (response.data.user) {
            errors[field] = 'A user already exists with that ' + field;
            invalid = true;
          } else {
            errors[field] = '';
            invalid = false;
          }
          _this2.setState({ errors: errors, invalid: invalid });
        });
      }
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      var _this3 = this;

      e.preventDefault();

      if (this.isValid()) {
        this.setState({ errors: {}, isLoading: true });
        this.props.userSignupRequest(this.state).then(function () {
          _this3.props.addFlashMessage({
            type: 'success',
            text: 'Welcome! Signup Succesful.'
          });
          _this3.context.router.push('/dashboard');
        }, function (err) {
          return _this3.setState({ errors: err.response.data, isLoading: false });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var errors = this.state.errors;

      var form = _react2.default.createElement(
        'form',
        { onSubmit: this.onSubmit },
        _react2.default.createElement(
          'div',
          { className: 'row margin' },
          _react2.default.createElement(_TextInputTemplate2.default, {
            icon: 'person',
            error: errors.userName,
            label: 'User Name',
            onChange: this.onChange,
            checkUserExists: this.checkUserExists,
            value: this.state.userName,
            field: 'userName',
            name: 'userName',
            type: 'text'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'row margin' },
          _react2.default.createElement(_TextInputTemplate2.default, {
            icon: 'person',
            error: errors.firstName,
            label: 'First Name',
            onChange: this.onChange,
            value: this.state.firstName,
            field: 'firstName',
            name: 'firstName',
            type: 'text'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'row margin' },
          _react2.default.createElement(_TextInputTemplate2.default, {
            icon: 'person_outline',
            error: errors.lastName,
            label: 'Last Name',
            onChange: this.onChange,
            value: this.state.lastName,
            field: 'lastName',
            name: 'lastName',
            type: 'text'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'row margin' },
          _react2.default.createElement(_TextInputTemplate2.default, {
            icon: 'email',
            error: errors.email,
            label: 'Email',
            onChange: this.onChange,
            checkUserExists: this.checkUserExists,
            value: this.state.email,
            field: 'email',
            type: 'email'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'row margin' },
          _react2.default.createElement(_TextInputTemplate2.default, {
            icon: 'lock',
            error: errors.password,
            label: 'Password',
            onChange: this.onChange,
            value: this.state.password,
            field: 'password',
            name: 'password',
            type: 'password'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'center-align' },
          _react2.default.createElement(
            'button',
            { disabled: this.state.isLoading || this.state.invalid,
              className: 'btn blue-grey', type: 'submit' },
            'Sign Up',
            _react2.default.createElement(
              'i',
              { className: 'material-icons right' },
              'thumb_up'
            )
          )
        )
      );
      return _react2.default.createElement(
        'div',
        null,
        form
      );
    }
  }]);

  return SignupForm;
}(_react2.default.Component);

SignupForm.propTypes = {
  userSignupRequest: _react2.default.PropTypes.func.isRequired,
  addFlashMessage: _react2.default.PropTypes.func.isRequired,
  isUserExists: _react2.default.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: _react.PropTypes.object
};

exports.default = SignupForm;