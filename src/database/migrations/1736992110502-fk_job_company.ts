import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class FkJobCompany1736992110502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("jobs" , new TableForeignKey({
            columnNames:["company_id"],
            referencedColumnNames:["id"],
            referencedTableName:"companies",
            onDelete:'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
