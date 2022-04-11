import React from "react";
import "./styles.css";
import Api from "./components/Api";
import More from "./components/Detail";

import { Switch, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Api} exact />

          <Route path="/more/:id" component={More} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
