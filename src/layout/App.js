import React from 'react';
import Router from 'layout/Router';
import { ApolloProvider } from '@apollo/react-hooks';
import Client from 'apollo/apolloClient';



function App() {
	return (
		<ApolloProvider client={Client}>
			<Router />
		</ApolloProvider>
	);
}

export default App;
