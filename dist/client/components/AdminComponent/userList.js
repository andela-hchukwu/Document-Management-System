'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _disabledItems = require('./disabledItems');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserList = function UserList(_ref) {
  var rows = _ref.rows,
      editUser = _ref.editUser,
      deleteUser = _ref.deleteUser;
  return _react2.default.createElement(
    'div',
    { className: 'user-collection' },
    _react2.default.createElement(
      'ul',
      { className: 'collection' },
      rows.map(function (user) {
        return _react2.default.createElement(
          'li',
          { key: user.email, className: 'collection-item' },
          _react2.default.createElement(
            'div',
            { className: 'row user-collection-item' },
            _react2.default.createElement(
              'div',
              { className: 'col s4 offset s2 email' },
              user.email
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s2 name' },
              user.userName
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s1 role' },
              user.Role.title
            ),
            _react2.default.createElement(
              'div',
              { className: 'user-buttons row col s3' },
              _react2.default.createElement(
                'a',
                { className: 'waves-effect waves-light btn blue-grey ' + (0, _disabledItems.addDisabledClass)(user.Role.title, _disabledItems.disabledUsers),
                  onClick: function onClick() {
                    return editUser(user);
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
                { className: 'waves-effect waves-light btn blue-grey ' + (0, _disabledItems.addDisabledClass)(user.Role.title, _disabledItems.disabledUsers),
                  onClick: function onClick() {
                    return deleteUser(user.id);
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

UserList.propTypes = {
  editUser: _react.PropTypes.func.isRequired,
  deleteUser: _react.PropTypes.func.isRequired,
  rows: _react2.default.PropTypes.array
};

exports.default = UserList;