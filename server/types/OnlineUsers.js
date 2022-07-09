import { createModule, gql } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { getOnlineUsers } from "../db_functions/OnlineUsers.js";
import { ONLINE_USERS } from "./constants.js";

export const OnlineUsersModule = createModule({
    id: 'online_users',
    typeDefs: gql`
        type Query {
            onlineUsers: [User]
        }

        type Subscription {
            getOnlineUsers: [User]
        }
    `,
    resolvers: {
        Query : {
            onlineUsers: async(parents, args, ctx) => {
                console.log("Get onlineUsers start", ctx);
                
                try {
                    const res = await getOnlineUsers();
                    console.log("Res from getOnline", res);
                    return res;
                    
                } catch (error) {
                    console.log("Err getting ONline", error);
                }
            }
        },
        Subscription: {
            getOnlineUsers: {
                subscribe: (_, args, ctx) => {
                    console.log("ran subs");
                    return ctx.injector.get(PubSub).asyncIterator([ONLINE_USERS]);
                }
            }
        }
    }
})

export const publishOnlineUsers = async(ctx) => {
    try {
        const res = await getOnlineUsers();
        ctx.injector.get(PubSub).publish(ONLINE_USERS, {
            getOnlineUsers: res
        })
    } catch (error) {
        console.log("Err publishing", err);
    }
}





