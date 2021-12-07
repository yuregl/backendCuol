import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableClients1638739284718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clients",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "full_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "gender",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "birth_date",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "cities_id",
            type: "int",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FKCitiesClients",
            referencedTableName: "cities",
            referencedColumnNames: ["id"],
            columnNames: ["cities_id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clients");
  }
}
