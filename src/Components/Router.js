import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Home from "Screens/Home";
import About from "Screens/About";
import Contact from "../Screens/Contact";
import Portpolio from "../Screens/Portpolio";
import Admin from "../Screens/Admin";

export default () => {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/portpolio" exact component={Portpolio} />
      <Route path="/thegnadmin" exact component={Admin} />
    </Router>
  );
};
