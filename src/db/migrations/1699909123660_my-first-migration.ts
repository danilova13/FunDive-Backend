import type { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void>{
    pgm.sql(`
        CREATE TABLE users(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            first_name text NOT NULL,
            last_name text NOT NULL,
            email text NOT NULL UNIQUE,
            phone text,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void>{
    pgm.sql(`DROP TABLE users`);
}
