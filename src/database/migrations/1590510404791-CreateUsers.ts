import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1590510404791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'datetimeoffset',
            default: ' SYSDATETIMEOFFSET()',
          },
          {
            name: 'updated_at',
            type: 'datetime2',
            default: 'SYSDATETIMEOFFSET()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
