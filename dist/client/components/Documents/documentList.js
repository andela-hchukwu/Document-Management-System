'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _reactRedux = require('react-redux');

var _documentActions = require('../../actions/documentActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocumentList = function (_Component) {
  _inherits(DocumentList, _Component);

  function DocumentList() {
    _classCallCheck(this, DocumentList);

    var _this = _possibleConstructorReturn(this, (DocumentList.__proto__ || Object.getPrototypeOf(DocumentList)).call(this));

    _this.state = {
      doc: {}
    };
    _this.deleteDocument = _this.deleteDocument.bind(_this);
    return _this;
  }

  _createClass(DocumentList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.tooltipped').tooltip({ delay: 50 });
    }
  }, {
    key: 'deleteDocument',
    value: function deleteDocument(id) {
      var userId = this.props.user.userId;

      var result = confirm('Do you want to delete this docuement?');
      if (result) {
        this.props.deleteDocument(id, userId).then(function () {
          return _toastr2.default.success('Document Successfully Deleted');
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var docs = this.props.docs;

      return _react2.default.createElement(
        'div',
        { className: 'doc-collection' },
        _react2.default.createElement(
          'ul',
          { className: 'collection' },
          docs.map(function (doc) {
            return _react2.default.createElement(
              'li',
              { key: doc.id, className: 'collection-item' },
              _react2.default.createElement(
                'div',
                { className: 'row doc-collection-item' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s4 offset s2 title' },
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    doc.title
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'user-buttons row col s3' },
                  _react2.default.createElement(
                    'a',
                    {
                      className: 'waves-effect waves-light btn blue-grey',
                      id: 'editButton',
                      onClick: function onClick() {
                        return _this2.props.showModal(doc);
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
                    {
                      className: 'waves-effect waves-light btn blue-grey',
                      onClick: function onClick() {
                        return _this2.deleteDocument(doc.id);
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
        ),
        _react2.default.createElement(
          'div',
          { className: 'fixed-action-btn horizontal' },
          _react2.default.createElement(
            'a',
            { className: 'btn-floating btn-large tooltipped blue-grey',
              'data-position': 'top', 'data-delay': '50',
              'data-tooltip': 'create new document',
              onClick: function onClick() {
                return _this2.props.showModal();
              }
            },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'note_add'
            )
          )
        )
      );
    }
  }]);

  return DocumentList;
}(_react.Component);

DocumentList.propTypes = {
  deleteDocument: _react.PropTypes.func.isRequired,
  docs: _react2.default.PropTypes.array.isRequired,
  showModal: _react.PropTypes.func.isRequired,
  user: _react2.default.PropTypes.object.isRequired
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(_ref) {
  var user = _ref.auth.user;

  return {
    user: user
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { deleteDocument: _documentActions.deleteDocument })(DocumentList);