import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateJobPosting1735704492090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('job_posting', [
      new TableColumn({
        name: 'salary',
        type: 'varchar', // Corrected to 'varchar' for MySQL
        length: '100',
        default: "'Thỏa Thuận'", // Ensure default value is in quotes
        isNullable: false,     
      }),
      new TableColumn({
        name: 'recruitment_quantity',
        type: 'int',
        default: 1
      }),
      new TableColumn({
        name: 'benefits',
        type: 'text',
        isNullable: false
      }),
      new TableColumn({
        name: 'job_description',
        type: 'text',
        isNullable: false
      }),
      new TableColumn({
        name: 'application_deadline',
        type: 'datetime', // Corrected 'DateTime' to 'datetime'
        isNullable: false,
      }),
      new TableColumn({
        name: 'is_hidden',
        type: 'boolean',
        isNullable: false,
        default: false
      }),
      new TableColumn({
        name: 'gender',
        type: 'boolean',
        isNullable: false,
        default: false
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('job_posting', 'salary');
    await queryRunner.dropColumn('job_posting', 'gender');
    await queryRunner.dropColumn('job_posting', 'recruitment_quantity');
    await queryRunner.dropColumn('job_posting', 'benefits');
    await queryRunner.dropColumn('job_posting', 'job_description');
    await queryRunner.dropColumn('job_posting', 'application_deadline');
    await queryRunner.dropColumn('job_posting', 'is_hidden');
  }
}
