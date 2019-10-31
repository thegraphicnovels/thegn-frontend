import React, { useContext } from 'react';
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
import ArchiveSearch from 'page/archive_search';
import ManageArchive from 'page/ManageArchive/ManageArchiveList';
import ManageArchiveEdit from 'page/ManageArchive/ManageArchiveEdit';
import ManageTag from 'page/ManageTag';
import MainBanner from 'page/ManageMainBanner/ManageMainBannerList';
import ManageMainBannerEdit from 'page/ManageMainBanner/ManageMainBannerEdit';
import { Store } from 'store';

const PageUrl = ({ logged }) => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/search" component={ArchiveSearch} />
      <Route path="/archiveDetail/:portpolioId" component={ArchiveDetail} />
      {logged && (
        <>
          <Route path="/manage/mainBanner" component={MainBanner} />
          <Route
            path="/manage/edit/mainBanner/:mainBannerId"
            component={ManageMainBannerEdit}
          />
          <Route
            path="/manage/upload/mainBanner"
            component={ManageMainBannerEdit}
          />
          <Route path="/manage/archive" component={ManageArchive} />
          <Route path="/manage/upload/archive" component={ManageArchiveEdit} />
          <Route
            path="/manage/edit/archive/:portpolioId"
            component={ManageArchiveEdit}
          />
          <Route path="/manage/tag" component={ManageTag} />
        </>
      )}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const Router = () => {
  const { logged } = useContext(Store);
  return (
    <BRouter>
      <Header />
      <div id="container">
        <PageUrl logged={logged} />
      </div>
      <Footer />
      {!logged && <Scratch />}
    </BRouter>
  );
};

PageUrl.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Router;
