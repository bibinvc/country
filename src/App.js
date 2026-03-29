import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Countries from "./containers/Countries";
import CountryDetails from "./containers/CountryDetails";
import NotFound from "./containers/NotFound";
import useCountries from "./hooks/useCountries";

function App() {
  const countriesState = useCountries();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Countries {...countriesState} />
        </Route>
        <Route path="/countries/:code">
          <CountryDetails {...countriesState} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
