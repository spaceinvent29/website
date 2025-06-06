const fs = require('fs');

document.body.innerHTML = '<header class="site-header"></header><form id="contact-form"></form>';

// require the script after setting up the DOM
afterEach(() => {
  // remove cached module for isolation
  jest.resetModules();
});

test('attaches submit listener to contact form', () => {
  const form = document.getElementById('contact-form');
  const spy = jest.spyOn(form, 'addEventListener');

  require('../main.js');

  document.dispatchEvent(new Event('DOMContentLoaded'));

  expect(spy).toHaveBeenCalledWith('submit', expect.any(Function));
});
