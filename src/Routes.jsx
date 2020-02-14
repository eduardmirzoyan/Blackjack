import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cards from './pages/Cards';
import Game from './pages/Game';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/cards" component={Cards} />
    <Route exact path="/game" component={Game} />

  </Switch>
);

export default Routes;
