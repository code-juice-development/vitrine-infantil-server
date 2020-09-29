import AppError from '@shared/errors/AppError';

import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

import ShowCategoryService from '@modules/categories/services/ShowCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let showCategoryService: ShowCategoryService;

describe('Show Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    showCategoryService = new ShowCategoryService(fakeCategoriesRepository);
  });

  it('should be able to show a Category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Camisa',
      description: 'Categoria que reune camisetas',
      keywords: 'Blusa, Blusinha, blusa, blusinha, Camiseta, camisete',
    });

    const { id } = category;

    const findedCategory = await showCategoryService.execute({ id });

    expect(findedCategory).toEqual(category);
  });

  it('should not be able to show a nonexistent Category', async () => {
    expect(
      showCategoryService.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
