'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _disabledItems = require('./disabledItems');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoleList = function RoleList(_ref) {
  var rolesArray = _ref.rolesArray,
      editRole = _ref.editRole,
      deleteRole = _ref.deleteRole;
  return _react2.default.createElement(
    'div',
    { className: 'role-collection' },
    _react2.default.createElement(
      'ul',
      { className: 'collection' },
      rolesArray.map(function (role) {
        return _react2.default.createElement(
          'li',
          { key: role.title, className: 'collection-item' },
          _react2.default.createElement(
            'div',
            { className: 'row user-collection-item' },
            _react2.default.createElement(
              'div',
              { className: 'col s4 offset s2 email' },
              role.title
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s2 name' },
              role.id
            ),
            _react2.default.createElement(
              'div',
              { className: 'user-buttons row col s3' },
              _react2.default.createElement(
                'a',
                { className: 'waves-effect waves-light btn blue-grey ' + (0, _disabledItems.addDisabledClass)(role.title),
                  onClick: function onClick() {
                    return editRole(role);
                  } },
                _react2.default.createElement(
                  'i',
                  { className: 'tiny material-icons left' },
                  'edit'
                ),
                'edit'
              ),
              _react2.default.createElement(
                'a',
                { className: 'waves-effect waves-light btn blue-grey ' + (0, _disabledItems.addDisabledClass)(role.title),
                  onClick: function onClick() {
                    return deleteRole(role.id);
                  } },
                _react2.default.createElement(
                  'i',
                  { className: 'tiny material-icons left' },
                  'delete'
                ),
                'delete'
              )
            )
          )
        );
      })
    )
  );
};

RoleList.propTypes = {
  editRole: _react.PropTypes.func.isRequired,
  deleteRole: _react.PropTypes.func.isRequired,
  rolesArray: _react2.default.PropTypes.array.isRequired
};

exports.default = RoleList;