import { createModule, gql } from "graphql-modules";
import { getOnlineUsers } from "../db_functions/OnlineUsers.js";

export const OnlineUsersModule = createModule({
    id: 'online_users',
    typeDefs: gql`
        type Query {
            onlineUsers: [User]
        }
    `,
    resolvers: {
        Query : {
            onlineUsers: async(parents, args, ctx) => {
                console.log("Get onlineUsers start");
                try {
                    const res = await getOnlineUsers();
                    console.log("Res from getOnline", res);
                    return res;
                    
                } catch (error) {
                    console.log("Err getting ONline", error);
                }
            }
        }
    }
})


