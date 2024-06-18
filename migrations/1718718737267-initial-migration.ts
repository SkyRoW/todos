import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1718718737267 implements MigrationInterface {
    name = 'InitialMigration1718718737267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "creatorId" uuid NOT NULL, CONSTRAINT "PK_1a5448d48035763b9dbab86555b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_list_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "freeText" character varying NOT NULL, "deadline" TIMESTAMP NOT NULL, "state" character varying NOT NULL DEFAULT 'ACTIVE', "creatorId" uuid NOT NULL, "todoListId" uuid NOT NULL, CONSTRAINT "PK_740364e8d14a8a5afd4b535bbc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_collaborated_lists_todo_list" ("userId" uuid NOT NULL, "todoListId" uuid NOT NULL, CONSTRAINT "PK_ef5e56ee10e9c4a7dfebc0d6826" PRIMARY KEY ("userId", "todoListId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac6f79c660e40c8c987eff856e" ON "user_collaborated_lists_todo_list" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97c18cb414be4bf14ab7aefd03" ON "user_collaborated_lists_todo_list" ("todoListId") `);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD CONSTRAINT "FK_68bfe5055b386be43e93721dd5c" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD CONSTRAINT "FK_41bfc8c6c49df4c63d75eafcbe3" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" ADD CONSTRAINT "FK_58e4863915b2dec1e85b7dce3c9" FOREIGN KEY ("todoListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_collaborated_lists_todo_list" ADD CONSTRAINT "FK_ac6f79c660e40c8c987eff856e0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_collaborated_lists_todo_list" ADD CONSTRAINT "FK_97c18cb414be4bf14ab7aefd03e" FOREIGN KEY ("todoListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_collaborated_lists_todo_list" DROP CONSTRAINT "FK_97c18cb414be4bf14ab7aefd03e"`);
        await queryRunner.query(`ALTER TABLE "user_collaborated_lists_todo_list" DROP CONSTRAINT "FK_ac6f79c660e40c8c987eff856e0"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP CONSTRAINT "FK_58e4863915b2dec1e85b7dce3c9"`);
        await queryRunner.query(`ALTER TABLE "todo_list_item" DROP CONSTRAINT "FK_41bfc8c6c49df4c63d75eafcbe3"`);
        await queryRunner.query(`ALTER TABLE "todo_list" DROP CONSTRAINT "FK_68bfe5055b386be43e93721dd5c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97c18cb414be4bf14ab7aefd03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac6f79c660e40c8c987eff856e"`);
        await queryRunner.query(`DROP TABLE "user_collaborated_lists_todo_list"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "todo_list_item"`);
        await queryRunner.query(`DROP TABLE "todo_list"`);
    }

}
