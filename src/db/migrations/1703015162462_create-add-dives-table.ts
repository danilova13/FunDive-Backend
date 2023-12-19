/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE dives(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name text NOT NULL,
            date text NOT NULL,
            description text NOT NULL,
            duration text NOT NULL,
            location text NOT NULL,
            user_id INT REFERENCES users(id),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        ) 
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql('DROP TABLE dives');
}
