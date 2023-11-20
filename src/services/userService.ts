import { UserDB } from "../db/user";
import { User, UserForm } from "../model/user";
import * as EmailValidator from 'email-validator';
import { isValidPhoneNumber } from 'libphonenumber-js/min';

export class UserService {
    userDB: UserDB;

    constructor(userDB: UserDB) {
        this.userDB = userDB;
    }

    async createUser(userForm: UserForm): Promise<User | null> {
        try{
            // validate email 
            if(!EmailValidator.validate(userForm.email)){
                throw new Error('This email is not valid, please enter a valid email!');
            }

            // validate phone number 
            if(!isValidPhoneNumber(userForm.phone)){
                throw new Error('This phone number is not valid, please enter a valid number!');
            }

            // validate first name 
            if(userForm.firstName === ''){
                throw new Error('The first name is not valid, please enter a valid first name!')
            }
            // validtae last name 
            if(userForm.lastName === ''){
                throw new Error('The last name is not valid, please enter a valid last name!')
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
