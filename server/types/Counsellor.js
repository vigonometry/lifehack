import { createModule, gql } from "graphql-modules";
import { readCounsellors, readCounsellor, createCounsellor } from "../db_functions/Counsellor.js";
export const CounsellorModule = createModule({
  id: "counsellor",
  typeDefs: gql`
    type Counsellor implements User {
      _id: ID!
      username: String!
      email: String!
      password: String!
      institution: String!
      course: String!
      chats: [Chat]!
      isClient: Boolean
    }

    type Query {
      readCounsellors: [Counsellor]! #resolver
      readCounsellor(_id: ID!): Counsellor #resolver
    }

    type Mutation {
      createCounsellor(username: String!, email: String!, password: String!, institution: String!, course: String!): HTTPResponse
    }
  `,
  resolvers: {
    Counsellor: {
        chats: (parent) => readChats({counsellorId: parent.Id})
    },
    Query: {
        readCounsellors: (_, args) => readCounsellors(args),
        readCounsellor: (_, args) => readCounsellor(args)
    },
    Mutation: {
        createCounsellor: (_, args) => createCounsellor(args)
    }
  },
});
