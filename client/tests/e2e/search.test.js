/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf.js');

module.exports = {
  Search: (browser) => {
    browser
     .url('http://localhost:4000')
     .click('#login')
     .setValue('input[type=text]', 'tbaneka@jqgn.com')
     .setValue('input[type=password]', '1234567890')
     .click('button[type="submit"]')
     .pause(5000)
     .assert.urlEquals('http://localhost:4000/dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#search')
     .click('#search')
     .setValue('#search', 'New Title')
     .pause(2000)
     .end();
  },
};
