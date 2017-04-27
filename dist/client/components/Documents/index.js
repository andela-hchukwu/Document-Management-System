'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _documentList = require('./documentList');

var _documentList2 = _interopRequireDefault(_documentList);

var _documentActions = require('../../actions/documentActions');

var documentActions = _interopRequireWildcard(_documentActions);

var _CommonModal = require('../Common/CommonModal');

var _CommonModal2 = _interopRequireDefault(_CommonModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint class-methods-use-this: "off"*/


var DocumentPage = function (_React$Component) {
  _inherits(DocumentPage, _React$Component);

  function DocumentPage(props) {
    _classCallCheck(this, DocumentPage);

    var _this = _possibleConstructorReturn(this, (DocumentPage.__proto__ || Object.getPrototypeOf(DocumentPage)).call(this, props));

    _this.state = {
      doc: {}
    };

    _this.addNewDocument = _this.addNewDocument.bind(_this);
    return _this;
  }

  _createClass(DocumentPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var userId = this.props.user.userId;

      this.props.actions.loadUserDocuments(userId);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.modal').modal();
      $('select').material_select();
      $('.tooltipped').tooltip({ delay: 50 });
    }
  }, {
    key: 'addNewDocument',
    value: function addNewDocument() {
      var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.setState({ doc: doc }, function () {
        $('#docDisplayModal').modal('open');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var personalDocuments = this.props.personalDocuments;

      var count = personalDocuments.length;

      return _react2.default.createElement(
        'div',
        { className: 'document-page row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 z-depth-5 card-panel' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col s12' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s5' },
                  _react2.default.createElement(
                    'div',
                    { id: 'card-alert', className: 'card grey-blue lighten-5' },
                    _react2.default.createElement(
                      'div',
                      { className: 'card-content black-text', id: 'documentCount' },
                      _react2.default.createElement(
                        'p',
                        null,
                        'You have ' + count + ' saved Document' + (count === 1 ? '' : 's')
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col s12' },
                  _react2.default.createElement(_documentList2.default, { showModal: this.addNewDocument, docs: personalDocuments })
                )
              )
            )
          ),
          _react2.default.createElement(_CommonModal2.default, { doc: this.state.doc })
        )
      );
    }
  }]);

  return DocumentPage;
}(_react2.default.Component);

DocumentPage.propTypes = {
  personalDocuments: _react.PropTypes.array.isRequired,
  user: _react.PropTypes.object.isRequired,
  actions: _react.PropTypes.object.isRequired
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(_ref) {
  var _ref$documents = _ref.documents,
      allDocuments = _ref$documents.allDocuments,
      chosenDocument = _ref$documents.chosenDocument,
      _ref$auth = _ref.auth,
      user = _ref$auth.user,
      isAuthenticated = _ref$auth.isAuthenticated;

  var personalDocuments = [];
  if (isAuthenticated) {
    personalDocuments = allDocuments.documents.rows.filter(function (doc) {
      return doc.OwnerId === user.userId;
    });
  }

  var publicDocuments = allDocuments.documents.rows.filter(function (doc) {
    return doc.access === 'public';
  });

  return {
    personalDocuments: personalDocuments,
    publicDocuments: publicDocuments,
    currentDocument: chosenDocument,
    user: user
  };
}

/**
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(documentActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DocumentPage);