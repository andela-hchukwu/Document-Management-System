'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _documentActions = require('../../actions/documentActions');

var _documentList = require('../Documents/documentList');

var _documentList2 = _interopRequireDefault(_documentList);

var _CommonModal = require('../Common/CommonModal');

var _CommonModal2 = _interopRequireDefault(_CommonModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardPage = function (_React$Component) {
  _inherits(DashboardPage, _React$Component);

  function DashboardPage(props) {
    _classCallCheck(this, DashboardPage);

    var _this = _possibleConstructorReturn(this, (DashboardPage.__proto__ || Object.getPrototypeOf(DashboardPage)).call(this, props));

    _this.state = {
      isPrivate: false,
      doc: {}
    };

    _this.renderModal = _this.renderModal.bind(_this);
    return _this;
  }

  _createClass(DashboardPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.loadAllDocuments();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.modal').modal();
      $('select').material_select();
      $('.tooltipped').tooltip({ delay: 50 });
      $('.dropdown-button').dropdown();
      $('ul.tabs').tabs();
      $('ul.tabs').tabs('select_tab', 'public');
    }
  }, {
    key: 'renderModal',
    value: function renderModal() {
      var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.setState({ doc: doc }, function () {
        $('#docDisplayModal').modal('open');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          publicDocuments = _props.publicDocuments,
          roleDocuments = _props.roleDocuments,
          privateDocuments = _props.privateDocuments;

      return _react2.default.createElement(
        'div',
        { className: 'dashboard row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12' },
          _react2.default.createElement(
            'div',
            { className: 'col s12 z-depth-5 card-panel' },
            _react2.default.createElement(
              'h5',
              { className: 'center' },
              'DASHBOARD'
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s12' },
                  _react2.default.createElement(
                    'ul',
                    {
                      className: 'tabs tab-demo-active z-depth-1 blue-grey' },
                    _react2.default.createElement(
                      'li',
                      { className: 'tab col s4' },
                      _react2.default.createElement(
                        'a',
                        { className: 'white-text waves-effect waves-light active',
                          href: '#public' },
                        'Public'
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      { className: 'tab col s4' },
                      _react2.default.createElement(
                        'a',
                        { className: 'white-text waves-effect waves-light',
                          href: '#role' },
                        'Role'
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      { className: 'tab col s4' },
                      _react2.default.createElement(
                        'a',
                        { className: 'white-text waves-effect waves-light',
                          href: '#private' },
                        'Private'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col s12' },
                  _react2.default.createElement(_CommonModal2.default, { doc: this.state.doc }),
                  _react2.default.createElement(
                    'div',
                    { id: 'private', className: 'col s12 tab-style' },
                    _react2.default.createElement(
                      'h6',
                      { className: 'center' },
                      'All Private Documents'
                    ),
                    _react2.default.createElement(_documentList2.default, { showModal: this.renderModal, docs: privateDocuments })
                  ),
                  _react2.default.createElement(
                    'div',
                    { id: 'public', className: 'col s12 tab-style' },
                    _react2.default.createElement(
                      'h6',
                      { className: 'center' },
                      'All Public Documents'
                    ),
                    _react2.default.createElement(_documentList2.default, { showModal: this.renderModal, docs: publicDocuments })
                  ),
                  _react2.default.createElement(
                    'div',
                    { id: 'role', className: 'col s12 tab-style' },
                    _react2.default.createElement(
                      'h6',
                      { className: 'center' },
                      'All Accessible Role Documents'
                    ),
                    _react2.default.createElement(_documentList2.default, { showModal: this.renderModal, docs: roleDocuments })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return DashboardPage;
}(_react2.default.Component);

DashboardPage.propTypes = {
  auth: _react.PropTypes.object,
  privateDocuments: _react.PropTypes.array.isRequired,
  roleDocuments: _react.PropTypes.array.isRequired,
  publicDocuments: _react.PropTypes.array.isRequired,
  loadUserDocuments: _react.PropTypes.func.isRequired,
  loadAllDocuments: _react.PropTypes.func.isRequired
};

var filterDocument = function filterDocument(role, rows) {
  return rows.filter(function (doc) {
    return doc.access === role;
  });
};

/**
 * Helper function to get only required properties from state
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  var rows = state.documents.allDocuments.documents.rows;

  var publicDocuments = filterDocument('public', rows);
  var roleDocuments = filterDocument('role', rows);
  var privateDocuments = filterDocument('private', rows);

  return {
    auth: state.auth,
    publicDocuments: publicDocuments,
    roleDocuments: roleDocuments,
    privateDocuments: privateDocuments
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { loadUserDocuments: _documentActions.loadUserDocuments, loadAllDocuments: _documentActions.loadAllDocuments })(DashboardPage);