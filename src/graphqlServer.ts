import { ApolloServer, gql } from "apollo-server-express";

// define graphql schema: initial schema with a healthcheck query 
// and resolver is added 
const typeDefs = gql(`
    type Query {
        health: String
    }
`);

const resolvers = {
    Query: {
        health: () => 'Hello healthy web!',
    }
};

export const graphqlServer = new ApolloServer({ typeDefs, resolvers})