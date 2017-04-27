'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentReducer;

var _actionTypes = require('../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * [documentReducer description]
 * @param  {[type]} [state=initialState.documents]
 * @param  {object} action
 * @return {[type]}
 */
function documentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.documents;
  var action = arguments[1];

  switch (action.type) {
    case types.LOAD_DOCUMENT_SUCCESS:
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(state), [{ allDocuments: action.document }]));

    case types.CHOOSE_AS_CURRENT_DOCUMENT:
      {
        var chosenDocumentList = state.allDocuments.filter(function (document) {
          return document.id === action.id;
        });
        var chosenDocument = chosenDocumentList[0] || {};
        return Object.assign({}, state, { chosenDocument: chosenDocument });
      }

    case types.UPDATE_DOCUMENT_SUCCESS:
      return [].concat(_toConsumableArray(state.filter(function (document) {
        return document.id !== action.document.id;
      })), [Object.assign({}, { allDocuments: action.document })]);

    default:
      return state;
  }
}