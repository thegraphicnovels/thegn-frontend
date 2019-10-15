import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as BRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Header from 'layout/header';
import Footer from 'layout/footer';
import Scratch from 'components/scratch';
import Main from 'page/main';
import AchiveDetail from 'page/achive_detail';
import Upload from 'components/upload';

const PageUrl = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/achiveDetail/:portpolioId" component={AchiveDetail} />
      <Route path="/upload" component={Upload} />
      <Route path="/scratch" component={Scratch} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const Router = ({ logged }) => {
  return (
    <BRouter>
      <Header logged={logged} />
      <div id="container">
        <PageUrl />
      </div>
      <Footer />
	  {/* <Scratch /> */}
    </BRouter>
  );
};

export default Router;

Router.propTypes = {
  logged: PropTypes.bool.isRequired,
};
