import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1753084497295 implements MigrationInterface {
    name = 'CreateUsersTable1753084497295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('pending', 'in-progress', 'done')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "category" character varying NOT NULL, "endDate" date, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'pending', "ownerId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks_collaborators_users" ("tasksId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_574c627ea3fceac2f83aaf22e17" PRIMARY KEY ("tasksId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91e7c6af5ba22cce7d4180e7f8" ON "tasks_collaborators_users" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a92317c347ea9fa9060088602" ON "tasks_collaborators_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_607de52438268ab19a406349427" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_collaborators_users" ADD CONSTRAINT "FK_91e7c6af5ba22cce7d4180e7f8c" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks_collaborators_users" ADD CONSTRAINT "FK_5a92317c347ea9fa90600886023" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_collaborators_users" DROP CONSTRAINT "FK_5a92317c347ea9fa90600886023"`);
        await queryRunner.query(`ALTER TABLE "tasks_collaborators_users" DROP CONSTRAINT "FK_91e7c6af5ba22cce7d4180e7f8c"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_607de52438268ab19a406349427"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a92317c347ea9fa9060088602"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91e7c6af5ba22cce7d4180e7f8"`);
        await queryRunner.query(`DROP TABLE "tasks_collaborators_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
    }

}
