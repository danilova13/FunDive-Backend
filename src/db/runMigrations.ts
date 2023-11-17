import { runMigrations } from ".";

async function executeMigration() {
    const { argv } = process;
    const direction = argv[2];

    // throw error if not up or down
    if (direction !== 'up' && direction !== 'down') {
        throw new Error('Direction is not specified!');
    }

    await runMigrations({ direction: direction as  'up' | 'down' });
}

executeMigration();
