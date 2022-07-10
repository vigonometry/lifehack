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

export const SUBSCRIBE_ONLINE_USERS = gql`
subscription Subscription {
    getOnlineUsers {
      username
      email
      isClient
    }
  }
`

export const TEST_SUB = gql`
subscription Subscription {
    clientRead {
      username
    }
  }
`