/**
 * E2E tests written with Cypress for the main storefront page.
 * @author Andrew Jarombek
 * @since 8/23/2020
 */

describe('StoreFront E2E Tests', () => {

    beforeEach(() => {
        cy.server();
    });

    it('has the expected number of cards', () => {
        cy.visit('/');
    });
});
