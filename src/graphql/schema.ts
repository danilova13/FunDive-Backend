import { gql } from "apollo-server-express";

export const typeDefs = gql(`
    type Query {
        health: String
        getUserById (id: ID!): User
    }

    type User {
        email: String!
        firstName: String!
        id: ID!
        lastName: String!
        phone: String!
    }

    input UserPatch {
        email: String, 
        firstName: String,
        lastName: String,
        phone: String
    }

    type Mutation {
        createUser(
            email: String!, 
            firstName: String!,
            lastName: String!,
            phone: String!
        ): User!

        updateUserById(
            id: ID!,
            patch: UserPatch!
        ): User
    }
`);
