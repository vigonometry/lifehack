import { createModule, gql } from "graphql-modules";
import jwt from "jsonwebtoken";
import { readClient } from "../db_functions/Client.js";
import { readCounsellor } from "../db_functions/Counsellor.js";
import { addOnlineUser, deleteOnlineUser } from "../db_functions/OnlineUsers.js";

export const UserModule = createModule({
  id: "user",
  typeDefs: gql`
    interface User {
      _id: ID!
      username: String!
      email: String!
      password: String!
      chats: [Chat]!
    }

    type AppContext {
      currentUser: User
      dbInitialized: Boolean
    }

    type Query {
      currentUser: User
    }

    type Mutation {
      login(username: String!, password: String!): HTTPResponse
      logout(id:ID!): HTTPResponse
    }
  `,
  resolvers: {
    User: {
      __resolveType: obj => {
        if (obj.isClient) return "Client";
        console.log("Obj from resolve type", obj);
        return "Counsellor";
      }
    },
    Query: {
      currentUser: async (_, __, context) => {
        console.log("Context in currUser:", context.id);
        let isClient = true;
        var user = await readClient({ _id: context.id });
        if (!user) { 
          user = await readCounsellor({ _id: context.id });
          isClient = false;
        };
        console.log("User in currUser", user);

        // needed to resolve the type to Client / Counsellor
        return {...user, isClient };
      },
    },
    Mutation: {
        login: async(_, args) => {
            const {username, password} = args;
            let isClient = true;
            var user = await readClient({username: username, password: password});
            if (!user) { 
              user = await readCounsellor({username: username, password: password}) 
              isClient = false;
            }
            if (!user) return {error: "Username is not in our data base"}
            const valid = password === user.password;
            if (!valid) return { error: "Incorrect password entered" }
            console.log("User in login", user);
            await addOnlineUser(user._id, isClient);
            return { response: jwt.sign({id: user._id, username: user.username, isClient:isClient }, "nnamdi")}
        },

        // args: id of Client/Counsellor - to delete from OnlineUsers
        logout: async(parent, args, ctx) => {
          console.log("Logout ran with ID", ctx.id);

          // console.log(ctx);
          const res = await deleteOnlineUser(ctx.id);
          return { response: res }


        }
    }
  },
});
