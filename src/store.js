import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';

export const Store = React.createContext(null);

const QUERY = gql`
  {
    logged @client
  }
`;

// 전역으로 사용할 변수 및 function 주입
const StoreProvider = ({ children }) => {
  // login check
  const {
    data: { logged },
  } = useQuery(QUERY);

  // page action
  const [action, setAction] = useState(0);
  // scratch element
  const scratchEl = useRef(null);

  useEffect(() => {
    document.cookie = 'SameSite=None;';
  }, []);

  const value = {
    action,
    setAction,
    logged,
    scratchEl,
  };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StoreProvider;
