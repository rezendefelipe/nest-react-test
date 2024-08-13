import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChannel1723558164591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE IF NOT EXISTS channel (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE channel;`);
  }
}
