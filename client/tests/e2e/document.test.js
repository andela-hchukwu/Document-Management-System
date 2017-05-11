// /* eslint func-names: "off"*/
// /* eslint no-unused-vars: "off"*/
// // import faker from 'faker';

// const config = require('../../../nightwatch.conf.js');

// module.exports = {
//   // '@disabled': true,
//   'Saved Documents Page': function (browser) {
//     browser
//       .url('http://localhost:4000/')
//       .waitForElementVisible('body')
//       .click('#login')
//       .assert.urlEquals('http://localhost:4000/login')
//       .setValue('input[type=text]', 'tbaneka@jqgn.com')
//       .setValue('input[type=password]', '1234567890')
//       .click('.btn')
//       .waitForElementVisible('nav', 10000)
//       .assert.urlEquals('http://localhost:4000/dashboard')
//       .assert.containsText('nav', 'home')
//       .waitForElementVisible('li[id="personalDocs"]', 10000)
//       .click('li[id="personalDocs"]')
//       .moveToElement('li[id="personalDocs"]', 0, 0)
//       .mouseButtonClick(0)
//       .waitForElementVisible('div[id="card-alert"]', 5000)
//       .assert.urlEquals('http://localhost:4000/thedocuments')
//       .assert.containsText('div[id="card-alert"]',
//       'You have 1 saved Document')
//       .assert.elementPresent('div[id="editButton"]')
//       .moveToElement('div[id="editButton"]', 0, 0)
//       .mouseButtonClick(0)
//       .assert.elementPresent('Input[id="title"]')
//       .setValue('Input[id="title"]', 'Surgical Precision')
//       .setValue('div.fr-element', 'Masterful Dodgery')
//       .setValue('select[id="accessDropdown"]', 'public')
//       .click('input[type="submit"]')
//       .end();
//   }
// };
