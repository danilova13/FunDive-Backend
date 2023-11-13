import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";


export const graphqlServer = new ApolloServer({ typeDefs, resolvers})