import { createModule, gql } from "graphql-modules";
import { createChat, updateChat, deleteChat, readChats, readChat } from "../db_functions/Chat.js";

export const ChatModule = createModule({
  id: "chat",
  typeDefs: gql`
    type Chat {
      _id: ID!
      clientId: String!
      counsellorId: String!
      messages: [String!]!
    }

    type Query {
      contextChats: [Chat!]!
    }
    type Mutation {
      createChat(clientId: String!, counsellorId: String!): HTTPResponse
      updateChat(_id: ID!, message: String!): HTTPResponse
      deleteChat(_id: ID!): HTTPResponse
    }
  `,
  resolvers: {
    Query: {
      contextChats: (_, __, context) => readChats({ studentId: context.id }),
    },
    Mutation: {
      createChat: (_, args, context) =>
        createChat({ ...args, studentId: context.id }),
      updateChat: async (_, args) => updateChat({ _id: args._id }, args),
      deleteChat: (_, args) => deleteChat(args),
    },
  },
});
