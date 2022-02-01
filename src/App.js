import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddPerson from "./components/AddPerson";
import Person from "./components/Person";
import PersonList from "./components/PersonList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/person" className="navbar-brand">
          Teste
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/person"} className="nav-link">
              Person
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/person"]} component={PersonList} />
          <Route exact path="/add" component={AddPerson} />
          <Route path="/person/:id" component={Person} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
