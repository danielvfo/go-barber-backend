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
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'providerId',
            type: 'uniqueidentifier',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'datetimeoffset',
          },
          {
            name: 'createdAt',
            type: 'datetimeoffset',
            default: 'SYSDATETIMEOFFSET()',
          },
          {
            name: 'updatedAt',
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
