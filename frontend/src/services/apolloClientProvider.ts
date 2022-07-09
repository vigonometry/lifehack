import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from '../constants/authToken'

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	return {
		headers: {
			...headers,
			authorization: `Bearer ${token}`
		}
	}
})

const httpLink = new HttpLink({
	uri: "http://localhost:4001/graphql"
})

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

export default apolloClient