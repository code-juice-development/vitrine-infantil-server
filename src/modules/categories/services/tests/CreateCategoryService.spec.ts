import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;

describe('Create Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(fakeCategoriesRepository);
  });

  it('should be able to create a new Category', async () => {
    const product = await createCategoryService.execute({
      name: 'Camisa',
      description: 'Categoria que reune camisetas',
      keywords: 'Blusa, Blusinha, blusa, blusinha, Camiseta, camisete',
    });

    expect(product).toHaveProperty('id');
  });
});
