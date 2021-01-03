/**
 * E2E tests written with Cypress for the website header.
 * @author Andrew Jarombek
 * @since 1/2/2021
 */

describe('Header E2E Tests', () => {
  it.only('header stays visible when scrolling', () => {
    cy.visit('/');
    cy.get('.header-nav').should('exist');
    cy.get('.header-dry').should('exist');
    cy.get('.header-sticky').should('not.exist');

    cy.scrollTo(0, 200);

    cy.get('.header-nav').should('exist');
    cy.get('.header-dry').should('not.exist');
    cy.get('.header-sticky').should('exist');

    cy.scrollTo(0, 0);

    cy.get('.header-nav').should('exist');
    cy.get('.header-dry').should('exist');
    cy.get('.header-sticky').should('not.exist');
  });
});
