import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1721799607441 implements MigrationInterface {
    name = 'Initial1721799607441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "probandom_igraciones" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "probandom_igraciones"`);
    }

}
