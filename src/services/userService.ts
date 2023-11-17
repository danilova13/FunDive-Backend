import { UserDB } from "../db/user";
import { User, UserForm } from "../model/user";


export class UserService {
    userDB: UserDB;

    constructor(userDB: UserDB) {
        this.userDB = userDB;
    }

    async createUser(userForm: UserForm): Promise<User | null> {
        try{
            // validation to make sure name, last name, email not empty string
            if(userForm.email === '' || userForm.firstName === '' || userForm.lastName === '' || userForm.phone === '') {
                throw new Error('You must enter valid information!')
            }

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
}