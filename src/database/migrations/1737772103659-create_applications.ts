import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateApplications1737772103659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"applications",
            columns:[
                { 
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    generationStrategy:"increment",
                    isGenerated:true
                },
                {
                    name:"cover_letter",
                    type:"text",
                    isNullable:true
                },
                {
                    name:"create_at",
                    type:"timestamp",
                    default:"now()"
                },
                {
                    name:"resume_url",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"status",
                    type:"enum",
                    enum:["PENDING" , "APPROVED" , "REJECTED"],
                    default:`"PENDING"`
                },
                {
                    name:"active",
                    type:"bool",
                    default:true
                },
                {
                    name:"job_id",
                    type:"int"
                }
            ]
        }))
        queryRunner.createForeignKey("applications", new TableForeignKey({
            referencedTableName:"applications",
            referencedColumnNames:["id"],
            columnNames:["job_id"],
            onDelete:'RESTRICT',
            onUpdate:"RESTRICT"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("applications")
    }

}
