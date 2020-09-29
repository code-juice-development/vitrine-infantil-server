import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let deleteCategoryService: DeleteCategoryService;

describe('Delete Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    deleteCategoryService = new DeleteCategoryService(fakeCategoriesRepository);
  });

  it('should be able to delete a Category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Camisa',
      description: 'Categoria que reune camisetas',
      keywords: 'Blusa, Blusinha, blusa, blusinha, Camiseta, camisete',
    });

    const { id } = category;

    await deleteCategoryService.execute({ id });

    const findedCategory = await fakeCategoriesRepository.findById(id);

    expect(findedCategory).toEqual(undefined);
  });
});
