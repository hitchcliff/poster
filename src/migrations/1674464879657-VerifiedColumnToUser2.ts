import { MigrationInterface, QueryRunner } from "typeorm";

export class VerifiedColumnToUser21674464879657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        alter table public.user
        add verified bool 
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        alter table public.user
        drop verified 
        `);
  }
}
