import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFkApplicationJob1738935928064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'applications',
      new TableForeignKey({
        referencedTableName: 'jobs',
        columnNames: ['job_id'],
        referencedColumnNames: ['id'],
        onDelete: "CASCADE"
    }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Lấy danh sách các khóa ngoại từ bảng 'applications'
    const table = await queryRunner.getTable("applications");
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes("job_id"));

    if (foreignKey) {
      await queryRunner.dropForeignKey("applications", foreignKey);
    }
  }
}
