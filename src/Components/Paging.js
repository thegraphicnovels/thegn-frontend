import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

const Paging = ({ limit, page, totalItemsCount, handlePageChange }) => {
  return (
    <>
      <Pagination
        hideFirstLastPages
        pageRangeDisplayed={10}
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={totalItemsCount}
        onChange={handlePageChange}
      />
    </>
  );
};

Paging.propTypes = {
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default Paging;
