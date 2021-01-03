// https://on.cypress.io/custom-commands

/**
 * Set the browsers local storage to contain two flowers.
 */
Cypress.Commands.add('setLocalStorageCart', () => {
  window.localStorage.setItem(
    'cart',
    JSON.stringify([
      { id: '2', count: 1 },
      { id: '7', count: 1 }
    ])
  );
});

/**
 * Check that an item in a cart exists as expected.
 */
Cypress.Commands.add('checkCartItem', (name, quantity, price, totalCost, itemNumber) => {
  const itemNo = itemNumber - 1;

  cy.get('.checkout-item .flower-name').eq(itemNo).should('contain.text', name);
  cy.get('.checkout-item .flower-quantity input').eq(itemNo).invoke('val').should('contain', quantity);
  cy.get('.checkout-item .flower-prices').eq(itemNo).should('contain.text', price);
  cy.get('.checkout-item .total-cost').eq(itemNo).should('contain.text', totalCost);
});
