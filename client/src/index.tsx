/**
 * Entry point and Apollo Provider for the Apollo Client React.js application.
 * @author Andrew Jarombek
 * @since 5/15/2020
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';

const httpLink = new HttpLink({
  uri: '/graphql'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

const RoutedApp: React.FC = () => (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<RoutedApp />, document.getElementById('root'));
