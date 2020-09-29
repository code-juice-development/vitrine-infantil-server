import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategoryService: UpdateCategoryService;

describe('Update Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategoryService = new UpdateCategoryService(fakeCategoriesRepository);
  });

  it('should be able to delete a Category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Camisa',
      description: 'Categoria que reune camisetas',
      keywords: 'Blusa, Blusinha, blusa, blusinha, Camiseta, camisete',
    });

    const { id } = category;

    const updatedCategory = await updateCategoryService.execute({
      id,
      name: 'Calça',
      description: 'Categoria que reune calças',
      keywords: 'Calça, calça, Calção, calção',
    });

    expect(updatedCategory.name).toContain('Calça');
    expect(updatedCategory.description).toContain('Categoria que reune calças');
    expect(updatedCategory.keywords).toContain('Calça, calça, Calção, calção');
  });
});
