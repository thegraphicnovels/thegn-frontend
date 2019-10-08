import ApolloClient from 'apollo-boost';

const Client = new ApolloClient({
	uri : process.env.REACT_APP_MONGO_URL
});


export default Client;