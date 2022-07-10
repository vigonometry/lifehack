import { ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from '../constants/authToken'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


const authLink = setContext((_, { headers }) => {
	let token = localStorage.getItem(AUTH_TOKEN)
	if (token != null) { 
		token = JSON.parse(token);
	}
	return {
		headers: {
			...headers,
			authorization: `Bearer ${token}`
		}
	}
})

const wsLink = new GraphQLWsLink(createClient({
	url: 'ws://localhost:4001/graphql',
  }));

const httpLink = new HttpLink({
	uri: "http://localhost:4001/graphql"
})

const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query);
	  return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	  );
	},
	wsLink,
	httpLink,
  );

const apolloClient = new ApolloClient({
	link: authLink.concat(splitLink),
	cache: new InMemoryCache()
})

export default apolloClient