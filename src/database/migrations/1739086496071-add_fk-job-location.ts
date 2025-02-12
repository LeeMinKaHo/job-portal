import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class AddFkJobLocation1739086496071 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Tạo bảng `locations`
        await queryRunner.createTable(new Table({
            name: "locations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true
                }
            ]
        }));
    
        // 2. Chèn dữ liệu vào bảng `locations`
        await queryRunner.query("INSERT INTO locations (name) VALUES ('Hồ Chí Minh')");
    
        // 3. Thêm cột `locationId` vào bảng `jobs`
        await queryRunner.addColumn("jobs", new TableColumn({
            name: "locationId",
            type: "int",
            isNullable: true // Nếu bắt buộc có location thì để `false`
        }));
    
        // 4. Cập nhật dữ liệu bảng `jobs` (nếu cần)
        await queryRunner.query("UPDATE jobs SET locationId = 1 ");
    
        // 5. Thêm khóa ngoại `locationId` trong bảng `jobs`
        await queryRunner.createForeignKey("jobs", new TableForeignKey({
            columnNames: ["locationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "locations",
            onDelete: "CASCADE" // Xóa location thì xóa luôn job liên quan
        }));
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
