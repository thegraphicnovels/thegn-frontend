import React, { useState, useRef, useEffect, useContext } from 'react';
import { menuClick } from 'common';
import Mainswiper from 'page/main_slide';
import Achive from 'page/archive';
import About from 'page/about';
import Contact from 'page/contact';
import PropTypes from 'prop-types';
import NaviList from 'components/naviList';
import Store from 'store';

const Main = ({ history, location: { state } }) => {
  const conts = useRef(null);
  // const [action, setAction] = useState(0);

  // const actions = useContext(Store);
  // console.log(actions)
  const { action, setAction } = useContext(Store); // Context Api Store 에 주입된 action 과 setAction을 사용 upPack으로 가져온것.

  useEffect(() => {
    if (state) {
      menuClick(conts, setAction, state.menuId);
    }
  }, [state]);

  return (
    <div className="contents" ref={conts}>
      <NaviList history={history} />

      <div
        className="pageWrap"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <h2 className="blind">Home</h2>
        <Mainswiper action={action} />
      </div>
      <button
        type="button"
        className="subMenu01"
        onClick={() => {
          menuClick(conts, setAction, 1);
        }}
      >
        <em>&lt;Archive&gt;</em>
      </button>
      <div className="pageWrap">
        <h2 className="blind">Archive</h2>
        <Achive action={action} />
      </div>
      <button
        type="button"
        className="subMenu02"
        onClick={() => {
          menuClick(conts, setAction, 2);
        }}
      >
        <em>&lt;About&gt;</em>
      </button>
      <div className="pageWrap">
        <h2 className="blind">About</h2>
        <About action={action} />
      </div>
      <button
        type="button"
        className="subMenu03"
        onClick={() => {
          menuClick(conts, setAction, 3);
        }}
      >
        <em>&lt;Contact&gt;</em>
      </button>
      <div className="pageWrap">
        <h2 className="blind">Contact</h2>
        <Contact action={action} />
      </div>
    </div>
  );
};

Main.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};
export default Main;
