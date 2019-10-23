import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { placeholderFn, fullUrlFn, AdminMenuFn } from 'common';
import { LOCAL_LOG_OUT } from 'apollo/loginQuery';

const Header = ({ logged }) => {
  const srchEl = useRef(null);
  const adminMenuEl = useRef(null);

  const [logoutMutation] = useMutation(LOCAL_LOG_OUT);

  useEffect(() => {
    placeholderFn(srchEl.current);
    if (logged === true) {
      AdminMenuFn(adminMenuEl.current);
    }
  });

  return (
    <header id="header">
      <div className="headerIn">
        <h1 className="logo">
          <Link
            to="/"
            onClick={() => {
              // console.log(window.location.pathname);
              const { pathname } = window.location;
              if (pathname === '/') {
                window.location.reload();
              } else {
                window.location.href = process.env.REACT_APP_DOMAIN_URL;
              }
            }}
          >
            <img
              src={fullUrlFn('resources/images/logo.png')}
              alt="the graphic novels"
            />
          </Link>
        </h1>
        <div className="util">
          <label htmlFor="search" className="topSrchBox" ref={srchEl}>
            <span className="placeholder">Search</span>
            <input type="text" id="search" />
          </label>
          <Link to="/" className="btnInsta">
            <img
              src={fullUrlFn('resources/images/icon_insta.svg')}
              alt="instagram"
            />
          </Link>
          <Link to="/" className="btnBe">
            <img
              src={fullUrlFn('resources/images/icon_Be.svg')}
              alt="instagram"
            />
          </Link>

          {logged === true && (
            <button type="button" ref={adminMenuEl} className="icoAdm">
              <img
                src={fullUrlFn('resources/images/icon_admin.svg')}
                alt="admin"
              />

              <span className="admList">
                <ul>
                  <li>
                    <Link to="/manage/main">MAIN</Link>
                  </li>
                  <li>
                    <Link to="/manage/archive">ARCHIVE</Link>
                  </li>
                  <li>
                    <Link to="/manage/tag">TAG</Link>
                  </li>
                </ul>
              </span>
            </button>
          )}

          {logged === true && (
            <Link
              to="/"
              className="icoLoginState"
              onClick={() => logoutMutation()}
            >
              Logout
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
