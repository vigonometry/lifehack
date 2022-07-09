import { createModule, gql } from "graphql-modules";
import { readClients, readClient, createClient } from "../db_functions/Client.js";
import { readChats } from "../db_functions/Chat.js"
import { PubSub } from "graphql-subscriptions";

// const pubsub = new PubSub();
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

    type CustomType {
      text: String
    }

    type Subscription {
      clientRead: CustomType
    }
  `,
  resolvers: {
    Client: {
      chats: (parent) => readChats({ clientId: parent.Id }),
    },
    Query: {
      readClients: (_, args, ctx) =>  { 
       ctx.injector.get(PubSub).publish('READ_CLIENTS', {
          text: 'someone read clients'
        })
        console.log("Dispatched");
        //console.log(ctx.injector.get(PubSub))
        return readClients(args)
      },
      readClient: (_, args) => readClient(args),
    },
    Mutation: {
      createClient: (_, args) => createClient(args),
    },

    Subscription: {
      clientRead: {
        subscribe: (_, args, ctx) => { 
          return ctx.injector.get(PubSub).asyncIterator(['READ_CLIENTS']) 
        }
      }
    }
  },
});
