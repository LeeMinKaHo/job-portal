import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateJobPosting1735657713355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'job_posting',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'title',
            isNullable: false,
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('job_posting');
  }
}
