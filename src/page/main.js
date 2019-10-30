import React, { useRef, useEffect, useContext } from 'react';
import { menuClick } from 'common';
import Mainswiper from 'page/main_slide';
import Achive from 'page/archive';
import About from 'page/about';
import Contact from 'page/contact';
import NaviList from 'components/naviList';
import { Store } from 'store';

const Main = () => {
  const conts = useRef(null);
  const { action, setAction } = useContext(Store); // Context Api Store 에 주입된 value 사용

  useEffect(() => {
    if (action) {
      menuClick(conts, setAction, action);
    }
  }, [action, setAction]);

  return (
    <div className="contents" ref={conts}>
      <NaviList />

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
        <em>Archive</em>
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
        <em>About</em>
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
        <em>Contact</em>
      </button>
      <div className="pageWrap">
        <h2 className="blind">Contact</h2>
        <Contact action={action} />
      </div>
    </div>
  );
};

export default Main;
