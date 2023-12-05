import { ApolloServer, gql } from "apollo-server-express";
import { UserService } from "../services/userService";
import { UserForm, LoginForm } from "../model/user";


export const buildResolvers = (
    userService: UserService,
) => ({
    Query: {
        health: () => 'Hello healthy web!',
        // resolver that gets user by Id
        getUserById: async(parent:any, args: any, context: any) => {
                if(!context.user) {
                    throw new Error("You have to be logged in to get a user!")
                }
                const { id } = args;

                console.log(id);
                console.log(context.user.userId);
                // permissions 
                if(context.user.userId !== id) {
                    throw new Error("You can't access this user!")
                }
        
                const user = await userService.getUserById(id);
                return user;
            }
        },

    Mutation: {
        // resolver that creates user
        createUser: async (parent: any, args: any, context: any) => {
            if (context.user) {
                throw new Error("Logged-in users cannot create a new account!");
            }
            // construct userForm object
            const userForm: UserForm = {
                email: args.email,
                firstName: args.firstName,
                lastName: args.lastName,
                phone: args.phone,
                password: args.password
            }
        
            return userService.createUser(userForm)
        },
        
        // resolver that updates user by id
        updateUserById: async (parent: any, args: any, context: any) => {
            // permissions
            if(!context.user) {
                throw new Error("You have to be logged in to update!");
            }
            const { id, patch } = args;
    
            // permissions 
            if(context.user.userId !== id) {
                throw new Error("You can't update this user!")
            }
    
            // construct userForm object
            const userForm: UserForm = {
                email: patch.email,
                firstName: patch.firstName,
                lastName: patch.lastName,
                phone: patch.phone,
                password: patch.password
            }
            
            return userService.updateUserById(id, userForm);
    
        },
        
        // resolver for user Login 
        loginUser: async (parent: any, args: any, context: any) => {
            if(context.user) {
                throw new Error("You are already logged in!");
            }
            // construct loginForm object
            const loginForm: LoginForm = {
                email: args.email,
                password: args.password
            }
    
            return userService.loginUser(loginForm);
        },
    }
});
