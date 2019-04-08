import {MigrationInterface, QueryRunner} from "typeorm";

export class addArtifacts1554660589656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "artifact" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" text NOT NULL, CONSTRAINT "PK_1f238d1d4ef8f85d0c0b8616fa3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "artifact"`);
    }

}
