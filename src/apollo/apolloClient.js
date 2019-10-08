import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./localState";

const Client = new ApolloClient({
  uri: process.env.REACT_APP_MONGO_URL,
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export default Client;
