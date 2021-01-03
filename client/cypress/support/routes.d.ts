/// <reference types="cypress" />

/**
 * Type definition for the Cypress commands created in 'routes.ts'.  This is needed to use custom commands in
 * TypeScript code.
 * @author Andrew Jarombek
 * @since 1/3/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to intercept HTTP requests to the GraphQL server.
         * @example cy.interceptGraphQL()
         */
        interceptGraphQL(): void;

        /**
         * Custom command to intercept HTTP requests and replace the server responses with static JSON.
         * @example cy.interceptAndMockGraphQL()
         */
        interceptAndMockGraphQL(): void;
    }
}
