import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import DeleteProductService from '@modules/products/services/DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let deleteProductService: DeleteProductService;

describe('Delete Product Service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    deleteProductService = new DeleteProductService(fakeProductsRepository);
  });

  it('should be able to delete a Product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Yellow Shoe',
      description: 'A comfortable shoe',
      image: 'www.store.com/api/yellowshoe/image',
      link: 'www.store.com/api/yellowshoe',
      price: '75.15',
      size: '42',
      color: 'Yellow',
      gender: 'Unissex',
      category_id: '123',
      store_id: '123',
    });

    const { id } = product;

    await deleteProductService.execute({ id });

    const findedProduct = await fakeProductsRepository.findById(id);

    expect(findedProduct).toEqual(undefined);
  });
});
