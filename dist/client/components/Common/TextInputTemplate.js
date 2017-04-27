'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInputTemplate = function TextInputTemplate(_ref) {
  var field = _ref.field,
      value = _ref.value,
      label = _ref.label,
      error = _ref.error,
      type = _ref.type,
      onChange = _ref.onChange,
      checkUserExists = _ref.checkUserExists,
      clearError = _ref.clearError,
      placeholder = _ref.placeholder,
      icon = _ref.icon;

  var errorClass = 'input-field col s12';
  if (error && error.length > 0) {
    errorClass += 'red-text';
  }

  return _react2.default.createElement(
    'div',
    { className: errorClass },
    _react2.default.createElement(
      'i',
      { className: 'material-icons prefix' },
      icon
    ),
    _react2.default.createElement('input', {
      value: value,
      onChange: onChange,
      onBlur: checkUserExists,
      type: type,
      name: field,
      placeholder: placeholder,
      icon: icon,
      className: 'validate',
      onFocus: clearError
    }),
    error && _react2.default.createElement(
      'span',
      { className: 'red-text' },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'error_outline'
      ),
      error
    ),
    _react2.default.createElement(
      'label',
      { htmlFor: field, classnames: 'active' },
      label
    )
  );
};

TextInputTemplate.propTypes = {
  field: _react.PropTypes.string,
  value: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.string,
  icon: _react.PropTypes.string,
  error: _react.PropTypes.string,
  type: _react.PropTypes.string.isRequired,
  onChange: _react.PropTypes.func,
  checkUserExists: _react.PropTypes.func,
  clearError: _react.PropTypes.func,
  placeholder: _react.PropTypes.string
};

TextInputTemplate.defaultProps = {
  type: 'text'
};

exports.default = TextInputTemplate;