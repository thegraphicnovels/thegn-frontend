import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'layout/App';
import { ApolloProvider } from '@apollo/react-hooks';
import Client from 'apollo/apolloClient';

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById('wrap'),
);
