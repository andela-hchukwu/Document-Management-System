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

var _roleList = require('./roleList');

var _roleList2 = _interopRequireDefault(_roleList);

var _roleActions = require('../../actions/roleActions');

var _flashMessages = require('../../actions/flashMessages');

var _roleForm = require('./roleForm');

var _roleForm2 = _interopRequireDefault(_roleForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint class-methods-use-this: "off"*/


var ManangeRolePage = function (_React$Component) {
  _inherits(ManangeRolePage, _React$Component);

  function ManangeRolePage(props) {
    _classCallCheck(this, ManangeRolePage);

    var _this = _possibleConstructorReturn(this, (ManangeRolePage.__proto__ || Object.getPrototypeOf(ManangeRolePage)).call(this, props));

    _this.state = {
      displayForm: false,
      role: {}
    };
    _this.deleteRole = _this.deleteRole.bind(_this);
    _this.renderRoleForm = _this.renderRoleForm.bind(_this);
    _this.renderAlert = _this.renderAlert.bind(_this);
    _this.cancelRoleForm = _this.cancelRoleForm.bind(_this);
    return _this;
  }

  _createClass(ManangeRolePage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.loadRoles();
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
        text: 'Are you sure you want to delete role?',
        type: 'info',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          return _this2.deleteRole(id);
        },
        onCancel: this.props.close
      });
    }
  }, {
    key: 'deleteRole',
    value: function deleteRole(id) {
      var _this3 = this;

      this.props.deleteRole(id).then(function () {
        return _toastr2.default.success('Role Successfully Deleted');
      }).catch(function () {
        _this3.props.addFlashMessage({
          type: 'error',
          text: 'Unable to delete role'
        });
        _toastr2.default.error('Unable to delete role');
      });
    }
  }, {
    key: 'renderRoleForm',
    value: function renderRoleForm() {
      var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var text = 'Update Role Details';
      this.setState({ displayForm: true, text: text, role: role });
    }
  }, {
    key: 'cancelRoleForm',
    value: function cancelRoleForm() {
      this.setState({ displayForm: false, user: {} });
    }
  }, {
    key: 'render',
    value: function render() {
      var rolesArray = this.props.rolesArray;

      console.log('roles========>', rolesArray, this.props);
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
                'Manage Role Details and Permissions'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row manage-user' },
                _react2.default.createElement(
                  'div',
                  { className: 'col user-list' },
                  _react2.default.createElement(_roleList2.default, { editRole: this.renderRoleForm, deleteRole: this.renderAlert, rolesArray: rolesArray })
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
                    _react2.default.createElement(_roleForm2.default, { cancel: this.cancelRoleForm, role: this.state.role })
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

  return ManangeRolePage;
}(_react2.default.Component);

ManangeRolePage.propTypes = {
  loadRoles: _react.PropTypes.func.isRequired,
  deleteRole: _react.PropTypes.func.isRequired,
  rolesArray: _react.PropTypes.array.isRequired,
  swal: _react.PropTypes.func.isRequired,
  close: _react.PropTypes.func.isRequired,
  addFlashMessage: _react2.default.PropTypes.func.isRequired
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  console.log(state.roles);
  var rolesArray = state.roles.allRoles.rolesArray;

  return {
    rolesArray: rolesArray
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { loadRoles: _roleActions.loadRoles, deleteRole: _roleActions.deleteRole, swal: _reactReduxSweetalert.swal, close: _reactReduxSweetalert.close, addFlashMessage: _flashMessages.addFlashMessage })(ManangeRolePage);