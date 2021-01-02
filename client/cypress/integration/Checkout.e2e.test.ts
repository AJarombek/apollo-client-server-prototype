/**
 * E2E tests written with Cypress for the checkout page.
 * @author Andrew Jarombek
 * @since 8/23/2020
 */

describe('Checkout E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/checkout');
  });

  it('clicking the header reloads the page', () => {
    cy.get('h1').contains('Jarombek Flower Store').click();
    cy.url().should('include', '/');
  });
});
