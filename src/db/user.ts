import { Pool } from 'pg';
import { User } from '../model/user';

export class UserDB {
    pool: Pool;

    constructor(pool: Pool){
        this.pool = pool;
    }

    async saveUser(userData: User): Promise<User | null>{
        try {
            const result = await this.pool.query(
                `INSERT INTO users(email, last_name, first_name, phone)
                    VALUES($1, $2, $3, $4)
                    RETURNING *
                `, [userData.email, userData.lastName, userData.firstName, userData.phone]
            );
            if (!result.rows[0]) {
                return null;
            }
            const user: User = this.transformUser(result.rows[0]);
            console.log(user);
            return user;
        } catch(error) {
            console.error('Error in saveUser', error);
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

    async updateUserById(id: number, userData: User): Promise<User | null> {
        try{
            // 
            const fields = '';
            const values: any = [];
            // for each field in userData
            // include fields if they are provided 
            // add them to fields ex: phone = $2, email = $3, etc...
            // add them to values userData.phone, userData.email ...
            const result = await this.pool.query(`
                UPDATE users
                    SET
                        ${fields}
                    WHERE id = $1
                    RETURNING *
            `, [id, ...values])
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
            phone: dbUser.phone
        }

        return user;
    }
}
