import { createModule, gql } from "graphql-modules";
import { createChat, updateChat, deleteChat, readChats, readChat } from "../db_functions/Chat.js";

export const ChatModule = createModule({
  id: "chat",
  typeDefs: gql`
    type Chat {
      _id: ID!
      userId1: String!
      userId2: String!
      messages: [String!]!
    }

    type Query {
      contextChats: [Chat!]!
      contextChat: Chat
    }
    type Mutation {
      createChat(userId1: String!, userId2: String!, message: String!): HTTPResponse
      updateChat(userId: String!, message: String!): HTTPResponse
      deleteChat(_id: ID!): HTTPResponse
    }
  `,
  resolvers: {
    Query: {
      contextChats: (_, __, context) => readChats({ userId: context.username}),
      contextChat: (_, __, context) => readChat({ userId: context.username })
    },
    Mutation: {
      createChat: async(_, args, context) => createChat({userId1: args.username, userId2: context.username}, args),
      updateChat: async (_, args) => updateChat({ username: args.username }, args),
      deleteChat: (_, args) => deleteChat(args),
    },
  },
});

export const x = 2;