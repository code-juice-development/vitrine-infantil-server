import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import DeleteProductFromStoreService from '@modules/products/services/DeleteProductFromStoreService';

let fakeProductsRepository: FakeProductsRepository;
let deleteProductFromStoreService: DeleteProductFromStoreService;

describe('Delete Product Service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    deleteProductFromStoreService = new DeleteProductFromStoreService(
      fakeProductsRepository,
    );
  });

  it('should be able to delete all Products from the Store', async () => {
    const store_id = '123';

    await fakeProductsRepository.create({
      name: 'Yellow Shoe',
      description: 'A comfortable shoe',
      image: 'www.store.com/api/yellowshoe/image',
      category: 'Shoes',
      link: 'www.store.com/api/yellowshoe',
      price: '75.15',
      size: '42',
      color: 'Yellow',
      gender: 'Unissex',
      store_id,
    });

    await fakeProductsRepository.create({
      name: 'Red Shoe',
      description: 'A comfortable shoe',
      image: 'www.store.com/api/redshoe/image',
      category: 'Shoes',
      link: 'www.store.com/api/redshoe',
      price: '80.15',
      size: '40',
      color: 'Red',
      gender: 'Unissex',
      store_id,
    });

    await deleteProductFromStoreService.execute({ store_id });

    const findedProducts = await fakeProductsRepository.findAll();

    expect(findedProducts.length).toBe(0);
  });
});
