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

var _userActions = require('../../actions/userActions');

var _flashMessages = require('../../actions/flashMessages');

var _roleActions = require('../../actions/roleActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserForm = function (_React$Component) {
  _inherits(UserForm, _React$Component);

  function UserForm(props) {
    _classCallCheck(this, UserForm);

    var _this = _possibleConstructorReturn(this, (UserForm.__proto__ || Object.getPrototypeOf(UserForm)).call(this, props));

    _this.state = {
      errors: {},
      user: props.user || {}
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.updateUser = _this.updateUser.bind(_this);
    // this.saveUser = this.saveUser.bind(this);
    // this.clearError = this.clearError.bind(this);
    return _this;
  }

  _createClass(UserForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.loadRoles();
      $('#mySelectBox').on('change', this.updateSelectState);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.user.id !== nextProps.user.id) {
        this.setState({ user: nextProps.user });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var _event$target = event.target,
          field = _event$target.name,
          value = _event$target.value;

      this.setState(function (state) {
        var user = Object.assign({}, state.user, _defineProperty({}, field, value));
        return { user: user };
      });
    }
  }, {
    key: 'updateUser',
    value: function updateUser(e) {
      var _this2 = this;

      e.preventDefault();
      var user = this.state.user;
      // this.props.updateUserAdmin(this.state.user).then(() => {

      this.props.updateUserAdmin(user).then(function () {
        _toastr2.default.success('User Updated Successfully');
      }).catch(function () {
        _this2.props.addFlashMessage({
          type: 'error',
          text: 'Unable to update user'
        });
        _toastr2.default.error('Unable to update user');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$user = this.state.user,
          userName = _state$user.userName,
          firstName = _state$user.firstName,
          lastName = _state$user.lastName,
          email = _state$user.email,
          roleId = _state$user.roleId;
      var _props$roles = this.props.roles,
          roles = _props$roles === undefined ? [] : _props$roles;

      var form = _react2.default.createElement(
        'div',
        { className: 'col s12 z-depth-5 card-panel' },
        _react2.default.createElement(
          'form',
          { className: 'login-form' },
          _react2.default.createElement(
            'div',
            { className: 'row margin' },
            _react2.default.createElement(_TextInputTemplate2.default, {
              type: 'text',
              name: 'firstName',
              field: 'firstName',
              value: firstName,
              placeholder: 'first name',
              icon: 'person_outline',
              onChange: this.onChange
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'row margin' },
            _react2.default.createElement(_TextInputTemplate2.default, {
              type: 'text',
              name: 'lastName',
              field: 'lastName',
              value: lastName,
              placeholder: 'last name',
              icon: 'person_outline',
              onChange: this.onChange
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'row margin' },
            _react2.default.createElement(_TextInputTemplate2.default, {
              type: 'text',
              name: 'userName',
              field: 'userName',
              value: userName,
              placeholder: 'username',
              icon: 'person',
              onChange: this.onChange
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'row margin' },
            _react2.default.createElement(_TextInputTemplate2.default, {
              type: 'email',
              name: 'email',
              field: 'email',
              value: email,
              placeholder: 'email',
              icon: 'email',
              onChange: this.onChange
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'row margin' },
            _react2.default.createElement(
              'label',
              null,
              'User Role'
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement(
                'select',
                { name: 'roleId', id: 'mySelectBox',
                  value: roleId,
                  className: 'browser-default', onChange: this.onChange },
                _react2.default.createElement(
                  'option',
                  { value: '', disabled: true },
                  'User Role'
                ),
                roles.map(function (role) {
                  return _react2.default.createElement(
                    'option',
                    { key: role.id,
                      value: role.id },
                    role.title
                  );
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'input-field' },
              _react2.default.createElement('input', {
                icon: 'save',
                type: 'submit',
                value: 'Save',
                className: 'btn waves-effect waves-light blue-grey',
                onClick: this.updateUser }),
              _react2.default.createElement('input', {
                type: 'submit',
                value: 'Cancel',
                className: 'btn waves-effect waves-light blue-grey',
                onClick: this.props.cancel })
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

  return UserForm;
}(_react2.default.Component);

UserForm.propTypes = {
  roles: _react.PropTypes.array,
  user: _react.PropTypes.object.isRequired,
  loadRoles: _react.PropTypes.func,
  updateUserAdmin: _react.PropTypes.func,
  saveUserAdmin: _react.PropTypes.func,
  addFlashMessage: _react.PropTypes.func,
  cancel: _react.PropTypes.func
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  var roles = state.roles.roles;

  return {
    roles: roles
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { loadRoles: _roleActions.loadRoles, saveUserAdmin: _userActions.saveUserAdmin, updateUserAdmin: _userActions.updateUserAdmin, addFlashMessage: _flashMessages.addFlashMessage })(UserForm);