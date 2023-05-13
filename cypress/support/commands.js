import '@testing-library/cypress/add-commands';

Cypress.Commands.add('filterByName', (name) => {
  cy.getByTestId('name-filter-autocomplete').type(name);

  cy.get('.ac-menu').click();
});

Cypress.Commands.add('clearNameFilter', () => {
  cy.getByText('clear').click();
});

Cypress.Commands.add('login', () => {
  window.localStorage.setItem(
    'auth-data',
    JSON.stringify({ expiresAt: 1887058578000 })
  );
});

Cypress.Commands.add('getByTestId', function (testId) {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getAllByTestId', function (testId) {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByAltText', function (alt) {
  return cy.get(`[alt="${alt}"]`);
});

Cypress.Commands.add('getByText', function (text) {
  return cy.contains(text);
});
