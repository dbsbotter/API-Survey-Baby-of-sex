import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableCheck,
  TableForeignKey,
} from 'typeorm';

export default class CreateSurvey1600348252058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'surveys',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'person_name',
            type: 'varchar',
          },
          {
            name: 'pick',
            type: 'varchar',
            length: '1',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createCheckConstraint(
      'surveys',
      new TableCheck({
        name: 'CK_Surveys_Pick',
        columnNames: ['pick'],
        expression: 'pick = "M" OR pick = "F"',
      }),
    );

    await queryRunner.createForeignKey(
      'surveys',
      new TableForeignKey({
        name: 'FK_Survey_User',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('surveys', 'FK_Survey_User');

    await queryRunner.dropCheckConstraint('surveys', 'CK_Surveys_Pick');

    await queryRunner.dropTable('surveys');
  }
}
