import { ApolloServer } from "@apollo/server";
import { buildResolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { UserService } from "../services/userService";
import { context } from "../auth/middleware";
import { DiveService } from "../services/diveService";
import { GraphQLContext } from "../auth/types";

export const buildGraphQLServer = (
    userService: UserService,
    diveService: DiveService
) => {
    const resolvers = buildResolvers(userService, diveService);
    const graphqlServer = new ApolloServer<GraphQLContext>({ 
        typeDefs, 
        resolvers, 
        introspection: true
    });

    return graphqlServer;
}
