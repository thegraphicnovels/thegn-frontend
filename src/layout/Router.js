import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "layout/header";
import Footer from "layout/footer";
import Main from "page/main";
import AchiveDetail from "page/achive_detail";
import Upload from "components/upload";

const PageUrl = function() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/achiveDetail/:portpolioId" component={AchiveDetail} />
      <Route path="/upload" component={Upload} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default ({ logged }) => {
  return (
    <Router>
      <Header logged={logged} />
      <div id="container">
        <PageUrl />
      </div>
      <Footer />
    </Router>
  );
};
