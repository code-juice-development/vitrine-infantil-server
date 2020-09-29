import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

import ShowCategoryFromKeywordService from '@modules/categories/services/ShowCategoryFromKeywordService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let showCategoryFromKeywordService: ShowCategoryFromKeywordService;

describe('Show Category Service', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    showCategoryFromKeywordService = new ShowCategoryFromKeywordService(
      fakeCategoriesRepository,
    );
  });

  it('should be able to show a Category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Camisa',
      description: 'Categoria que reune camisetas',
      keywords: 'Blusa, Blusinha, blusa, blusinha, Camiseta, camisete',
    });

    const findedCategory = await showCategoryFromKeywordService.execute({
      keyword: 'blusa',
    });

    expect(findedCategory).toEqual(category);
  });
});
