import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameJobListing1736990911802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("job_posting","jobs")
         await queryRunner.renameTable("company","companies")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("jobs","job_posting")
        await queryRunner.renameTable("companies","company")
    }

}
