/**
 * Intercept and mock GraphQL routes.
 * @author Andrew Jarombek
 * @since 1/3/2021
 */

/**
 * Custom command to intercept HTTP requests to the GraphQL server.  Used to validate that GraphQL API calls are made.
 */
Cypress.Commands.add('interceptGraphQL', () => {
  cy.intercept('POST', '/graphql', (req) => {
    if (req.body.operationName.includes('flowersForCheckout')) {
      req.alias = 'gqlFlowersForCheckout';
    } else if (req.body.operationName.includes('allFlowers')) {
      req.alias = 'gqlAllFlowers';
    } else if (req.body.operationName.includes('flowerDetails')) {
      req.alias = 'gqlFlowerDetails';
    } else if (req.body.operationName.includes('purchaseFlowers')) {
      req.alias = 'gqlPurchaseFlowers';
    }
  });
});
