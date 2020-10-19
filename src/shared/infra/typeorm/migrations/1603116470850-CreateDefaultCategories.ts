import { MigrationInterface, QueryRunner } from 'typeorm';

import Category from '@modules/categories/infra/typeorm/entities/Category';

export class CreateDefaultCategories1603116470850
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoriesRepository = queryRunner.manager.getRepository(Category);

    const categories: Category[] = [];

    categories.push(
      categoriesRepository.create({
        name: 'Blusas',
        description: 'Blusas em geral',
        keywords: 'Blusas, Camisas, Camisetas, Polos, Regatas, Camisa Polo',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Calças',
        description: 'Calças em geral',
        keywords:
          'Calças, Leggings, Capris, Skinnys, Pantacourts, Pantalonas, Cigarretes, Boyfriends, Flares',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Bermudas',
        description: 'Bermudas em geral',
        keywords: 'Bermudas, Shorts',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Conjuntos',
        description: 'Conjuntos em geral',
        keywords: 'Conjuntos',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Casacos',
        description: 'Casacos em geral',
        keywords: 'Casacos, Jaquestas, Casacos/Jaquetas',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Vestidos',
        description: 'Vestidos em geral',
        keywords: 'Vestidos',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Saias',
        description: 'Saias em geral',
        keywords: 'Saias',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Bodys',
        description: 'Bodys em geral',
        keywords: 'Bodys, Kit Body',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Croppeds',
        description: 'Croppeds em geral',
        keywords: 'Croppeds',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Macacões',
        description: 'Macacões em geral',
        keywords: 'Macacão, Macacões',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Blazers',
        description: 'Blazers em geral',
        keywords: 'Blazers',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Kimono',
        description: 'Kimonos em geral',
        keywords: 'Kimonos',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Pijamas',
        description: 'Pijamas em geral',
        keywords: 'Pijamas',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Pantufas',
        description: 'Pantufas em geral',
        keywords: 'Pantufas',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Meias',
        description: 'Meias em geral',
        keywords: 'Meias',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Cuecas',
        description: 'Cuecas em geral',
        keywords: 'Cuecas',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Calcinhas',
        description: 'Calcinhas em geral',
        keywords: 'Calcinhas',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Capas de Chuva',
        description: 'Capas de chuva em geral',
        keywords: 'Capa de Chuva',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Variedades - Meninas',
        description: 'Variedades de produtos para meninas',
        keywords: 'Meninas',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Variedades - Meninos',
        description: 'Variedades de produtos para meninos',
        keywords: 'Meninos',
      }),
    );

    categories.push(
      categoriesRepository.create({
        name: 'Variedades - Adultos',
        description: 'Variedades de produtos para adultos',
        keywords: 'Adultos',
      }),
    );

    categoriesRepository.save(categories);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const categoriesRepository = queryRunner.manager.getRepository(Category);

    const categories = [
      'Blusas',
      'Calças',
      'Bermudas',
      'Conjuntos',
      'Casacos',
      'Vestidos',
      'Saias',
      'Bodys',
      'Croppeds',
      'Macacões',
      'Blazers',
      'Kimono',
      'Pijamas',
      'Pantufas',
      'Meias',
      'Cuecas',
      'Calcinhas',
      'Capas de Chuva',
      'Variedades - Meninas',
      'Variedades - Meninos',
      'Variedades - Adultos',
    ];

    categories.forEach(async (category) => {
      await categoriesRepository.delete({
        name: category,
      });
    });
  }
}
