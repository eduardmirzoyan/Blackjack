import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cards from './pages/Cards';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/cards" component={Cards} />
  </Switch>
);

export default Routes;
