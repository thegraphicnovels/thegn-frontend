import React, { useRef, useEffect, useContext } from 'react';
import { Store } from '../store';
import { menuClick } from '../common';
import Mainswiper from './main_slide';
import Archive from './archive';
import About from './about';
import Contact from './contact';

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
      <div
        className="pageWrap active"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <h2 className="blind">Home</h2>
        <Mainswiper action={action} />
      </div>
      <button
        type="button"
        className="subMenu01"
        onClick={() => {
          if (action === 1) {
            // console.log(action);
            // window.location.reload();
            menuClick(conts, setAction, 1);
          } else {
            menuClick(conts, setAction, 1);
          }
        }}
      >
        <em>Archive</em>
      </button>
      <div className="pageWrap">
        <h2 className="blind">Archive</h2>
        <Archive action={action} />
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
