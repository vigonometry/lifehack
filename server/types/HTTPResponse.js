import { createModule, gql } from "graphql-modules";

export const HTTPResponseModule = createModule({
	id: 'http-response',
	typeDefs: gql`
		type HTTPResponse {
			response: String
			error: String
		}
	`
})