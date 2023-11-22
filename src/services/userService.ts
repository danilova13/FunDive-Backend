import { UserDB } from "../db/user";
import { User, UserForm } from "../model/user";
import { validateUserForm } from "../model/user";

export class UserService {
    userDB: UserDB;

    constructor(userDB: UserDB) {
        this.userDB = userDB;
    }

    async createUser(userForm: UserForm): Promise<User | null> {
        try{
            // validate userForm
            validateUserForm(userForm, true);

            // build user
            const user: User = {
                email: userForm.email,
                lastName: userForm.lastName,
                firstName: userForm.firstName,
                phone: userForm.phone
            }

            // save new user to db based on the built user 
            const newUser = await this.userDB.saveUser(user);

            return newUser; 

        } catch(error) {
            console.error('Error in createUser', error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try{
            const user = await this.userDB.getUserById(id);
            return user;
        } catch(error) {
            console.error('Error in getUserById', error);
            throw error;
        }
    }

    async updateUserById(id: number, userForm: UserForm): Promise<User | null> {
        try{
            // validate userForm
            validateUserForm(userForm, false);

            // build user
            const user: User = {
                email: userForm.email,
                lastName: userForm.lastName,
                firstName: userForm.firstName,
                phone: userForm.phone
            }

            const updatedUser = await this.userDB.updateUserById(id, user);

            console.log(updatedUser);
            
            return updatedUser;
        } catch (error) {
            console.error('Error in updateUserById', error);
            throw error;
        }
    }
}
