import {MigrationInterface, QueryRunner} from "typeorm";

export class addOriginIdToArtifacts1554660647272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artifact" ADD "originId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artifact" DROP COLUMN "originId"`);
    }

}
