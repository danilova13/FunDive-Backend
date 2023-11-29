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
        passwordHash: String!
    }

    input UserPatch {
        email: String, 
        firstName: String,
        lastName: String,
        phone: String,
        passwordHash: String
    }

    type Mutation {
        createUser(
            email: String!, 
            firstName: String!,
            lastName: String!,
            phone: String!,
            passwordHash: String!
        ): User!

        updateUserById(
            id: ID!,
            patch: UserPatch!
        ): User
    }
`);
