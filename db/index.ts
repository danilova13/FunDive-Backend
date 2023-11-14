import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function initiateDB() {
    
    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: 'localhost',
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5433,
        max: 10,
        connectionTimeoutMillis: 20000,
        idleTimeoutMillis: 20000,
        allowExitOnIdle: false
    });
    
    // check out the connection and then release it back to the pool
    try {
        const client = await pool.connect();
        console.log('Database connection was successful');
        client.release();
    } catch (error) {
        console.error('Database connection failed', error);
        throw error;
    }
    
    return pool;
}

const dbPool = initiateDB();
export { dbPool };

