import { ApolloServer, gql } from "apollo-server-express";
import { buildResolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { UserService } from "../services/userService";
import { context } from "../auth/authorization";

export const buildGraphQLServer = (
    userService: UserService
) => {
    const resolvers = buildResolvers(userService);
    const graphqlServer = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context,
        introspection: true
    });

    return graphqlServer;
}
