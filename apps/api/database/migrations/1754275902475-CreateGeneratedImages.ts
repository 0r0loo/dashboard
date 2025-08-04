import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGeneratedImages1754275902475 implements MigrationInterface {
  name = 'CreateGeneratedImages1754275902475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "generated_images" ("id" SERIAL NOT NULL, "prompt" text NOT NULL, "image_url" text NOT NULL, "status" character varying NOT NULL DEFAULT 'completed', "metadata" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1ee659109b9a66d386ba8be0319" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "generated_images"`);
  }
}
