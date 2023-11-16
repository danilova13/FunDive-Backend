import { Pool } from 'pg';
import { UserData } from '../model/user';

export class User {
    pool: Pool;

    constructor(pool: Pool){
        this.pool = pool;
    }

    async saveUser(userData: UserData): Promise<UserData | null>{
        try {
            const result = await this.pool.query(
                `INSERT INTO users(dive_id, email, last_name, name, phone)
                    VALUES($1, $2, $3, $4)
                    RETURNING *
                `, [userData.email, userData.last_name, userData.name, userData.phone]
            );
            if (!result.rows[0]) {
                return null;
            }
            const user : UserData = result.rows[0]
            return user;
        } catch(error) {
            console.error('Error in saveUser', error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<UserData | null>{
        try {
            const result = await this.pool.query('SELECT * FROM users WHERE id=$1', [id]);
            if (result.rows[0].length === 0) {
                return null;
            }
            if (!result.rows[0]) {
                return null;
            }

            const user: UserData = result.rows[0];
            return user;
        } catch (error) {
            console.error('Error in getUserById', error);
            throw error;
        }
    }
}
