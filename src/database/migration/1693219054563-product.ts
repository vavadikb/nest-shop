import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPriceColumnToProduct1693219054563 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("product", new TableColumn({
            name: "price",
            type: "integer",
            isNullable: false,
            default: 0, // You can adjust the default value as needed
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product", "price");
    }
}
