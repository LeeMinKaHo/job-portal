import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAutoIdJobPosting1736058350723 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Chỉnh sửa cột 'id' thành auto-increment
        await queryRunner.query(`
            ALTER TABLE job_posting 
            MODIFY COLUMN id INT AUTO_INCREMENT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Hoàn tác thay đổi, loại bỏ auto-increment (nếu cần)
        await queryRunner.query(`
            ALTER TABLE job_posting 
            MODIFY COLUMN id INT
        `);
    }
}
