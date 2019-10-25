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
import ManageArchiveEdit from 'page/ManageArchive/ManageArchiveEdit';
import ManageTag from 'page/ManageTag';
import MainBanner from 'page/ManageMainBanner/ManageMainBannerList';
import ManageMainBannerEdit from 'page/ManageMainBanner/ManageMainBannerEdit';

const PageUrl = ({ logged }) => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route
        path="/archiveDetail/:portpolioId"
        render={props => <ArchiveDetail {...props} logged={logged} />}
      />
      {logged && (
        <Route path="/manage/mainBanner" exact component={MainBanner} />
      )}
      {logged && (
        <Route
          path="/manage/edit/mainBanner/:mainBannerId"
          exact
          component={ManageMainBannerEdit}
        />
      )}
      {logged && (
        <Route
          path="/manage/upload/mainBanner"
          exact
          component={ManageMainBannerEdit}
        />
      )}
      {logged && (
        <Route
          path="/manage/upload/archive"
          exact
          component={ManageArchiveEdit}
        />
      )}
      {logged && (
        <Route
          path="/manage/edit/archive/:portpolioId"
          exact
          component={ManageArchiveEdit}
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
