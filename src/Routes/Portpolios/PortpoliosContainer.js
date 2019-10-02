import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import PortpoliosPresenter from "./PortpoliosPresenter";
import { SEE_PORTPOLIOS } from "./PortpoliosQueries";

let limit = 1;

const PortpoliosContainer = ({ logged }) => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(SEE_PORTPOLIOS, {
    variables: { page, limit }
  });

  const handlePageChange = pageNumber => {
    setPage(pageNumber);
  };

  return (
    <PortpoliosPresenter
      logged={logged}
      loading={loading}
      limit={limit}
      page={page}
      data={data}
      handlePageChange={handlePageChange}
    />
  );
};

export default PortpoliosContainer;
