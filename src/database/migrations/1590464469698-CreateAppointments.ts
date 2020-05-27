import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1590464469698
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'datetimeoffset',
          },
          {
            name: 'created_at',
            type: 'datetimeoffset',
            default: 'SYSDATETIMEOFFSET()',
          },
          {
            name: 'updated_at',
            type: 'datetimeoffset',
            default: 'SYSDATETIMEOFFSET()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}