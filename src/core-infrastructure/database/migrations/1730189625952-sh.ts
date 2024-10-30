import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1730189625952 implements MigrationInterface {
  name = 'Sh1730189625952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying(32) NOT NULL, "password" character varying(256) NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer_sessions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customer_id" integer NOT NULL, "hash" character varying(256) NOT NULL, "is_logout" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c684ecbaa67a634723776229c4c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customer_sessions"`);
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
