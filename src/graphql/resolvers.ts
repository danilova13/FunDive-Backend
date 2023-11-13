import { ApolloServer, gql } from "apollo-server-express";

const resolvers = {
    Query: {
        health: () => 'Hello healthy web!',
    }
};

export { resolvers };
