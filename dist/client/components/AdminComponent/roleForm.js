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

var _roleActions = require('../../actions/roleActions');

var _flashMessages = require('../../actions/flashMessages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleForm = function (_React$Component) {
  _inherits(RoleForm, _React$Component);

  function RoleForm(props) {
    _classCallCheck(this, RoleForm);

    var _this = _possibleConstructorReturn(this, (RoleForm.__proto__ || Object.getPrototypeOf(RoleForm)).call(this, props));

    _this.state = {
      role: props.role || {}
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.saveRole = _this.saveRole.bind(_this);
    _this.updateRole = _this.updateRole.bind(_this);
    return _this;
  }

  _createClass(RoleForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.loadRoles();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.role.id !== nextProps.role.id) {
        this.setState({ role: nextProps.role });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      event.preventDefault();
      var _event$target = event.target,
          field = _event$target.name,
          value = _event$target.value;

      this.setState(function (state) {
        var role = Object.assign({}, state.role, _defineProperty({}, field, value));
        return { role: role };
      });
    }
  }, {
    key: 'saveRole',
    value: function saveRole(e) {
      var _this2 = this;

      e.preventDefault();
      var role = this.state.role;

      this.props.saveRole(role).then(function () {
        _toastr2.default.success('Role Successfully Saved!');
      }).catch(function () {
        _this2.props.addFlashMessage({
          type: 'error',
          text: 'Unable to save role, please try again.'
        });
        _toastr2.default.error('Unable to save role');
      });
    }
  }, {
    key: 'updateRole',
    value: function updateRole(e) {
      var _this3 = this;

      e.preventDefault();
      var role = this.state.role;

      this.props.updateRole(role).then(function () {
        _toastr2.default.success('Role Successfully Updated!');
      }).catch(function () {
        _this3.props.addFlashMessage({
          type: 'error',
          text: 'Unable to update role'
        });
        _toastr2.default.error('Unable to update role');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$role = this.state.role,
          title = _state$role.title,
          id = _state$role.id;

      var form = _react2.default.createElement(
        'div',
        { className: 'col s12 z-depth-5 card-panel' },
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row margin' },
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', {
                type: 'text',
                id: 'title',
                name: 'title',
                value: title,
                placeholder: 'title',
                className: 'validate',
                onChange: this.onChange
              }),
              _react2.default.createElement('input', {
                type: 'text',
                id: 'id',
                name: 'id',
                value: id,
                placeholder: 'id',
                className: 'validate',
                onChange: this.onChange
              }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'title', className: 'active' },
                'Role Title'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', {
                id: 'btnSave',
                type: 'submit',
                value: 'Save',
                className: 'btn waves-effect waves-light blue-grey',
                onClick: id ? this.updateRole : this.saveRole }),
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

  return RoleForm;
}(_react2.default.Component);

RoleForm.propTypes = {
  rolesArray: _react.PropTypes.array.isRequired,
  role: _react.PropTypes.object.isRequired,
  auth: _react.PropTypes.object.isRequired,
  saveRole: _react.PropTypes.func,
  updateRole: _react.PropTypes.func,
  addFlashMessage: _react.PropTypes.func.isRequired,
  cancel: _react.PropTypes.func
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  var rolesArray = state.roles.allRoles.rolesArray;

  return {
    rolesArray: rolesArray
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  loadRoles: _roleActions.loadRoles,
  saveRole: _roleActions.saveRole,
  updateRole: _roleActions.updateRole,
  addFlashMessage: _flashMessages.addFlashMessage
})(RoleForm);