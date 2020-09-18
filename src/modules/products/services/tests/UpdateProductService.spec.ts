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
      category: 'Shoes',
      link: 'www.store.com/api/yellowshoe',
      price: '75.15',
      size: '42',
      color: 'Yellow',
      gender: 'Unissex',
      store_id: '123',
    });

    const updatedProduct = await updateProductService.execute({
      id: product.id,
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

    expect(updatedProduct.id).toBe(product.id);
    expect(updatedProduct.name).toContain('Red Shoe');
    expect(updatedProduct.description).toContain('A comfortable shoe');
    expect(updatedProduct.image).toContain('www.store.com/api/redshoe/image');
    expect(updatedProduct.category).toContain('Shoes');
    expect(updatedProduct.link).toContain('www.store.com/api/redshoe');
    expect(updatedProduct.price).toContain('80.15');
    expect(updatedProduct.size).toContain('40');
    expect(updatedProduct.color).toContain('Red');
    expect(updatedProduct.gender).toContain('Unissex');
    expect(updatedProduct.store_id).toContain('123');
  });
});
