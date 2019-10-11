import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ logged }) => {
  return (
    <header id="header">
      <div className="headerIn">
        <h1 className="logo">
          <Link to="/" onClick={() => window.location.reload()}>
            <img src="resources/images/logo.png" alt="the graphic novels" />
          </Link>
        </h1>
        <div className="util">
          <label className="topSrchBox" htmlFor="search">
            <span id="search" className="placeholder">
              Search
            </span>
            <input className="text" />
          </label>
          <Link to="/" className="btnInsta">
            <img src="resources/images/icon_insta.svg" alt="instagram" />
          </Link>
          <Link to="/upload" className="btnBe">
            <img src="resources/images/icon_Be.svg" alt="instagram" />
          </Link>
          {logged === true && (
            <Link to="/" className="btnBe">
              <img src="resources/images/icon_admin.svg" alt="admin" />
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
