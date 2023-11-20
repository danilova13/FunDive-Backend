import * as EmailValidator from 'email-validator';
import { isValidPhoneNumber } from 'libphonenumber-js/min';

export type User = {
    email: string;
    firstName: string;
    id?: number;
    lastName: string;
    phone: string;
}

export type UserForm = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export function validateUserForm(userForm: UserForm): UserForm {
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
        // validate last name 
        if(userForm.lastName === ''){
            throw new Error('The last name is not valid, please enter a valid last name!')
        } 
        return userForm;
}
