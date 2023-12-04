import { Pool } from 'pg';
import { LoginForm, User, UserForm } from '../model/user';
import { getFieldValues } from './helpers';


export class UserDB {
    pool: Pool;

    constructor(pool: Pool){
        this.pool = pool;
    }

    async saveUser(userData: UserForm): Promise<User>{
        try {
            const result = await this.pool.query(
                `INSERT INTO users(email, last_name, first_name, phone, password)
                    VALUES($1, $2, $3, $4, $5)
                    RETURNING *
                `, [userData.email, userData.lastName, userData.firstName, userData.phone, userData.password]
            );
            const user: User = this.transformUser(result.rows[0]);
            return user;
        } catch(error) {
            console.error('Error in saveUser', error);
            throw error;
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try{
            const result = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (!result.rows[0]) {
                return null;
            }
            const user: User = this.transformUser(result.rows[0]);
            return user;
        } catch(error) {
            console.error('Error in getUserByEmail', error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<User | null>{
        try {
            const result = await this.pool.query('SELECT * FROM users WHERE id=$1', [id]);
            if (!result.rows[0]) {
                return null;
            }
            const user: User = this.transformUser(result.rows[0]);
            return user;
        } catch (error) {
            console.error('Error in getUserById', error);
            throw error;
        }
    }

    async updateUserById(id: number, userData: UserForm): Promise<User | null> {
        try{
            const { fields, values } = getFieldValues(userData);
            
            const result = await this.pool.query(`
                UPDATE users
                    SET
                        ${fields.join(', ')}
                    WHERE id = $${values.length + 1}
                    RETURNING *
            `, [...values, id])

            if(!result.rows[0]){
                return null;
            }
            const user: User = this.transformUser(result.rows[0]);
            return user;
        } catch (error) {
            console.error('Error in updateUserById', error);
            throw error;
        }
    }

    transformUser(dbUser: Record<string, any>): User {
        const user: User = {
            email: dbUser.email,
            id: dbUser.id,
            lastName: dbUser.last_name,
            firstName: dbUser.first_name,
            phone: dbUser.phone,
            password: dbUser.password
        }

        return user;
    }
}
