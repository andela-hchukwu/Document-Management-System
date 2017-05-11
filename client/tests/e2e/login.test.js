
// /* eslint func-names: "off"*/
// /* eslint no-unused-vars: "off"*/
// const config = require('../../../nightwatch.conf.js');

// module.exports = {
//   'Document Management System': function (browser) {
//     browser
//       .url('http://localhost:4000')
//       .waitForElementVisible('body')
//       .click('#login')
//       .assert.urlEquals('http://localhost:4000/login')
//       .assert.title('DOCUMENT MANAGEMENT SYSTEM')
//       .saveScreenshot('document-management-login.png')
//       .end();
//   },

//   'Login Users': function (browser) {
//     browser
//       .url('http://localhost:4000')
//       .waitForElementVisible('body')
//       .click('#login')
//       .assert.urlEquals('http://localhost:4000/login')
//       .setValue('input[type=text]', 'tbaneka@jqgn.com')
//       .setValue('input[type=password]', '1234567890')
//       .click('button[type="submit"]')
//       .waitForElementVisible('h5')
//       .assert.urlEquals('http://localhost:4000/dashboard')
//       .end();
//   },

//   'Admin Dashboard Page': function (browser) {
//     browser
//       .url('http://localhost:4000')
//       .waitForElementVisible('body')
//       .click('#login')
//       .assert.urlEquals('http://localhost:4000/login')
//       .waitForElementVisible('input[type=text]')
//       .setValue('input[type=text]', 'tbaneka@jqgn.com')
//       .setValue('input[type=password]', '1234567890')
//       .click('button[type="submit"]')
//       .waitForElementVisible('nav', 5000)
//       .assert.urlEquals('http://localhost:4000/dashboard')
//       .assert.containsText('nav', 'Home')
//       .assert.containsText('nav', 'Saved Documents')
//       .assert.containsText('nav', 'Manage Users')
//       .assert.containsText('nav', 'Logout')
//       .end();
//   },

//   'Regular Users Dashboard Page': function (browser) {
//     browser
//       .url('http://localhost:4000')
//       .waitForElementVisible('body')
//       .click('#login')
//       .assert.urlEquals('http://localhost:4000/login')
//       .waitForElementVisible('body')
//       .setValue('input[type=text]', 'dayo@nedu.com')
//       .setValue('input[type=password]', '1234567890')
//       .click('button[type="submit"]')
//       .waitForElementVisible('nav', 5000)
//       .assert.urlEquals('http://localhost:4000/dashboard')
//       .assert.containsText('nav', 'Home')
//       .assert.containsText('nav', 'Saved Documents')
//       .assert.containsText('nav', 'Logout')
//       .assert.elementNotPresent('#admin')
//       .assert.cssClassNotPresent('nav', 'admin')
//       .end();
//   }
// };
