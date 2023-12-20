import { Pool } from 'pg';
import { DiveForm, Dive } from '../model/dive';

export class DiveDB {
    pool: Pool; 

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async saveDive(diveData: DiveForm): Promise<Dive> {
        try{
            const result = await this.pool.query(
                `INSERT INTO dives(
                    name,
                    date,
                    description,
                    duration,
                    location)
                    VALUES($1, $2, $3, $4, $5)
                    RETURNING *
                `,[diveData.name, diveData.date, diveData.description, diveData.duration, diveData.location]
            );

            const dive: Dive = this.transformDive(result.rows[0]);
            return dive;

        } catch(error) {
            console.error('Error in saveDive', error);
            throw error;
        }
    }

    async getDiveById(id: number): Promise<Dive | null> {
        try{
            const result = await this.pool.query('SELECT * FROM dives WHERE id=$1', [id]);

            if (!result.rows[0]){
                return null;
            }

            const dive: Dive = this.transformDive(result.rows[0]);
            return dive; 

        } catch(error){
            console.error('Error in getDiveByid', error);
            throw error;
        }
    }

    async deleteDiveById(id: number): Promise<void> {
        try {
            const result = await this.pool.query('DELETE FROM dives WHERE id=$1', [id]);
        } catch(error) {
            console.error('Error in deleteDiveById', error);
            throw error;
        }
    }

    transformDive(dbDive: Record<string, any>): Dive {
        const dive: Dive = {
            id: dbDive.id,
            name: dbDive.name,
            date: dbDive.date,
            description: dbDive.description,
            duration: dbDive.duration,
            location: dbDive.location,
            userId: dbDive.user_id
        }

        return dive;
    }
}
