/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        ALTER TABLE users
            ADD COLUMN password text NOT NULL;
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        ALTER TABLE users
            DROP COLUMN password;
    `);
}
