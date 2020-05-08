import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/number/is-nan';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Client from './Apollo/apolloClient';
import App from './layout/App';

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById('wrap'),
);
