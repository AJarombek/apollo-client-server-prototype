/**
 * Routes for the Apollo Client React.js application.
 * @author Andrew Jarombek
 * @since 5/16/2020
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StoreFront from '../StoreFront';
import Checkout from "../Checkout";

const App: React.FC = () => (
  <Switch>
    <Route exact path="/" component={StoreFront} />
    <Route exact path="/checkout" component={Checkout} />
    <Route component={StoreFront} />
  </Switch>
);

export default App;
