import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLinkBitlySurvey1600688454953
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'surveys',
      new TableColumn({
        name: 'url_bitly',
        type: 'varchar',
        length: '500',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('surveys', 'url_bitly');
  }
}
