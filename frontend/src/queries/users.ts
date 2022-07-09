import gql from "graphql-tag";

export const GET_ONLINE_USERS = gql`
    query Query {
        onlineUsers {
        username
        email
        isClient
        }
    }
`