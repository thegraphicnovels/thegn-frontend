import ApolloClient from 'apollo-client';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { resolvers } from './localState';

const cache = new InMemoryCache();
cache.writeData({
  data: {
    logged: Boolean(localStorage.getItem('token')) || false,
  },
});

const link = ApolloLink.from([
  createPersistedQueryLink({ useGETForHashedQueries: true }),
  createHttpLink({
    uri: process.env.REACT_APP_BACKEND_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }),
]);

const Client = new ApolloClient({
  link,
  cache,
  resolvers,
});

export default Client;
