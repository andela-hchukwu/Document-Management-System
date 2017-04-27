'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('froala-editor/js/froala_editor.pkgd.min');

require('froala-editor/css/froala_style.min.css');

require('froala-editor/css/froala_editor.pkgd.min.css');

require('font-awesome/css/font-awesome.css');

var _reactFroalaWysiwyg = require('react-froala-wysiwyg');

var _reactFroalaWysiwyg2 = _interopRequireDefault(_reactFroalaWysiwyg);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _documentActions = require('../../actions/documentActions');

var documentActions = _interopRequireWildcard(_documentActions);

var _flashMessages = require('../../actions/flashMessages');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocumentForm = function (_React$Component) {
  _inherits(DocumentForm, _React$Component);

  function DocumentForm(props) {
    _classCallCheck(this, DocumentForm);

    var _this = _possibleConstructorReturn(this, (DocumentForm.__proto__ || Object.getPrototypeOf(DocumentForm)).call(this, props));

    _this.state = {
      errors: {},
      doc: props.doc || {},
      displaySaveButton: true
    };
    _this.onChange = _this.onChange.bind(_this);
    // this.updateSelectState = this.updateSelectState.bind(this);
    _this.handleModelChange = _this.handleModelChange.bind(_this);
    _this.saveDocument = _this.saveDocument.bind(_this);
    _this.updateDocument = _this.updateDocument.bind(_this);
    return _this;
  }

  _createClass(DocumentForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('#accessDropdown').on('change', this.onChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var editable = nextProps.doc.OwnerId === this.props.auth.user.userId || !nextProps.doc.id;
      if (!editable) {
        $('.fr-wrapper').froalaEditor('edit.off');
      }
      this.setState({
        doc: nextProps.doc,
        displaySaveButton: editable
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var _event$target = event.target,
          field = _event$target.name,
          value = _event$target.value;

      var OwnerId = this.props.auth.user.userId;
      var role = String(this.props.auth.user.userRoleId);
      this.setState(function (state) {
        var _Object$assign;

        var doc = Object.assign({}, state.doc, (_Object$assign = {}, _defineProperty(_Object$assign, field, value), _defineProperty(_Object$assign, 'OwnerId', OwnerId), _defineProperty(_Object$assign, 'role', role), _Object$assign));
        return { doc: doc };
      });
    }
  }, {
    key: 'handleModelChange',
    value: function handleModelChange(model) {
      this.setState(function (state) {
        var doc = Object.assign({}, state.doc, { content: model });
        return { doc: doc };
      });
    }
  }, {
    key: 'saveDocument',
    value: function saveDocument(event) {
      var _this2 = this;

      event.preventDefault();
      this.props.actions.saveDocument(this.state.doc, this.props.auth.user.userId).then(function () {
        _toastr2.default.success('Document Successfully Saved');
        $('#docDisplayModal').modal('close');
      }).catch(function () {
        _this2.props.addFlashMessage({
          type: 'error',
          text: 'Cannot save Document'
        });
        _toastr2.default.error('Cannot save Document');
        $('#docDisplayModal').modal('close');
      });
    }
  }, {
    key: 'updateDocument',
    value: function updateDocument(event) {
      var _this3 = this;

      event.preventDefault();
      this.props.actions.updateDocument(this.state.doc, this.props.auth.user.userId).then(function () {
        _toastr2.default.success('Document Successfully Updated');
        $('#docDisplayModal').modal('close');
      }).catch(function () {
        _this3.props.addFlashMessage({
          type: 'error',
          text: 'Unable to update document'
        });
        _toastr2.default.error('Unable to update document');
        $('#docDisplayModal').modal('close');
      });
    }
  }, {
    key: 'redirect',
    value: function redirect() {
      _toastr2.default.success('Document Successfully Saved');
      this.context.router.push('/documents');
      $('#docDisplayModal').modal('close');
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          displaySaveButton = _state.displaySaveButton,
          doc = _state.doc;
      var id = doc.id,
          _doc$title = doc.title,
          title = _doc$title === undefined ? '' : _doc$title,
          _doc$content = doc.content,
          content = _doc$content === undefined ? '' : _doc$content,
          access = doc.access;


      var form = _react2.default.createElement(
        'form',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          !displaySaveButton && 'View Only',
          _react2.default.createElement(
            'div',
            { className: 'input-field col s12' },
            _react2.default.createElement('input', {
              icon: 'subject',
              id: 'title',
              type: 'text',
              value: title,
              name: 'title',
              placeholder: 'Enter a Title here!',
              className: 'validate',
              onChange: this.onChange }),
            _react2.default.createElement(
              'label',
              { id: 'labeltitle',
                htmlFor: 'title', className: 'active' },
              'Title'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'input-field col s12' },
            _react2.default.createElement(_reactFroalaWysiwyg2.default, {
              tag: 'textarea',
              model: content,
              onModelChange: this.handleModelChange })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'div',
            { className: 'input-field col s12' },
            _react2.default.createElement(
              'select',
              { name: 'access', id: 'accessDropdown',
                value: access,
                className: 'browser-default', onChange: this.onChange },
              _react2.default.createElement(
                'option',
                { value: '', disabled: true },
                'Document Visibility Access'
              ),
              _react2.default.createElement(
                'option',
                { value: 'public' },
                'Public'
              ),
              _react2.default.createElement(
                'option',
                { value: 'private' },
                'Private'
              ),
              _react2.default.createElement(
                'option',
                { value: 'role' },
                'Role'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)('input-field col s12', {
                hide: displaySaveButton === false
              }) },
            _react2.default.createElement('input', {
              icon: 'save',
              id: 'saveButton',
              type: 'submit',
              value: 'Save',
              className: 'btn waves-effect waves-light blue-grey',
              onClick: id ? this.updateDocument : this.saveDocument })
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

  return DocumentForm;
}(_react2.default.Component);

DocumentForm.propTypes = {
  auth: _react.PropTypes.object.isRequired,
  onChange: _react.PropTypes.func,
  doc: _react.PropTypes.object.isRequired,
  actions: _react.PropTypes.object.isRequired,
  addFlashMessage: _react.PropTypes.func.isRequired
};

/**
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(documentActions, dispatch),
    addFlashMessage: (0, _redux.bindActionCreators)(_flashMessages.addFlashMessage, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(DocumentForm);