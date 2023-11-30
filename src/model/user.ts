import * as EmailValidator from 'email-validator';
import { isValidPhoneNumber } from 'libphonenumber-js/min';


export type User = {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    phone: string;
    password: string;
}

export type UserForm = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
}

export type Auth = {
    jwtToken: string;
}

export type AuthenticationPayload = {
    user: User;
    auth: Auth;
}

export type LoginForm = {
    email: string;
    password: string;
}

export function validateUserForm(userForm: UserForm, areFieldsRequired: Boolean): UserForm {
        // if the email is in the form, validate email
        if (userForm.email) {

            if(!EmailValidator.validate(userForm.email)){
                throw new Error('This email is not valid, please enter a valid email!');
            }
        } else if(areFieldsRequired) {
            throw new Error("Please enter a correct email, email is required!");
        }

        // if phone number is in the form validate phone number 
        if (userForm.phone) {
            if(!isValidPhoneNumber(userForm.phone)){
                throw new Error('This phone number is not valid, please enter a valid number!');
            }
        } else if(areFieldsRequired) {
            throw new Error("Please enter a correct phone number, phone number is required!");
        }
       
        // validate first name 
        if(userForm.firstName) {
            if(userForm.firstName === ''){
                throw new Error('The first name is not valid, please enter a valid first name!')
            }
        } else if(areFieldsRequired) {
            throw new Error("Please enter a name, name is required!")
        }
        
       
        // validate last name 
        if (userForm.lastName) {
            if(userForm.lastName === ''){
                throw new Error('The last name is not valid, please enter a valid last name!')
            } 
        } else if(areFieldsRequired) {
            throw new Error("Please enter a last name, last name is required!")
        }
       
        return userForm;
}
