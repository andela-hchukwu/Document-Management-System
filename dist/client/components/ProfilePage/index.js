'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactReduxSweetalert = require('react-redux-sweetalert');

var _reactReduxSweetalert2 = _interopRequireDefault(_reactReduxSweetalert);

var _userActions = require('../../actions/userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint class-methods-use-this: "off"*/


var ProfilePage = function (_React$Component) {
  _inherits(ProfilePage, _React$Component);

  function ProfilePage(props) {
    _classCallCheck(this, ProfilePage);

    var _this = _possibleConstructorReturn(this, (ProfilePage.__proto__ || Object.getPrototypeOf(ProfilePage)).call(this, props));

    var user = JSON.parse(localStorage.getItem('user'));
    _this.state = {
      user: props.user || user || {}
    };
    _this.handleOnChange = _this.handleOnChange.bind(_this);
    _this.submitData = _this.submitData.bind(_this);
    _this.renderAlert = _this.renderAlert.bind(_this);
    return _this;
  }

  _createClass(ProfilePage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getUserInfo();
      $('.tooltipped').tooltip({ delay: 50 });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        user: nextProps.user
      });
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange(event) {
      var _event$target = event.target,
          field = _event$target.name,
          value = _event$target.value;

      return this.setState(function (state) {
        var user = Object.assign({}, state.user, _defineProperty({}, field, value));
        return { user: user };
      });
    }
  }, {
    key: 'submitData',
    value: function submitData() {
      var userInfo = this.state.user;
      return this.props.updateUserInfo(userInfo);
    }
  }, {
    key: 'renderAlert',
    value: function renderAlert() {
      this.props.swal({
        title: 'Are you sure you want to update your details?',
        text: 'yes',
        type: 'warning',
        showCancelButton: true,
        onConfirm: this.submitData,
        onCancel: this.props.close
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state$user = this.state.user,
          _state$user$firstName = _state$user.firstName,
          firstName = _state$user$firstName === undefined ? '' : _state$user$firstName,
          _state$user$lastName = _state$user.lastName,
          lastName = _state$user$lastName === undefined ? '' : _state$user$lastName,
          _state$user$userName = _state$user.userName,
          userName = _state$user$userName === undefined ? '' : _state$user$userName,
          _state$user$email = _state$user.email,
          email = _state$user$email === undefined ? '' : _state$user$email;

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
                'Edit Your Details'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row manage-user' },
                _react2.default.createElement(
                  'div',
                  { className: 'col user-list' },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'form',
                      { className: 'col s12' },
                      _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                          'div',
                          { className: 'input-field col s6' },
                          _react2.default.createElement('input', {
                            id: 'first_name',
                            type: 'text',
                            name: 'firstName',
                            value: firstName,
                            className: 'validate',
                            onChange: this.handleOnChange
                          }),
                          _react2.default.createElement(
                            'label',
                            { className: 'active', htmlFor: 'first_name' },
                            'First Name'
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'input-field col s6' },
                          _react2.default.createElement('input', {
                            id: 'last_name',
                            name: 'lastName',
                            type: 'text',
                            value: lastName,
                            className: 'validate',
                            onChange: this.handleOnChange
                          }),
                          _react2.default.createElement(
                            'label',
                            { className: 'active', htmlFor: 'last_name' },
                            'Last Name'
                          )
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                          'div',
                          { className: 'input-field col s6' },
                          _react2.default.createElement('input', {
                            id: 'userName',
                            type: 'text',
                            name: 'userName',
                            value: userName,
                            onChange: this.handleOnChange,
                            className: 'validate'
                          }),
                          _react2.default.createElement(
                            'label',
                            { className: 'active', htmlFor: 'user_name' },
                            'Username'
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'input-field col s6' },
                          _react2.default.createElement('input', {
                            id: 'email',
                            type: 'email',
                            value: email,
                            name: 'email',
                            onChange: this.handleOnChange,
                            className: 'validate'
                          }),
                          _react2.default.createElement(
                            'label',
                            { className: 'active', htmlFor: 'email' },
                            'Email'
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'row' },
                          _react2.default.createElement(
                            'div',
                            { className: 'col s6' },
                            _react2.default.createElement(
                              'button',
                              {
                                className: 'btn waves-effect blue-grey',
                                type: 'button',
                                onClick: function onClick() {
                                  return _this2.renderAlert();
                                }
                              },
                              'Update'
                            )
                          )
                        )
                      )
                    )
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

  return ProfilePage;
}(_react2.default.Component);

ProfilePage.propTypes = {
  user: _react.PropTypes.object,
  updateUserInfo: _react.PropTypes.func,
  getUserInfo: _react.PropTypes.func,
  close: _react.PropTypes.func,
  swal: _react.PropTypes.func
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  var user = state.users.user;

  return {
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserInfo: (0, _redux.bindActionCreators)(_userActions.updateUserInfo, dispatch),
    getUserInfo: (0, _redux.bindActionCreators)(_userActions.getUserInfo, dispatch),
    swal: (0, _redux.bindActionCreators)(_reactReduxSweetalert.swal, dispatch),
    close: (0, _redux.bindActionCreators)(_reactReduxSweetalert.close, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProfilePage);