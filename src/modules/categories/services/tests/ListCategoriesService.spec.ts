import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

import ListCategoriesService from '@modules/categories/services/ListCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoriesService: ListCategoriesService;

describe('List Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new ListCategoriesService(fakeCategoriesRepository);
  });

  it('should be able to list all Categories', async () => {
    const categoryCamisa = await fakeCategoriesRepository.create({
      name: 'Camisa',
      description: 'Categoria que reune camisetas',
      keywords: 'Blusa, Blusinha, blusa, blusinha, Camiseta, camisete',
    });

    const categoryCalca = await fakeCategoriesRepository.create({
      name: 'Calça',
      description: 'Categoria que reune calças',
      keywords: 'Calça, calça, Calção, calção',
    });

    const categories = await listCategoriesService.execute();

    expect(categories).toContain(categoryCamisa);
    expect(categories).toContain(categoryCalca);
  });
});
