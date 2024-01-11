import { ApolloServer, gql } from "apollo-server-express";
import { UserService } from "../services/userService";
import { UserForm, LoginForm } from "../model/user";
import { DiveService } from "../services/diveService";
import { DiveForm } from "../model/dive";

export const buildResolvers = (
    userService: UserService,
    diveService: DiveService
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
            },
        
        // resolver that gets a dive by dive id
        getDiveById: async(parent: any, args: any, context: any) => {
                if(!context.user) {
                    throw new Error("You have to be logged in to get a dive!")
                }

                const { id } = args;

                // permissions for accessing a dive
                if(args.id !== id) {
                    throw new Error("You can't access this dive!");
                }

                const dive = await diveService.getDiveById(id);

                return dive;
            },

        getDivesByUserId: async(parent: any, args: any, context: any) => {
                if(!context.user) {
                    throw new Error("You have to be logged in to get dives!")
                }

                const { userId, limit, offset } = args;

                // permissions for accessing dives 
                if(args.userId !== userId){
                    throw new Error("You can't access these dives!")
                }

                const dives = await diveService.getDivesByUserId(userId, limit, offset);

                return dives;
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
        
            return userService.createUser(userForm);
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

        createDive: async (parent: any, args: any, context: any) => {
            if (!context.user) {
                throw new Error("You have to be logged in to create a dive!");
            }

            const diveForm: DiveForm = {
                name: args.name,
                date: args.date,
                description: args.description,
                duration: args.duration,
                location: args.location
            }

            return diveService.createDive(context.user.userId, diveForm);
        },

        updateDiveById: async (parent: any, args: any, context: any) => {
            if (!context.user) {
                throw new Error("You have to be logged in to update dives!");
            }

            const { id, patch } = args;

            if (args.id !== id) {
                throw new Error("You can't update this dive!");
            }

            const diveForm: DiveForm = {
                name: patch.name,
                date: patch.date,
                description: patch.description,
                duration: patch.duration,
                location: patch.location
            }

            return diveService.updateDiveById(id, diveForm);
        },

        deleteDiveById: async (parent: any, args: any, context: any) => {
            if(!context.user){
                throw new Error("You have to be logged in to delete dives!");
            }

            const { id } = args;

            if (args.id !== id) {
                throw new Error("You can't delete this dive!");
            }

            return diveService.deleteDiveById(id);
        }
    }
});
