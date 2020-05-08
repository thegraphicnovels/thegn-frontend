import React from 'react';
import Router from './Router';
import StoreProvider from '../store';

const App = () => {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
};

export default App;
