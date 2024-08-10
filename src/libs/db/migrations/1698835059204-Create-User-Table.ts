import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1698254752159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable("users");
    if (!tableExist) {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "varchar",
              isPrimary: true,
            },

            {
              name: "firstName",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "lastName",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "email",
              type: "varchar",
              isNullable: false,
            },
            {
              name: "username",
              type: "varchar",
              isNullable: false,
            },

            {
              name: "role",
              type: "enum",
              enum: ["dispenser", "supervisor"],
              isNullable: false,
            },
            {
              name: "password",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "verified",
              type: "boolean",
              default: false,
            },
            {
              name: "lastLoggedInAt",
              type: "timestamp",
              isNullable: true,
            },
            {
              name: "verificationToken",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "resetToken",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "tokenExpiration",
              type: "timestamp",
              isNullable: true,
            },
            {
              name: "createdAt",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updatedAt",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "version",
              type: "int",
              default: 0,
            },
          ],
        })
      );
    } else {
      console.log("Table users already exists. Skipping creation.");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
