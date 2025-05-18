import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('services', {
    service_code: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    service_name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    service_icon: {
      type: 'VARCHAR(120)',
      notNull: true,
    },
    service_tariff: {
      type: 'INTEGER',
      notNull: true,
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('services');
}
