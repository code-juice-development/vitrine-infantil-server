import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import ListProductsService from '@modules/products/services/ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsService: ListProductsService;

describe('List Products Service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProductsService = new ListProductsService(fakeProductsRepository);
  });

  it('should be able to list all Products', async () => {
    const productYellowShoe = await fakeProductsRepository.create({
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

    const productRedShoe = await fakeProductsRepository.create({
      name: 'Red Shoe',
      description: 'A comfortable shoe',
      image: 'www.store.com/api/redshoe/image',
      category: 'Shoes',
      link: 'www.store.com/api/redshoe',
      price: '80.15',
      size: '40',
      color: 'Red',
      gender: 'Unissex',
      store_id: '123',
    });

    const products = await listProductsService.execute();

    expect(products).toContain(productYellowShoe);
    expect(products).toContain(productRedShoe);
  });
});
