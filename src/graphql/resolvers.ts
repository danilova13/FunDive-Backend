import { ApolloServer, gql } from "apollo-server-express";

export const resolvers = {
    Query: {
        health: () => 'Hello healthy web!',
    }
};

