/// <reference types="cypress" />

/**
 * Type definition for the Cypress commands.  This is needed to use custom commands in TypeScript code.
 * @author Andrew Jarombek
 * @since 1/2/2021
 */

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to add flowers to the cart stored in localStorage
     * @example cy.setLocalStorageCart()
     */
    setLocalStorageCart(): void;

    /**
     * Custom command to check if a cart item exists as expected.
     * @param name The name of the flower in the cart.
     * @param quantity The quanitity of the flower in the cart.
     * @param price The flower's unit price.
     * @param totalCost The total cost of the flower purchase (quantity * price).
     * @param itemNumber The index of the item in the cart (starting at 1).
     */
    checkCartItem(name: string, quantity: number, price: string, totalCost: string, itemNumber: number): void;
  }
}
