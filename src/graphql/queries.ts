import { UserService } from "../services/userService";


export const buildGetUserByIdResolver = (
    userService: UserService
) => {
    const getUserByIdResolver = async (parent:any, args: any) => {
        const { id } = args;
        const user = await userService.getUserById(id);
        return user;
    }

    return getUserByIdResolver;
}
