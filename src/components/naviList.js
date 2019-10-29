import React from 'react';
import { Link } from 'react-router-dom';

const NaviList = () => {
  return (
    <nav className="naviListWrap">
      <ul>
        <li>
          <Link to={{ pathname: '/', state: { menuId: 1 } }}>
            <em>&lt;Archive&gt;</em>
          </Link>
        </li>
        <li>
          <Link to={{ pathname: '/', state: { menuId: 2 } }}>
            <em>&lt;About&gt;</em>
          </Link>
        </li>
        <li>
          <Link to={{ pathname: '/', state: { menuId: 3 } }}>
            <em>&lt;About&gt;</em>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NaviList;
