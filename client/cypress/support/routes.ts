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
    if (req.body.operationName.includes('allFlowers')) {
      req.alias = 'gqlAllFlowers';
    } else if (req.body.operationName.includes('flowerDetails')) {
      req.alias = 'gqlFlowerDetails';
    } else if (req.body.operationName.includes('flowersForCheckout')) {
      req.alias = 'gqlFlowersForCheckout';
    } else if (req.body.operationName.includes('purchaseFlowers')) {
      req.alias = 'gqlPurchaseFlowers';
    }
  });
});

/**
 * Custom command to intercept HTTP requests and replace the server responses with static JSON.  Used to test the web
 * application without the API dependency.
 */
Cypress.Commands.add('interceptAndMockGraphQL', () => {
  cy.intercept('POST', '/graphql', (req) => {
    if (req.body.operationName.includes('allFlowers')) {
      req.alias = 'mockedAPIAllFlowers';
      req.reply({ fixture: 'allFlowers.json' });
    } else if (req.body.operationName.includes('flowerDetails')) {
      req.alias = 'mockedAPIFlowerDetails';
      req.reply({ fixture: 'flowerDetails.json' });
    } else if (req.body.operationName.includes('flowersForCheckout')) {
      req.alias = 'mockedAPIFlowersForCheckout';
      req.reply({ fixture: 'flowersForCheckout.json' });
    } else if (req.body.operationName.includes('purchaseFlowers')) {
      req.alias = 'mockedAPIPurchaseFlowers';
      req.reply({ fixture: 'purchaseFlowers.json' });
    }
  });
});
