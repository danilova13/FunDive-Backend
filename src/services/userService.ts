import { UserDB } from "../db/user";
import { User, UserForm, AuthenticationPayload, LoginForm, Auth } from "../model/user";
import { validateUserForm } from "../model/user"; 
import bcrypt from 'bcrypt';
import { jwtGenerator } from "../auth/jwtGenerator";

export class UserService {
    userDB: UserDB;

    constructor(userDB: UserDB) {
        this.userDB = userDB;
    }

    async createUser(userForm: UserForm): Promise<AuthenticationPayload> {
        try{
            // validate userForm
            validateUserForm(userForm, true);

            // hash the password 
            const cost = 10; 
            const hash = await bcrypt.hash(userForm.password, cost);

            // build user
             const user: UserForm = {
                email: userForm.email,
                lastName: userForm.lastName,
                firstName: userForm.firstName,
                phone: userForm.phone, 
                password: hash,
            }

            // save new user to db based on the built user 
            const newUser = await this.userDB.saveUser(user);
    
            // generating jwt token
            const token = jwtGenerator(newUser.id);

            return {
                user: newUser,
                auth: {
                    jwtToken: token,
                },
            }
    
        } catch(error) {
            console.error('Error in createUser', error);
            throw error;
        }
    }

    // build login feature
    async loginUser(loginForm: LoginForm): Promise<AuthenticationPayload> {
       try{
            // get user's info based on the email provided from db
            const user = await this.userDB.getUserByEmail(loginForm.email);
 
            if (!user) {
                throw new Error("Invalid credentials");
            }

            // check if entered password is the same as the hashed one in db
            const validPassword = await bcrypt.compare(loginForm.password, user.password);

            if(!validPassword) {
                throw new Error("Invalid credentials")
            }

            //give user a jwt token
            const token = jwtGenerator(user.id);

            return {
                user: user,
                auth: {
                    jwtToken: token,
                }
            };

       } catch(error) {
            console.error('Error in loginUser', error);
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
            const user: UserForm = {
                email: userForm.email,
                lastName: userForm.lastName,
                firstName: userForm.firstName,
                phone: userForm.phone,
                password: userForm.password
            }

            const updatedUser = await this.userDB.updateUserById(id, user);
            return updatedUser;
        } catch (error) {
            console.error('Error in updateUserById', error);
            throw error;
        }
    }
}
