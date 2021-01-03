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

  it('is able to purchase items that were populated from localstorage', () => {
    cy.setLocalStorageCart();

    cy.get('.checkout-item').should('have.length', 2);
    cy.get('.notify-count').should('contain.text', 2);

    cy.get('.place-order-enabled').should('exist').click();

    cy.url().should('not.include', '/checkout');
    cy.url().should('include', '/');
    cy.get('.notify-count').should('not.exist');
  });

  it('is able to change the quantities of items in the cart', () => {
    cy.setLocalStorageCart();

    cy.get('.checkout-item').should('have.length', 2);
    cy.get('.notify-count').should('contain.text', 2);
    cy.checkCartItem('Baby Primrose', 1, '$5.99', '$5.99', 1);
    cy.checkCartItem('Pulmonaria', 1, '$7.49', '$7.49', 2);
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$13.48');

    cy.get('.checkout-item:nth-child(1) > .details > .flower-quantity > input')
      .invoke('val', '')
      .clear()
      .type('2')
      .trigger('change');

    cy.get('.checkout-item').should('have.length', 2);
    cy.get('.notify-count').should('contain.text', 3);
    cy.checkCartItem('Baby Primrose', 2, '$5.99', '$11.98', 1);
    cy.checkCartItem('Pulmonaria', 1, '$7.49', '$7.49', 2);
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$19.47');

    cy.get('.checkout-item:nth-child(2) > .details > .flower-quantity > input')
      .invoke('val', '')
      .clear()
      .type('0')
      .trigger('change');

    cy.get('.checkout-item').should('have.length', 2);
    cy.get('.notify-count').should('contain.text', 2);
    cy.checkCartItem('Baby Primrose', 2, '$5.99', '$11.98', 1);
    cy.checkCartItem('Pulmonaria', 0, '$7.49', '$0.00', 2);
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$11.98');
  });

  it('setting the quantity to -1 reverts to 0', () => {
    cy.setLocalStorageCart();

    cy.checkCartItem('Baby Primrose', 1, '$5.99', '$5.99', 1);
    cy.checkCartItem('Pulmonaria', 1, '$7.49', '$7.49', 2);
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$13.48');

    cy.get('.checkout-item:nth-child(2) > .details > .flower-quantity > input')
      .invoke('val', '')
      .clear()
      .type('-1')
      .trigger('change');

    cy.checkCartItem('Baby Primrose', 1, '$5.99', '$5.99', 1);
    cy.checkCartItem('Pulmonaria', 0, '$7.49', '$0.00', 2);
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$5.99');
  });

  it('setting the quantity to a number greater than whats in stock reverts it to the full stock number', () => {
    cy.setLocalStorageCart();

    cy.checkCartItem('Baby Primrose', 1, '$5.99', '$5.99', 1);
    cy.checkCartItem('Pulmonaria', 1, '$7.49', '$7.49', 2);

    cy.get('.checkout-item:nth-child(2) > .details > .flower-quantity > input')
      .invoke('val', '')
      .clear()
      .type('100')
      .trigger('change');

    cy.get('.checkout-item .flower-quantity input')
      .eq(1)
      .invoke('val')
      .then(parseFloat)
      .should('be.lessThan', 100)
      .should('be.greaterThan', 1);
  });

  it('is able to delete items from the cart', () => {
    cy.setLocalStorageCart();

    cy.get('.checkout-item').should('have.length', 2);
    cy.get('.notify-count').should('contain.text', 2);
    cy.checkCartItem('Baby Primrose', 1, '$5.99', '$5.99', 1);
    cy.checkCartItem('Pulmonaria', 1, '$7.49', '$7.49', 2);
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$13.48');

    cy.get('.checkout-item:nth-child(1) .remove-icon').click();

    cy.get('.checkout-item').should('have.length', 1);
    cy.get('.notify-count').should('contain.text', 1);
    cy.checkCartItem('Pulmonaria', 1, '$7.49', '$7.49', 1);
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$7.49');
    cy.get('.place-order-enabled').should('exist');
    cy.get('.place-order-disabled').should('not.exist');

    cy.get('.checkout-item:nth-child(1) .remove-icon').click();

    cy.get('.checkout-item').should('not.exist');
    cy.get('.notify-count').should('not.exist');
    cy.get('.grand-total > p:nth-child(2)').should('contain.text', '$0.00');
    cy.get('.place-order-enabled').should('not.exist');
    cy.get('.place-order-disabled').should('exist');
  });
});
