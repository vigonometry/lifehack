import { createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, } from '@apollo/client';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URI,
  })
  
const authLink = setContext((_, { headers }) => {
return {
    headers: {
    ...headers,
    authorization: process.env.REACT_APP_BEARER
    }
}
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
