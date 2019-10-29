import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useInput } from 'rooks';
import PropTypes from 'prop-types';
import { placeholderFn } from 'common';

const SearchBox = ({ history }) => {
  const srchEl = useRef(null);
  const keyword = useInput('');

  const onSearchSubmit = e => {
    e.preventDefault();
    // if (e.key === 'Enter') {
    history.push(`/search?keyword=${keyword.value}`);
    // }
  };

  useEffect(() => {
    placeholderFn(srchEl.current);
  });

  return (
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
  );
};

SearchBox.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SearchBox);
