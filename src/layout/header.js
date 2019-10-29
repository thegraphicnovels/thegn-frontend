import React, { useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { LOCAL_LOG_OUT } from 'apollo/loginQuery';
import { useInput } from 'rooks';
import { placeholderFn, AdminMenuFn, moGnbOpenFn } from 'common';

const Header = ({ history, logged }) => {
  const srchEl = useRef(null);
  const adminMenuEl = useRef(null);
  const keyword = useInput('');

  const btnHambergEl = useRef(null);

  const [logoutMutation] = useMutation(LOCAL_LOG_OUT);

  useEffect(() => {
    let gnbOpenFn = srchEl.current;
    placeholderFn(srchEl.current);
    gnbOpenFn = moGnbOpenFn(btnHambergEl.current);
    if (logged === true) {
      AdminMenuFn(adminMenuEl.current);
    }
    return () => {
      gnbOpenFn.destroy();
    };
  });

  const onSearchSubmit = e => {
    e.preventDefault();
    // if (e.key === 'Enter') {
    history.push(`/search?keyword=${keyword.value}`);
    // }
  };

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
            <img src="/resources/images/logo.png" alt="the graphic novels" />
          </Link>
        </h1>
        <div className="util">
          <label htmlFor="search" className="topSrchBox" ref={srchEl}>
            <span className="placeholder">Search</span>
            <form onSubmit={onSearchSubmit}>
              <input
                type="text"
                id="search"
                value={keyword.val}
                onChange={keyword.onChange}
              />
            </form>
          </label>
          <Link to="/" className="btnInsta">
            <img src="/resources/images/icon_insta.svg" alt="instagram" />
          </Link>
          <Link to="/" className="btnBe">
            <img src="/resources/images/icon_Be.svg" alt="instagram" />
          </Link>

          {logged === true && (
            <button type="button" ref={adminMenuEl} className="icoAdm">
              <img src="/resources/images/icon_admin.svg" alt="admin" />

              <span className="admList">
                <ul>
                  <li>
                    <Link to="/manage/mainBanner">MAIN BANNER</Link>
                  </li>
                  <li>
                    <Link to="/manage/upload/archive">ARCHIVE</Link>
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
        <button type="button" className="btnHamberg" ref={btnHambergEl}>
          <span className="blind">메뉴 열기</span>
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  history: PropTypes.object.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default withRouter(Header);
