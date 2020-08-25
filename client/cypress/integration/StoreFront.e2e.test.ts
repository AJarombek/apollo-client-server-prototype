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
        cy.get('.flower-card').should('have.length', 9);
    });

    it("adds items to the cart when clicking 'Add to Cart +'", () => {
        cy.visit('/');
        cy.get('.notify-count').should('not.exist');

        cy.get('button .add-to-cart').eq(0).click();

        cy.get('.notify-count').contains('1').should('exist');

        cy.get('button .add-to-cart').eq(0).click();
        cy.get('button .add-to-cart').eq(2).click();

        cy.get('.notify-count').contains('3').should('exist');
    });

    it('clicking the header reloads the page', () => {
        cy.visit('/');
        cy.get('h1').contains('Jarombek Flower Store').click();
        cy.url().should('include', '/');
    });

    it('clicking a flower picture shows a modal with additional details', () => {
        cy.visit('/');
        cy.get('.flower-details').should('not.exist');
        cy.get('.flower-card .details > h6').eq(0).should('contain', 'Azalea');

        cy.get('.flower-card > img').eq(0).click();

        cy.get('.flower-details').should('exist');
        cy.get('.flower-details .header .name').should('contain.text', 'Azalea');
    });

    it('can add a flower to the cart from the additional details modal', () => {
        cy.visit('/');
        cy.get('.notify-count').should('not.exist');

        cy.get('.flower-card > img').eq(0).click();
        cy.get('.flower-details .footer button').contains('Add to Cart').click();

        cy.get('.notify-count').contains('1').should('exist');
    });

    it('an existing cart is restored from localstorage', () => {
        const existingCart = [{ id: 1, count: 3}, { id: 2, count: 1}];
        localStorage.setItem('cart', JSON.stringify(existingCart));

        cy.visit('/');
        cy.get('.notify-count').contains('4').should('exist');
    });

    it('flower details opens and closes', () => {
        cy.visit('/');
        cy.get('.flower-details').should('not.exist');

        cy.get('.flower-card > img').eq(1).click();
        cy.get('.flower-details').should('exist');

        cy.get('.flower-details .footer button').contains('Return').click();
        cy.get('.flower-details').should('not.exist');
    });

    it('navigates to the checkout page with the expected checked out items', () => {
        cy.visit('/');

        // Add Azalea (1) to the cart
        cy.get('.flower-card h6').eq(0).should('contain.text', 'Azalea');
        cy.get('.flower-card .prices').eq(0).contains('$19.99').should('exist');

        cy.get('button .add-to-cart').eq(0).click();
        cy.get('.notify-count').contains('1').should('exist');

        // Add Baby Primrose (1) to the cart
        cy.get('.flower-card h6').eq(1).should('contain.text', 'Baby Primrose');
        cy.get('.flower-card .prices').eq(1).contains('$5.99').should('exist');

        cy.get('button .add-to-cart').eq(1).click();
        cy.get('.notify-count').contains('2').should('exist');

        // Add Heart Flower (2) to the cart
        cy.get('.flower-card h6').eq(3).should('contain.text', 'Heart Flower');
        cy.get('.flower-card .prices').eq(3).contains('$12.31').should('exist');

        cy.get('button .add-to-cart').eq(3).click();
        cy.get('button .add-to-cart').eq(3).click();
        cy.get('.notify-count').contains('4').should('exist');

        // Navigate to checkout
        cy.get('.header-nav .cart-icon').click();

        cy.url().should('include', '/checkout');
        cy.get('.checkout-item').should('have.length', 3);

        // Baby Primrose exists amongst the checkout items.
        cy.get('.checkout-item .flower-name').eq(0).should('contain.text', 'Baby Primrose');
        cy.get('.checkout-item .flower-quantity input').eq(0).invoke('val').should('contain', '1');
        cy.get('.checkout-item .flower-prices').eq(0).should('contain.text', '$5.99');
        cy.get('.checkout-item .total-cost').eq(0).should('contain.text', '$5.99');

        // Heart Flower exists amongst the checkout items.
        cy.get('.checkout-item .flower-name').eq(1).should('contain.text', 'Heart Flower');
        cy.get('.checkout-item .flower-quantity input').eq(1).invoke('val').should('contain', '2');
        cy.get('.checkout-item .flower-prices').eq(1).should('contain.text', '$12.31');
        cy.get('.checkout-item .total-cost').eq(1).should('contain.text', '$24.62');

        // Azalea exists amongst the checkout items.
        cy.get('.checkout-item .flower-name').eq(2).should('contain.text', 'Azalea');
        cy.get('.checkout-item .flower-quantity input').eq(2).invoke('val').should('contain', '1');
        cy.get('.checkout-item .flower-prices').eq(2).should('contain.text', '$19.99');
        cy.get('.checkout-item .total-cost').eq(2).should('contain.text', '$19.99');

        // The total cost is correctly calculated.
        cy.get('.checkout .grand-total').should('contain.text', '$50.60');
    });
});
