export const typeDefs = `#graphql
    type Query {
        health: String
        getUserById (id: Int!): User
        getDiveById (id: Int!): Dive
        getDivesByUserId (userId: Int!, limit: Int!, offset: Int!): [Dive]
    }

    type User {
        email: String!
        firstName: String!
        id: Int!
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

    type Dive {
        id: Int!
        name: String!
        date: String!
        description: String!
        duration: Int!
        location: String!
        userId: Int!
    }

    input UserPatch {
        email: String, 
        firstName: String,
        lastName: String,
        phone: String,
        password: String
    }

    input DivePatch {
        name: String,
        date: String,
        description: String,
        duration: Int,
        location: String
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
            id: Int!,
            patch: UserPatch!
        ): User

        loginUser(
            email: String!,
            password: String!
        ): AuthenticationPayload!

        createDive(
            name: String!
            date: String!
            description: String!
            duration: Int!
            location: String!
        ): Dive

        updateDiveById(
            id: Int!
            patch: DivePatch!
        ): Dive

        deleteDiveById(
            id: Int!
        ): Int!
    }
`;
