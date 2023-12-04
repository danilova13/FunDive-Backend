import { context } from "../auth/middleware"
import { UserForm, LoginForm } from "../model/user"
import { UserService } from "../services/userService"

// create a function that takes userService and returns resolvers
export const buildCreateUserResolver = (
    userService: UserService,
) => {   
    const createUserResolver = async (parent: any, args: any, context: any) => {
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
    }

    return createUserResolver;
}

export const buildUpdateUserByIdResolver = (
    userService: UserService,
) => {
    const updateUserByIdResolver = async (parent: any, args: any, context: any) => {
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

    }

    return updateUserByIdResolver;
}

export const buildLoginUserResolver = (
    userService: UserService,
) => {
    const loginUserResolver = async (parent: any, args: any, context: any) => {
        if(context.user) {
            throw new Error("You are already logged in!");
        }
        // construct loginForm object
        const loginForm: LoginForm = {
            email: args.email,
            password: args.password
        }

        return userService.loginUser(loginForm);
    }

    return loginUserResolver;
}

