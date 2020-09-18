import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import CreateProductService from '@modules/products/services/CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProductService: CreateProductService;

describe('Create Product Service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProductService = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a new Product', async () => {
    const product = await createProductService.execute({
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

    expect(product).toHaveProperty('id');
  });
});
