import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('wallet', {
    id: {
      type: 'VARCHAR(40)',
      primaryKey: true,
    },
    balance: {
      type: 'INTEGER',
      notNull: true,
    },
    user_email: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('wallet');
}
