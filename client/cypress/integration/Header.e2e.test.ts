/**
 * E2E tests written with Cypress for the website header.
 * You always seem to know how I'm feeling.  I hope you know that I'm always here for you no matter who you love or
 * which path you want to take.
 * @author Andrew Jarombek
 * @since 1/3/2021
 */

describe('Header E2E Tests', () => {
  it('header stays visible when scrolling', () => {
    cy.visit('/');
    cy.get('.header-nav').should('exist');
    cy.get('.header-dry').should('exist');
    cy.get('.header-sticky').should('not.exist');

    cy.scrollTo(0, 500);

    cy.get('.header-nav').should('exist');
    cy.get('.header-dry').should('not.exist');
    cy.get('.header-sticky').should('exist');

    cy.scrollTo(0, 0);

    cy.get('.header-nav').should('exist');
    cy.get('.header-dry').should('exist');
    cy.get('.header-sticky').should('not.exist');
  });
});
