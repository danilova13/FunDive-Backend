import * as EmailValidator from 'email-validator';
import { CountryCode, PhoneNumber, isValidPhoneNumber, parsePhoneNumberWithError } from 'libphonenumber-js/min';


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

export type JWTPayload = {
    userId: number
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
            const parsedNumber = parsePhone(userForm.phone);

            if(!isValidPhoneNumber(parsedNumber)){
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

// helper function that parses phone numbers
function parsePhone(phoneNumber: string) {
    // remove extra + and any characters that are not numbers
    let correctPhoneNum = phoneNumber.substring(phoneNumber.lastIndexOf('+')).replace(/[^0-9\\+]/g, '');

    // if num more than 10, ie non-North American num, and there is no + in front, append + to it
    if (correctPhoneNum.length > 10 && phoneNumber[0] !== '+') {
        correctPhoneNum = `+${phoneNumber}`;
    }

    // otherwise use parsePhone num function 
    return parsePhoneNumberWithError(correctPhoneNum, 'US').formatInternational();
}
