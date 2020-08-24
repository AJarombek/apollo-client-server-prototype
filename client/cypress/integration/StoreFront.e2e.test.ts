/**
 * E2E tests written with Cypress for the main storefront page.
 * @author Andrew Jarombek
 * @since 8/23/2020
 */

describe('StoreFront E2E Tests', () => {

    beforeEach(() => {
        cy.server();
        cy.visit('/');
    });

    it('has the expected number of cards', () => {
        cy.get('.flower-card').should('have.length', 9);
    });

    it("adds items to the cart when clicking 'Add to Cart +'", () => {
        cy.get('.notify-count').should('not.exist');

        cy.get('button .add-to-cart').eq(0).click();

        cy.get('.notify-count').contains('1').should('exist');

        cy.get('button .add-to-cart').eq(0).click();
        cy.get('button .add-to-cart').eq(2).click();

        cy.get('.notify-count').contains('3').should('exist');
    });

    it('clicking the header reloads the page', () => {
        cy.get('h1').contains('Jarombek Flower Store').click();
        cy.url().should('include', '/');
    });

    it('clicking a flower picture shows a modal with additional details', () => {

    });
});
