import { ApolloServer, gql } from "apollo-server-express";
import { buildResolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { UserService } from "../services/userService";
import { context } from "../auth/middleware";
import { DiveService } from "../services/diveService";

export const buildGraphQLServer = (
    userService: UserService,
    diveService: DiveService
) => {
    const resolvers = buildResolvers(userService, diveService);
    const graphqlServer = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context,
        introspection: true
    });

    return graphqlServer;
}
