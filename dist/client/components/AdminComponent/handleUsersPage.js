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

var _reactReduxSweetalert = require('react-redux-sweetalert');

var _reactReduxSweetalert2 = _interopRequireDefault(_reactReduxSweetalert);

var _userList = require('./userList');

var _userList2 = _interopRequireDefault(_userList);

var _userActions = require('../../actions/userActions');

var _flashMessages = require('../../actions/flashMessages');

var _userForm = require('./userForm');

var _userForm2 = _interopRequireDefault(_userForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint class-methods-use-this: "off"*/


var HandleUsersPage = function (_React$Component) {
  _inherits(HandleUsersPage, _React$Component);

  function HandleUsersPage(props) {
    _classCallCheck(this, HandleUsersPage);

    var _this = _possibleConstructorReturn(this, (HandleUsersPage.__proto__ || Object.getPrototypeOf(HandleUsersPage)).call(this, props));

    _this.state = {
      displayForm: false,
      user: {}
    };
    _this.deleteUser = _this.deleteUser.bind(_this);
    _this.renderUserForm = _this.renderUserForm.bind(_this);
    _this.renderAlert = _this.renderAlert.bind(_this);
    _this.cancelUserForm = _this.cancelUserForm.bind(_this);
    return _this;
  }

  _createClass(HandleUsersPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.retrieveUsers();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.tooltipped').tooltip({ delay: 50 });
    }
  }, {
    key: 'renderAlert',
    value: function renderAlert(id) {
      var _this2 = this;

      this.props.swal({
        title: 'Warning!',
        text: 'Are you sure you want to delete user?',
        type: 'info',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          return _this2.deleteUser(id);
        },
        onCancel: this.props.close
      });
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(id) {
      var _this3 = this;

      this.props.deleteUser(id).then(function () {
        return _toastr2.default.success('User Successfully Deleted');
      }).catch(function () {
        _this3.props.addFlashMessage({
          type: 'error',
          text: 'Unable to delete user'
        });
        _toastr2.default.error('Unable to delete user');
      });
    }
  }, {
    key: 'renderUserForm',
    value: function renderUserForm() {
      var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var text = 'Update User Details';
      this.setState({ displayForm: true, text: text, user: user });
    }
  }, {
    key: 'cancelUserForm',
    value: function cancelUserForm() {
      this.setState({ displayForm: false, user: {} });
    }
  }, {
    key: 'render',
    value: function render() {
      var rows = this.props.rows;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col s12' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 z-depth-5 card-panel card-body' },
              _react2.default.createElement(
                'h4',
                { className: 'center' },
                'Manage User Details and Permissions'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row manage-user' },
                _react2.default.createElement(
                  'div',
                  { className: 'col user-list' },
                  _react2.default.createElement(_userList2.default, { editUser: this.renderUserForm, deleteUser: this.renderAlert, rows: rows })
                ),
                this.state.displayForm && _react2.default.createElement(
                  'div',
                  { className: 'col s5' },
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'h6',
                      null,
                      this.state.text
                    ),
                    _react2.default.createElement(_userForm2.default, { cancel: this.cancelUserForm, user: this.state.user })
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(_reactReduxSweetalert2.default, null)
      );
    }
  }]);

  return HandleUsersPage;
}(_react2.default.Component);

HandleUsersPage.propTypes = {
  retrieveUsers: _react.PropTypes.func,
  deleteUser: _react.PropTypes.func,
  swal: _react.PropTypes.func.isRequired,
  close: _react.PropTypes.func.isRequired,
  addFlashMessage: _react2.default.PropTypes.func.isRequired,
  rows: _react2.default.PropTypes.array
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  var rows = state.users.allUsers.users.rows;

  return {
    rows: rows
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  retrieveUsers: _userActions.retrieveUsers,
  deleteUser: _userActions.deleteUser,
  swal: _reactReduxSweetalert.swal,
  close: _reactReduxSweetalert.close,
  addFlashMessage: _flashMessages.addFlashMessage
})(HandleUsersPage);