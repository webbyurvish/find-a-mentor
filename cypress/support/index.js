/// <reference types="cypress" />

import './commands';

let polyfill;

// Polyfill window.fetch because there is no native support from Cypress yet
// Adapted from: https://github.com/cypress-io/cypress/issues/95#issuecomment-517594737
before(() => {
  cy.readFile('node_modules/whatwg-fetch/dist/fetch.umd.js').then(
    (contents) => {
      polyfill = contents;
    }
  );
});

// use `Cypress` instead of `cy` so this persists across all tests
Cypress.on('window:before:load', (win) => {
  // @ts-ignore:next-line
  delete win.fetch;
  win.eval(polyfill);
});
