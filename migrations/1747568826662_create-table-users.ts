import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(40)',
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(100)',
      unique: true,
      notNull: true,
    },
    first_name: {
      type: 'VARCHAR(60)',
      notNull: true,
    },
    last_name: {
      type: 'VARCHAR(60)',
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    profile_image: {
      type: 'VARCHAR(120)',
      default: '',
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('users');
}
