import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompany1736946117437 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name:"company",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:"increment"
                },
                {
                    name:"name",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"tax_code",
                    type:"varchar",
                    length:"10",
                    isNullable:true
                },
                {
                    name:"field_id",
                    type:"int",
                },
                {
                    name:"location",
                    type:"int",
                },
                {
                    name:"address",
                    type:"varchar",
                    length:"255"
                },
                {
                    name:"img_url",
                    type:"text"
                },
                
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
