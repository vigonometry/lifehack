import { gql } from "@apollo/client";

export const READ_CHAT = gql`
    mutation ReadChat($userId: string!) {
        readChat(userId: $userId) {
            response
            error
        }
    }
`

export const UPDATE_CHAT = gql`
    mutation UpdateChat($userId: String!, $message: string!) {
        updateChat(userId: $userId, message: $message) {
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