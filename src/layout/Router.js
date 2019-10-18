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
import Scratch from 'layout/scratch';
import Main from 'page/main';
import ArchiveDetail from 'page/archive_detail';
import Upload from 'components/upload';
import ManageMain from 'page/ManageMain';
import ManageArchive from 'page/ManageArchive';
import ManageTag from 'page/ManageTag';

const PageUrl = ({ logged }) => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/archiveDetail/:portpolioId" component={ArchiveDetail} />
      <Route path="/upload" component={Upload} />
      {logged && <Route path="/manage/main" exact component={ManageMain} />}
      {logged && (
        <Route path="/manage/main/:mainId" exact component={ManageMain} />
      )}
      {logged && (
        <Route path="/manage/archive" exact component={ManageArchive} />
      )}
      {logged && (
        <Route
          path="/manage/archive/:portpolioId"
          exact
          component={ManageArchive}
        />
      )}
      {logged && <Route path="/manage/tag" exact component={ManageTag} />}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const Router = ({ logged }) => {
  return (
    <BRouter>
      <Header logged={logged} />
      <div id="container">
        <PageUrl logged={logged} />
      </div>
      <Footer />
      {!logged && <Scratch />}
    </BRouter>
  );
};

export default Router;

PageUrl.propTypes = {
  logged: PropTypes.bool.isRequired,
};

Router.propTypes = {
  logged: PropTypes.bool.isRequired,
};
