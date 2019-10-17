import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { placeholderFn, fullUrlFn } from 'common';

const Header = ({ logged }) => {
	const srchEl = useRef(null);
	useEffect(()=>{
		placeholderFn(srchEl.current);
	});
	return (
		<header id="header">
		<div className="headerIn">
			<h1 className="logo">
			<Link to="/">
				<img src={fullUrlFn("resources/images/logo.png")} alt="the graphic novels" />
			</Link>
			</h1>
			<div className="util">
				<label htmlFor="search" className="topSrchBox" ref={srchEl}>
					<span className="placeholder">Search</span>
					<input type="text" id="search" />
				</label>
				<Link to="/" className="btnInsta">
					<img src={fullUrlFn("resources/images/icon_insta.svg")} alt="instagram" />
				</Link>
				<Link to="/upload" className="btnBe">
					<img src={fullUrlFn("resources/images/icon_Be.svg")} alt="instagram" />
				</Link>
				{logged === true && (
					<Link to="/" className="btnBe">
					<img src={fullUrlFn("resources/images/icon_admin.svg")} alt="admin" />
					</Link>
				)}
			</div>
			<button type="button" className="btnHamberg">
			<span className="blind">메뉴 열기</span>
			</button>
		</div>
		</header>
	);
};

Header.propTypes = {
	logged: PropTypes.bool.isRequired,
};

export default Header;
