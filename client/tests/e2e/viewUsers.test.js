const config = require('../../../nightwatch.conf.js');

module.exports = {
  'View Users': (browser) => {
    browser
     .url('http://localhost:4000/')
     .click('#login')
     .setValue('Input[name=identifier]', 'awa@awa.com')
     .setValue('Input[name=password]', 'awa')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:4000/')
     .waitForElementVisible('body')
     .assert.elementPresent('#users')
     .click('#users')
     .pause(1000)
     .assert.urlEquals('http://localhost:4000/profile')
     .waitForElementVisible('Pagination')
     .pause(1000)
     .end();
  }
};
