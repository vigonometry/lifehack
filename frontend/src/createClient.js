import { createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


// const httpLink = createHttpLink({
//     uri: process.env.REACT_APP_SERVER_URI,
//   })

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_SERVER_URI
})
  
const wsLink = new GraphQLWsLink(createClient({
    uri: 'ws://localhost:4001/graphql',
    url:'ws://localhost:4001/graphql'
}));

const authLink = setContext((_, { headers }) => {
return {
    headers: {
    ...headers,
    authorization: process.env.REACT_APP_BEARER
    }
}
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
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

  const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
});

export default client;
