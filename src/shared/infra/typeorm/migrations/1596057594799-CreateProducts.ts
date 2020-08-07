import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProducts1596057594799 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'description',
              type: 'varchar',
            },
            {
              name: 'image',
              type: 'varchar',
            },
            {
              name: 'category',
              type: 'varchar',
            },
            {
              name: 'price',
              type: 'float',
            },
            {
              name: 'size',
              type: 'varchar',
            },
            {
              name: 'color',
              type: 'varchar',
            },
            {
              name: 'gender',
              type: 'varchar',
            },
            {
              name: 'store_id',
              type: 'uuid',
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
            }
          ]
        })
      );

      await queryRunner.createForeignKey('products', new TableForeignKey({
        columnNames: ['store_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products');
    }

}
