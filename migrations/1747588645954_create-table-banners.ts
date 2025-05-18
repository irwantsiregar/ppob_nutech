import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('banners', {
    banner_name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    banner_image: {
      type: 'VARCHAR(120)',
      notNull: true,
    },
    description: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('banners');
}
