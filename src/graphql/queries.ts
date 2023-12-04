import { UserService } from "../services/userService";


export const buildGetUserByIdResolver = (
    userService: UserService
) => {
    const getUserByIdResolver = async (parent:any, args: any, context: any) => {
        if(!context.user) {
            throw new Error("ERROR!")
        }
        const { id } = args;

        // permissions 
        if(context.user.userId !== id) {
            throw new Error("You can't access this user!")
        }

        const user = await userService.getUserById(id);
        return user;
    }

    return getUserByIdResolver;
}
