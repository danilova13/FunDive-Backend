import { Pool } from 'pg'

export class User {
    dive_id: number;
    email: string;
    id!: number;
    last_name: string;
    name: string;
    phone: string;
    pool: Pool;

    constructor(pool: Pool){
        this.pool = pool;
    }

    async saveUser(userData: {
        dive_id: number;
        email: string;
        id: number;
        last_name:string;
        name: string;
        phone: string;
    }){
        try {
            const result = await this.pool.query(
                `INSERT INTO users(dive_id, email, id, last_name, name, phone)
                    VALUES($1, $2, $3, $4, $5, $6)
                    RETURNING *
                `, [userData.dive_id, userData.email, userData.id, userData.last_name, userData.name, userData.phone]
            );
            return result.rows[0];
        } catch(error) {
            console.error('Error in saveUser', error);
            throw error;
        }
    }

    async getUserById(id: number){
        try {
            const result = await this.pool.query('SELECT * FROM users WHERE id=$1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in getUserById', error);
            throw error;
        }
    }
}