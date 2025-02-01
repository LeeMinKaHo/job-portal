import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRefreshToken1738047538886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users",new TableColumn({
            name:"refresh_token",
            type:"varchar",
            isNullable:true
        }))  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "refresh_token")
    }

}
