import { apolloApplication } from './apolloApplication.js';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import http from 'http';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';


const whitelisted = ['LoginMutation', 'RegisterMutation']
const schema = apolloApplication.createSchemaForApollo();
const PORT = process.env.PORT || 4001

const getUser = (token) => {
	if (token) {
		try {
			return jwt.verify(token, "nnamdi") // returns contents after decoding token
		} catch (err) {
			return { error: true, msg: "Session invalid"}
		}
	}
}

// this function is like a middleware that runs for every request and its return value is available
// in all resolvers
const apolloContext = async ({ req }) => {
		if (req.body.operationName === 'IntrospectionQuery') return {}
		console.log(req.body.operationName)
		if (whitelisted.includes(req.body.operationName)) return {}
		const token = req.headers.authorization || 'Bearer '
		if (!token.includes('Bearer ')) throw new AuthenticationError("Token must use Bearer format.")
		const user = getUser(token.split(' ')[1])
		if (!user) { 
			console.log("User must be logged ins")
			throw new AuthenticationError("You must be logged in!")
		}	
		return user
}

export default async function startApolloServer() {
	const app = express()
	const httpServer = http.createServer(app)
	const apolloServer = new ApolloServer({
		schema,
		csrfPrevention: true,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		context: apolloContext
	})
	await apolloServer.start()
	apolloServer.applyMiddleware({
		app,
		path: '/'
	})
	await new Promise((resolve) => httpServer.listen( { port: PORT }, resolve))
	console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
}