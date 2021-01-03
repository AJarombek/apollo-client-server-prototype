/**
 * E2E tests written with Cypress for the entire application.  These tests used mocked API responses (static JSON files
 * stored in the 'fixtures' directory).
 * @author Andrew Jarombek
 * @since 1/3/2021
 */

describe('Mocked API E2E Tests', () => {
  before(() => {
    cy.interceptAndMockGraphQL();
  });

  it('has a functional workflow of buying flowers', () => {
    cy.visit('/');
    cy.wait('@mockedAPIAllFlowers');
    cy.get('.flower-card').should('have.length', 9);

    cy.get('button .add-to-cart').eq(2).click().click();
    cy.get('.notify-count').contains('2').should('exist');

    cy.get('button .add-to-cart').eq(4).click();
    cy.get('.notify-count').contains('3').should('exist');

    cy.get('button .add-to-cart').eq(5).click();
    cy.get('.notify-count').contains('4').should('exist');

    cy.get('button .add-to-cart').eq(4).click().click().click();
    cy.get('.notify-count').contains('7').should('exist');

    cy.get('.flower-card > img').eq(8).click();
    cy.wait('@mockedAPIFlowerDetails');
    cy.get('.flower-details .footer button').contains('Add to Cart').click();
    cy.get('.flower-details .footer button').contains('Return').click();

    cy.get('.header-nav .cart-icon').click();
    cy.wait('@mockedAPIFlowersForCheckout');

    cy.url().should('include', '/checkout');

    cy.get('.checkout-item').should('have.length', 4);
    cy.checkCartItem('Geranium', 2, '$5.99', '$11.98', 1);
    cy.checkCartItem('Lilac', 4, '$29.99', '$119.96', 2);
    cy.checkCartItem('Narrowleaf Zinnia', 1, '$9.99', '$9.99', 3);
    cy.checkCartItem('Periwinkle', 1, '$4.49', '$4.49', 4);

    cy.get('.checkout-item:nth-child(3) .remove-icon').click();

    cy.get('.checkout-item').should('have.length', 3);
    cy.checkCartItem('Geranium', 2, '$5.99', '$11.98', 1);
    cy.checkCartItem('Lilac', 4, '$29.99', '$119.96', 2);
    cy.checkCartItem('Periwinkle', 1, '$4.49', '$4.49', 3);

    cy.get('.place-order-enabled').should('exist').click();

    cy.wait('@mockedAPIPurchaseFlowers');
    cy.url().should('not.include', '/checkout');
    cy.url().should('include', '/');
  });
});
