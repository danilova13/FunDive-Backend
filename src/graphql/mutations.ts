import { UserForm } from "../model/user"
import { UserService } from "../services/userService"

// create a function that takes userService and returns resolvers
export const buildCreateUserResolver = (
    userService: UserService,
) => {   
    const createUserResolver = async (parent: any, args: any) => {
        // construct userForm object
        const userForm: UserForm = {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            phone: args.phone
        }
    
        return userService.createUser(userForm)
    }

    return createUserResolver;
}

export const buildUpdateUserByIdResolver = (
    userService: UserService,
) => {
    const updateUserByIdResolver = async (parent: any, args: any) => {
        const { id } = args;
        // construct userForm object
        const userForm: UserForm = {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            phone: args.phone
        }
        
        return userService.updateUserById(id, userForm);

    }

    console.log(updateUserByIdResolver);
    return updateUserByIdResolver;
}
