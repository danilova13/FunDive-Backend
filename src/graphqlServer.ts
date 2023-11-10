import { ApolloServer, gql } from "apollo-server-express";

// define graphql schema: initial schema with a healthcheck query 
import { typeDefs } from "./schema";


const resolvers = {
    Query: {
        health: () => 'Hello healthy web!',
    }
};

export const graphqlServer = new ApolloServer({ typeDefs, resolvers})