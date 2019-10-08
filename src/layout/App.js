import React from "react";
import Router from "layout/Router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  {
    logged @client
  }
`;

function App() {
  const {
    data: { logged }
  } = useQuery(QUERY);

  return <Router logged={logged} />;
}

export default App;
