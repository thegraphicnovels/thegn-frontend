import React, { useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBox from './searchBox';
import { Store } from '../store';

const NaviList = ({ history }) => {
  const { setAction, scratchEl } = useContext(Store);
  const naviEl = useRef(null);
  const chMainPageFn = (idx) => {
    // if (action !== idx) {
    if (idx) {
      setAction(idx);
      history.push('/');
    }
    if (naviEl.current.classList.contains('active')) {
      naviEl.current.classList.remove('active');
    }
    if (scratchEl.current) {
      if (scratchEl.current.classList.contains('active'))
        scratchEl.current.classList.remove('active');
    }
    // }
  };

  return (
    <nav className="naviListWrap" ref={naviEl}>
      {/* 
				searchId : SearchBox내부 인풋태그 라벨 태그 연결 id/for 값
				SearchBox 컴포넌트가 여러군대 들어갈경우 동일한 id/for값으로 문제가 됨
				*/}
      <SearchBox chMainPageFn={chMainPageFn} searchId="naviSearch" />

      <ul>
        <li>
          <button
            type="button"
            onClick={() => {
              chMainPageFn(1);
            }}
          >
            <em>Archive</em>
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              chMainPageFn(2);
            }}
          >
            <em>About</em>
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              chMainPageFn(3);
            }}
          >
            <em>Contact</em>
          </button>
        </li>
      </ul>
    </nav>
  );
};

NaviList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NaviList);
