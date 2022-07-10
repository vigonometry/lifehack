import { createModule, gql } from "graphql-modules";
import { updateChat, deleteChat, readChats, readChat } from "../db_functions/Chat.js";

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
      contextChat: Chat
    }
    type Mutation {
      updateChat(userId: String!, message: String!): HTTPResponse
      deleteChat(_id: ID!): HTTPResponse
    }
  `,
  resolvers: {
    Query: {
      contextChats: (_, __, context) => readChats({ userId: context._id }),
      contextChat: (_, __, context) => readChat({ userId: context._id })
    },
    Mutation: {
      updateChat: async (_, args) => updateChat({ _id: args._id }, args),
      deleteChat: (_, args) => deleteChat(args),
    },
  },
});

export const x = 2;