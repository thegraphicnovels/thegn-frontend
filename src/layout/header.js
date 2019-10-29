import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { LOCAL_LOG_OUT } from 'apollo/loginQuery';
import { AdminMenuFn, moGnbOpenFn } from 'common';
import SearchBox from 'components/searchBox';

const Header = ({ logged }) => {
  const adminMenuEl = useRef(null);
  const btnHambergEl = useRef(null);
  const [logoutMutation] = useMutation(LOCAL_LOG_OUT);

  let gnbOpenFn;

  useEffect(() => {
    gnbOpenFn = moGnbOpenFn(btnHambergEl.current);
    if (logged === true) {
      AdminMenuFn(adminMenuEl.current);
    }
    return () => {
      gnbOpenFn.destroy();
    };
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
            <img src="/resources/images/logo.png" alt="the graphic novels" />
          </Link>
        </h1>
        <div className="util">
          <SearchBox />

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
  logged: PropTypes.bool.isRequired,
};

export default Header;
