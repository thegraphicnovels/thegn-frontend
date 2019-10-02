import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./Header";
import Home from "Routes/Home";
import About from "Routes/About";
import Contact from "Routes/Contact";
import Admin from "Routes/Admin";
import Auth from "Routes/Auth";
import PortpolioUpload from "Routes/PortpolioUpload";
import Portpolios from "Routes/Portpolios";
import Portpolio from "Components/Portpolio";
import Filepond from "../Routes/Filepond";
import PortpolioManage from "../Routes/PortpolioManage";

const LoggedInRoutes = ({ logged }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route
      path="/portpolios"
      exact
      render={props => <Portpolios {...props} logged={logged} />}
    />
    <Route
      path="/portpolios/:portpolioId"
      exact
      render={props => <Portpolio {...props} logged={logged} />}
    />
    <Route
      path="/portpolio/upload"
      exact
      render={props => <PortpolioUpload {...props} logged={logged} />}
    />
    <Route
      path="/portpolio/edit/:portpolioId"
      exact
      render={props => <PortpolioUpload {...props} logged={logged} />}
    />
    <Route path="/admin" component={Admin} />
    <Route path="/portpolioManage" exact component={PortpolioManage} />
    <Route
      path="/portpolioManage/edit/:portpolioId"
      exact
      component={PortpolioManage}
    />
    <Route path="/filepond" component={Filepond} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = ({ logged }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/contact" exact component={Contact} />
    <Route
      path="/portpolios"
      exact
      render={props => <Portpolios {...props} logged={logged} />}
    />
    <Route
      path="/portpolios/:portpolioId"
      exact
      render={props => <Portpolio {...props} logged={logged} />}
    />
    <Route path="/thegn-login" exact component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default ({ logged }) => {
  return (
    <Router>
      <Header logged={logged} />
      {logged ? (
        <LoggedInRoutes logged={logged} />
      ) : (
        <LoggedOutRoutes logged={logged} />
      )}
    </Router>
  );
};
