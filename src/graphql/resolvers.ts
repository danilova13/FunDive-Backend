import { ApolloServer, gql } from "apollo-server-express";
import { buildCreateUserResolver, buildUpdateUserByIdResolver } from "./mutations";
import { UserService } from "../services/userService";
import { buildGetUserByIdResolver } from "./queries";

export const buildResolvers = (
    userService: UserService,
) => ({
    Query: {
        health: () => 'Hello healthy web!',
        getUserById: buildGetUserByIdResolver(userService),
    },

    Mutation: {
        createUser: buildCreateUserResolver(userService),
        updateUserById: buildUpdateUserByIdResolver(userService),
    }
});
