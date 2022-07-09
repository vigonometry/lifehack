import { createModule, gql } from "graphql-modules";
import jwt from "jsonwebtoken";
import { readClient } from "../db_functions/Client.js";
import { readCounsellor } from "../db_functions/Counsellor.js";
import { addOnlineUser } from "../db_functions/OnlineUsers.js";

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
    }
  `,
  resolvers: {
    Query: {
      currentUser: async (_, __, context) => {
        var user = await readClient({ id: context.id });
        if (!user) user = await readCounsellor({ id: context.id });

        return user;
      },
    },
    Mutation: {
        login: async(_, args) => {
            const {username, password} = args;
            const isClient = true;
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
            return { response: jwt.sign({id: user._id, username: user.username}, "nnamdi")}
        }
    }
  },
});
