'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reactRouter = require('react-router');

var _Header = require('../../components/Common/Header');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Header Component', function () {
  var wrapper = void 0;
  var mockFunc = sinon.spy();
  var headerProps = {
    isAuthenticated: false,
    user: {},
    logout: mockFunc,
    isAdmin: false
  };

  describe('when user is signed out', function () {
    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Header.Header, headerProps));
    });
    it('should have Links', function () {
      expect(wrapper.find(_reactRouter.Link)).to.have.length(2);
      expect(wrapper.find(_reactRouter.IndexLink)).to.have.length(1);
    });
  });

  describe('when user is signed in', function () {
    var authProps = {
      isAuthenticated: true,
      user: {
        userName: 'test'
      }
    };
    var navItem = void 0;
    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Header.Header, _extends({}, headerProps, authProps)));
      navItem = wrapper.find('ul').at(1);
    });
    it('should have Links', function () {
      expect(navItem.html()).to.contain('Hello, ' + authProps.user.userName);
      expect(wrapper.find(_reactRouter.Link)).to.have.length(2);
      expect(wrapper.find(_reactRouter.IndexLink)).to.have.length(1);
    });
    it('should trigger logout when clicked', function () {
      var logoutLink = navItem.find('li').last().find('a');
      logoutLink.simulate('click', { preventDefault: mockFunc });
      expect(mockFunc).to.have.property('callCount', 2);
    });
  });

  describe('mapStateToProps', function () {
    it('should return correct props if user is not authenticated', function () {
      var mockState = { auth: { isAuthenticated: false } };

      var _mapStateToProps = (0, _Header.mapStateToProps)(mockState),
          isAuthenticated = _mapStateToProps.isAuthenticated,
          user = _mapStateToProps.user,
          isAdmin = _mapStateToProps.isAdmin;

      expect(isAuthenticated).to.equal(false);
      expect(user).to.be.undefined; //eslint-disable-line
      expect(isAdmin).to.equal(false);
    });
    it('should return correct props if user is authenticated', function () {
      var mockState = { auth: { isAuthenticated: true, user: { userRoleId: 2 } } };

      var _mapStateToProps2 = (0, _Header.mapStateToProps)(mockState),
          isAuthenticated = _mapStateToProps2.isAuthenticated,
          user = _mapStateToProps2.user,
          isAdmin = _mapStateToProps2.isAdmin;

      expect(isAuthenticated).to.equal(true);
      expect(user).to.be.defined; //eslint-disable-line
      expect(isAdmin).to.equal(false);
    });
    it('should return correct props if user is authenticated', function () {
      var mockState = { auth: { isAuthenticated: true, user: { userRoleId: 1 } } };

      var _mapStateToProps3 = (0, _Header.mapStateToProps)(mockState),
          isAuthenticated = _mapStateToProps3.isAuthenticated,
          user = _mapStateToProps3.user,
          isAdmin = _mapStateToProps3.isAdmin;

      expect(isAuthenticated).to.equal(true);
      expect(user).to.be.defined; //eslint-disable-line
      expect(isAdmin).to.equal(true);
    });
  });
});