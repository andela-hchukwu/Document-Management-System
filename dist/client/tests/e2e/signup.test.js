'use strict';

/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
// import faker from 'faker';

var config = require('../../../nightwatch.conf.js');

module.exports = {
  // '@disabled': true,
  'Signup Page': function SignupPage(browser) {
    browser.url('http://localhost:7070/signup').waitForElementVisible('body').saveScreenshot('doc-man-signup.png').end();
  },

  'Signup New User': function SignupNewUser(browser) {
    browser.url('http://localhost:7070/signup').waitForElementVisible('body').setValue('input[name=userName]', 'lagbaja').setValue('input[name=firstName]', 'tamedo').setValue('input[name=lastName]', 'lagbaja').setValue('input[type=email]', 'lagbaja@tamedo.com').setValue('input[name=password]', 'lagbaja').click('button[type="submit"]').waitForElementVisible('nav', 5000).assert.urlEquals('http://localhost:7070/signup').assert.containsText('nav', 'Login').assert.elementNotPresent('#adminTab').assert.cssClassNotPresent('nav', 'admin').end();
  }
};