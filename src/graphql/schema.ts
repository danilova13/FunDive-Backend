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
        password: String!
    }

    type Auth {
        jwtToken: String!
    }

    type AuthenticationPayload {
        user: User
        auth: Auth
    }

    input UserPatch {
        email: String, 
        firstName: String,
        lastName: String,
        phone: String,
        password: String
    }

    type Mutation {
        createUser(
            email: String!, 
            firstName: String!,
            lastName: String!,
            phone: String!,
            password: String!
        ): AuthenticationPayload!

        updateUserById(
            id: ID!,
            patch: UserPatch!
        ): User

        loginUser(
            email: String!,
            password: String!
        ): AuthenticationPayload!
    }
`);
