import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1730130399958 implements MigrationInterface {
  name = 'Init1730130399958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employees" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying(32) NOT NULL, "password" character varying(256) NOT NULL, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_sessions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employee_id" integer NOT NULL, "hash" character varying(256) NOT NULL, "is_logout" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cf2698511303dbc87e1d3e5d5a6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "employee_sessions"`);
    await queryRunner.query(`DROP TABLE "employees"`);
  }
}
