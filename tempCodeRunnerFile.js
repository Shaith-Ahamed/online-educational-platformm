const { JSDOM } = require('jsdom');

// Create a virtual DOM using JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body><div class="toggle-btn">Toggle</div></body></html>');
const document = dom.window.document