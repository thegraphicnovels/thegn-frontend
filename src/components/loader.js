import React from 'react';
import styled from 'styled-components';

const Load = styled.div`
  width: 100%;
  text-align: center;
`;

const Loader = () => {
  return (
    <Load>
      <img src="/resources/images/bean_eater-1s-100px.svg" alt="admin" />
    </Load>
  );
};

export default Loader;
