import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useInput } from 'rooks';
import PropTypes from 'prop-types';
import { srchBoxFn } from '../common';
// import { placeholderFn } from 'common';

const SearchBox = ({ history, searchId, chMainPageFn }) => {
  const srchEl = useRef(null);
  const keyword = useInput('');

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // if (e.key === 'Enter') {
    if (chMainPageFn) {
      chMainPageFn();
    }
    history.push(`/search?keyword=${keyword.value}`);
    // }
  };

  useEffect(() => {
    srchBoxFn(srchEl.current);
  });

  return (
    <form onSubmit={onSearchSubmit}>
      <label htmlFor={searchId} className="topSrchBox" ref={srchEl}>
        <span className="placeholder">Search</span>
        <input
          type="text"
          id={searchId}
          value={keyword.val}
          onChange={keyword.onChange}
        />
      </label>
    </form>
  );
};

SearchBox.defaultProps = {
  chMainPageFn: null,
};

SearchBox.propTypes = {
  history: PropTypes.object.isRequired,
  searchId: PropTypes.string.isRequired,
  chMainPageFn: PropTypes.func,
};

export default withRouter(SearchBox);
