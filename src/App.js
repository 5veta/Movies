import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

window.React = React;

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:id" component={MovieDetails} />
    </Switch>
  </HashRouter>
);

export default App;
