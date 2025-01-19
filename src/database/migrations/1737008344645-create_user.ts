import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1737008344645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"users",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment'
                },
                {
                    name:"gmail",
                    type:"varchar",
                    isUnique:true,
                    isNullable:false
                },
                {
                    name:"password",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"active",
                    type:"boolean",
                    default:true,
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['ADMIN', 'EMPLOYER',"CANDIDATE"],
                    default: `'EMPLOYER'`,
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
