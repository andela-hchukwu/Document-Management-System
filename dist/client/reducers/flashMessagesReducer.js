'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _actionTypes = require('../actions/actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actionTypes.ADD_FLASH_MESSAGE:
      return [].concat(_toConsumableArray(state), [{
        id: _shortid2.default.generate(),
        type: action.message.type,
        text: action.message.text
      }]);
    case _actionTypes.DELETE_FLASH_MESSAGE:
      var index = (0, _findIndex2.default)(state, { id: action.id });
      if (index >= 0) {
        return [].concat(_toConsumableArray(state.slice(0, index)), _toConsumableArray(state.slice(index + 1)));
      }
      return state;

    default:
      return state;
  }
};