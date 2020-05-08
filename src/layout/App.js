import React from 'react';
import Router from 'layout/Router';
import StoreProvider from 'store';

const App = () => {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
};

export default App;
