import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import PortpoliosPresenter from "./PortpoliosPresenter";
import { SEE_PORTPOLIOS } from "./PortpoliosQueries";

let limit = 16;

const PortpoliosContainer = ({ logged }) => {
  const [page, setPage] = useState(1);
  const { data, loading, refetch } = useQuery(SEE_PORTPOLIOS, {
    variables: { page, limit }
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected);
    refetch();
    console.log(selected);
  };

  return (
    <PortpoliosPresenter
      logged={logged}
      loading={loading}
      data={data}
      handlePageClick={handlePageClick}
    />
  );
};

export default PortpoliosContainer;
