import { createModule, gql } from "graphql-modules";
import { readClients, readClient, createClient } from "../db_functions/Client.js";
export const ClientModule = createModule({
  id: "client",
  typeDefs: gql`
    type Client implements User {
      _id: ID!
      username: String!
      email: String!
      password: String!
      chats: [Chat]!
    }

    type Query {
      readClients: [Client]! #resolver
      readClient(_id: ID!): Client #resolver
    }

    type Mutation {
      createClient(
        username: String!
        email: String!
        password: String!
      ): HTTPResponse
    }
  `,
  resolvers: {
    Client: {
      chats: (parent) => readChats({ clientId: parent.Id }),
    },
    Query: {
      readClients: (_, args) => readClients(args),
      readClient: (_, args) => readClient(args),
    },
    Mutation: {
      createClient: (_, args) => createClient(args),
    },
  },
});
