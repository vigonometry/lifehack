import { createModule, gql } from "graphql-modules";
import { getOnlineUsers } from "../db_functions/OnlineUsers";

export const OnlineUsersModule = createModule({
    id: 'online_users',
    typeDefs: gql`
        type Query {
            onlineUsers: [User]
        }

        type Mutation {
            addOnlineUser(user: User):HTTPResponse
        }
    `,
    resolvers: {
        Query: {
            onlineUsers: (parent, args, ctx) => getOnlineUsers(),
        },
        Mutation: {

        }
    }
})