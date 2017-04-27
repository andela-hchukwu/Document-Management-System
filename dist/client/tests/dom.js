'use strict';

var _jsdom = require('jsdom');

//eslint-disable-line

var exposedProperties = ['window', 'navigator', 'document']; /* dom.js */


global.document = (0, _jsdom.jsdom)('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function (property) {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};