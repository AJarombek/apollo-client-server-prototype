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

  it('clicking the header goes back to the home page', () => {
    cy.url().should('include', '/checkout');
    cy.get('h1').contains('Jarombek Flower Store').click();
    cy.url().should('not.include', '/checkout');
    cy.url().should('include', '/');
  });

  it('the cart is empty by default', () => {
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$0.00');
    cy.get('.place-order-enabled').should('not.exist');
    cy.get('.place-order-disabled').should('exist');
  });

  it('continue shopping returns to the storefront', () => {
    cy.url().should('include', '/checkout');
    cy.get('button').contains('Continue Shopping').click();
    cy.url().should('not.include', '/checkout');
    cy.url().should('include', '/');
  });

  it('populates the cart if there is data in localstorage', () => {
    cy.setLocalStorageCart();

    // Baby Primrose and Pulmonaria exist amongst the checkout items.
    cy.checkCartItem('Baby Primrose', 1, '$5.99', '$5.99', 1);
    cy.checkCartItem('Pulmonaria', 1, '$7.49', '$7.49', 2);

    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$13.48');
    cy.get('.place-order-enabled').should('exist');
    cy.get('.place-order-disabled').should('not.exist');
  });
});
