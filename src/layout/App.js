import React, { useState } from 'react';
import Router from 'layout/Router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Store from 'store';

const QUERY = gql`
  {
    logged @client
  }
`;

const App = () => {
  const {
    data: { logged },
  } = useQuery(QUERY);

  const [action, setAction] = useState(0);
  const value = {
    action,
    // action : action
    setAction,
    // setAction : setAction
  };

  return (
    // Context API Store에 value 주입
    // main.js 에 사용방법 있음.
    <Store.Provider value={value}>
      <Router logged={logged} />
    </Store.Provider>
  );
};

export default App;
