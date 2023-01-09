import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddFirstLast1673252223040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user ADD "firstName"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE user DROP "firstName"
    `);
  }
}
