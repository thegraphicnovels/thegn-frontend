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
import AchiveDetail from 'page/achive_detail';
import Login from 'page/login';
import Upload from 'components/upload';

const PageUrl = () => {
	return (
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/achiveDetail/:portpolioId" component={AchiveDetail} />
			<Route path="/upload" component={Upload} />
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
			{!logged && (<Scratch />)}

			<Login />
		</BRouter>
	);
};

export default Router;

Router.propTypes = {
	logged: PropTypes.bool.isRequired,
};
