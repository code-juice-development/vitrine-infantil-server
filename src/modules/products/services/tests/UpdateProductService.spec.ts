import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import UpdateProductService from '@modules/products/services/UpdateProductService';

let fakeProductsRepository: FakeProductsRepository;
let updateProductService: UpdateProductService;

describe('Update Product Service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    updateProductService = new UpdateProductService(fakeProductsRepository);
  });

  it('should be able to list update a Product', async () => {
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

    const updatedProduct = await updateProductService.execute({
      id: product.id,
      name: 'Red Shoe',
      description: 'A comfortable shoe',
      image: 'www.store.com/api/redshoe/image',
      link: 'www.store.com/api/redshoe',
      price: '80.15',
      size: '40',
      color: 'Red',
      gender: 'Unissex',
      category_id: '6655',
      store_id: '5566',
    });

    expect(updatedProduct.id).toBe(product.id);
    expect(updatedProduct.name).toContain('Red Shoe');
    expect(updatedProduct.description).toContain('A comfortable shoe');
    expect(updatedProduct.image).toContain('www.store.com/api/redshoe/image');
    expect(updatedProduct.link).toContain('www.store.com/api/redshoe');
    expect(updatedProduct.price).toContain('80.15');
    expect(updatedProduct.size).toContain('40');
    expect(updatedProduct.color).toContain('Red');
    expect(updatedProduct.gender).toContain('Unissex');
    expect(updatedProduct.category_id).toContain('6655');
    expect(updatedProduct.store_id).toContain('5566');
  });
});
