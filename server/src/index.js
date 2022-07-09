import startApolloServer from "./apolloServer.js";
import connectToMongo from "./mongoServer.js";

connectToMongo(startApolloServer)