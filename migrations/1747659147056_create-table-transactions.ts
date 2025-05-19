import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('transactions', {
    id: {
      type: 'VARCHAR(40)',
      primaryKey: true,
    },
    user_email: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    invoice_number: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    transaction_type: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    service_code: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    service_name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    description: {
      type: 'VARCHAR(200)',
      notNull: true,
    },
    total_amount: {
      type: 'INTEGER',
      notNull: true,
    },
    created_on: {
      type: 'TEXT',
      notNull: true,
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('transactions');
}
