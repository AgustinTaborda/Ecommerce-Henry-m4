import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAdmin1722945400191 implements MigrationInterface {
    name = 'IsAdmin1722945400191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
