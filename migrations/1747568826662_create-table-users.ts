import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('services', {
    id: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    username: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('users');
}
