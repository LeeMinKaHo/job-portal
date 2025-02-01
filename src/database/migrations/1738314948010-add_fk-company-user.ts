import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddFkCompanyUser1738314948010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Thêm cột userId (cho phép null tạm thời)
        await queryRunner.addColumn("companies", new TableColumn({
            name: "userId",
            type: "int",
            isNullable: true, // Cho phép null để tránh lỗi khi thêm cột
        }));

        // Kiểm tra xem userId = 1 có tồn tại không
        const userExists = await queryRunner.query(`SELECT id FROM users WHERE id = 1`);

        if (userExists.length > 0) {
            // Nếu userId = 1 tồn tại, cập nhật các bản ghi null
            await queryRunner.query(`UPDATE companies SET userId = 1 WHERE userId IS NULL`);
        } else {
            console.warn("⚠️ User ID 1 không tồn tại. Hãy tạo user có ID = 1 trước khi chạy migration.");
        }

        // Đổi lại cột userId thành NOT NULL
        await queryRunner.changeColumn(
            "companies",
            "userId",
            new TableColumn({
                name: "userId",
                type: "int",
                isNullable: false, // Không cho phép null nữa
            })
        );

        // Thêm ràng buộc khóa ngoại
        await queryRunner.createForeignKey("companies", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "RESTRICT",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("companies", "FK_Company_User");
        await queryRunner.dropColumn("companies", "userId");
    }
}
