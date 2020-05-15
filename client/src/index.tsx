/**
 * Entry point and routes for the Apollo Client React.js application.
 * @author Andrew Jarombek
 * @since 5/15/2020
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import StoreFront from './components/StoreFront';

const httpLink = new HttpLink({
  uri: 'localhost:8084'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

const RoutedApp: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={StoreFront} />
      <Route component={StoreFront} />
    </Switch>
  </Router>
);

ReactDOM.render(<RoutedApp />, document.getElementById('root'));
