import { Pool } from 'pg';
import runner from 'node-pg-migrate';
import path from 'path';
import type {
    RunnerOption,
} from 'node-pg-migrate';

export async function initiateDB() {
    
    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: 'database',
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
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

export async function runMigrations({
    direction,
    databaseUrl,
}: { 
    direction: 'up' | 'down', 
    databaseUrl?: string,
}) {
    console.log('URL', process.env.DATABASE_URL)
    await runner({ 
        databaseUrl: databaseUrl || process.env.DATABASE_URL as string,
        migrationsTable: "pgmigrations",
        dir: path.resolve(__dirname, "./migrations"),
        direction,
        count: direction === 'up' ? 1000 : 1,
        verbose: true
    })
}
