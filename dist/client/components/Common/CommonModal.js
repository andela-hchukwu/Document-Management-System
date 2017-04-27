'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _documentForm = require('../Documents/documentForm');

var _documentForm2 = _interopRequireDefault(_documentForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint class-methods-use-this: "off"*/


var CommonModal = function (_React$Component) {
  _inherits(CommonModal, _React$Component);

  function CommonModal() {
    _classCallCheck(this, CommonModal);

    return _possibleConstructorReturn(this, (CommonModal.__proto__ || Object.getPrototypeOf(CommonModal)).apply(this, arguments));
  }

  _createClass(CommonModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.modal').modal();
      $('select').material_select();
      $('#title').parent().find('label').addClass('active');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          auth = _props.auth,
          _props$doc = _props.doc,
          doc = _props$doc === undefined ? {} : _props$doc;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { id: 'docDisplayModal', className: 'modal' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'a',
              { href: '#',
                className: 'btn-floating btn-flat blue-grey closeModal modal-close' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'close'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement(
              'h4',
              null,
              'Document'
            ),
            _react2.default.createElement(_documentForm2.default, { auth: auth, doc: doc })
          )
        )
      );
    }
  }]);

  return CommonModal;
}(_react2.default.Component);

CommonModal.propTypes = {
  auth: _react.PropTypes.object.isRequired,
  doc: _react.PropTypes.object
};

/**
 * @param  {object} state
 * @return {object}
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CommonModal);