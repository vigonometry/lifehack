import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
    mutation CreateChat($clientId: String, $counsellorId: String, ) {
        createTask(clientId: $clientId, counsellorId: $counsellorId) {
			response
			error
		}
    }
`

export const UPDATE_CHAT = gql`
    mutation UpdateChat($_id: ID!, $message: string!) {
        updateChat(_id: $_id, message: $message) {
            response
            error
        }
    }
`

export const DELETE_CHAT = gql`
    mutation DeleteChat($_id: ID!) {
        deleteChat(_id: $_id) {
            response
            error
        }
    }
`