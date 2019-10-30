import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const NaviList = ({ history }) => {
  return (
    <nav className="naviListWrap">
      <ul>
        <li>
          <Link to={{ pathname: '/', state: { menuId: 1 } }}>
            <em>Archive</em>
          </Link>
        </li>
        <li>
          <Link to={{ pathname: '/', state: { menuId: 2 } }}>
            <em>About</em>
          </Link>
        </li>
        <li>
          <Link to={{ pathname: '/', state: { menuId: 3 } }}>
            <em>About</em>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

NaviList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NaviList);
