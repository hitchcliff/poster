import { MigrationInterface, QueryRunner } from "typeorm";

export class PostMi1669859568763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE post ADD text varchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE post DROP COLUMN text`);
  }
}
