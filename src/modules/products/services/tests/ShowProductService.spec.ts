import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import ShowProductService from '@modules/products/services/ShowProductService';

let fakeProductsRepository: FakeProductsRepository;
let showProductService: ShowProductService;

describe('Show Product Service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    showProductService = new ShowProductService(fakeProductsRepository);
  });

  it('should be able to show a Product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Yellow Shoe',
      description: 'A comfortable shoe',
      image: 'www.store.com/api/yellowshoe/image',
      category: 'Shoes',
      link: 'www.store.com/api/yellowshoe',
      price: '75.15',
      size: '42',
      color: 'Yellow',
      gender: 'Unissex',
      store_id: '123',
    });

    const findedProduct = await showProductService.execute({ id: product.id });

    expect(findedProduct).toEqual(product);
  });

  it('should not be able to show a nonexistent Product', async () => {
    expect(
      showProductService.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
