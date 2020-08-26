import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import ListProductsFilteredService from '@modules/products/services/ListProductsFilteredService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsFilteredService: ListProductsFilteredService;

describe('List Products Filtered Service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProductsFilteredService = new ListProductsFilteredService(fakeProductsRepository);
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
      price: '100.15',
      size: '40',
      color: 'Red',
      gender: 'Unissex',
      store_id: '123',
    });

    const productGreenShoe = await fakeProductsRepository.create({
      name: 'Red Shoe', 
      description: 'A beautiful shoe',
      image: 'www.store.com/api/greenshoe/image',
      category: 'Shoes',
      link: 'www.store.com/api/greenshoe',
      price: '80.15',
      size: '40',
      color: 'Green',
      gender: 'Unissex',
      store_id: '123',
    });

    const productBlueShoe = await fakeProductsRepository.create({
      name: 'Blue Shoe', 
      description: 'A comfortable shoe',
      image: 'www.store.com/api/blueshoe/image',
      category: 'Shoes',
      link: 'www.store.com/api/blueshoe',
      price: '20.15',
      size: '40',
      color: 'Blue',
      gender: 'Feminine',
      store_id: '123',
    });

    const productGrayShoe = await fakeProductsRepository.create({
      name: 'Gray Shoe', 
      description: 'A hard shoe',
      image: 'www.store.com/api/grayshoe/image',
      category: 'Hard Shoes',
      link: 'www.store.com/api/grayshoe',
      price: '40.15',
      size: '40',
      color: 'Gray',
      gender: 'Male',
      store_id: '123',
    });

    const nameTestResponse = await listProductsFilteredService.execute({
      page: 1,
      name: 'Yellow Shoe',
      category: '',
      description: '',
      gender: '',
      minimum_price: 0,
      maximum_price: 0,
    });

    expect(nameTestResponse.products).toContain(productYellowShoe);

    const categoryTestResponse = await listProductsFilteredService.execute({
      page: 1,
      name: '',
      category: 'Hard Shoes',
      description: '',
      gender: '',
      minimum_price: 0,
      maximum_price: 0,
    });

    expect(categoryTestResponse.products).toContain(productGrayShoe);

    const descriptionTestResponse = await listProductsFilteredService.execute({
      page: 1,
      name: '',
      category: '',
      description: 'A beautiful shoe',
      gender: '',
      minimum_price: 0,
      maximum_price: 0,
    });

    expect(descriptionTestResponse.products).toContain(productGreenShoe);

    const genderTestResponse = await listProductsFilteredService.execute({
      page: 1,
      name: '',
      category: '',
      description: '',
      gender: 'Feminine',
      minimum_price: 0,
      maximum_price: 0,
    });

    expect(genderTestResponse.products).toContain(productBlueShoe);

    const minimumPriceTestResponse = await listProductsFilteredService.execute({
      page: 1,
      name: '',
      category: '',
      description: '',
      gender: '',
      minimum_price: 100,
      maximum_price: 0,
    });

    expect(minimumPriceTestResponse.products).toContain(productRedShoe);

    const maximumPriceTestResponse = await listProductsFilteredService.execute({
      page: 1,
      name: '',
      category: '',
      description: '',
      gender: '',
      minimum_price: 0,
      maximum_price: 25,
    });

    expect(maximumPriceTestResponse.products).toContain(productBlueShoe);

    const bewteenPriceTestResponse = await listProductsFilteredService.execute({
      page: 1,
      name: '',
      category: '',
      description: '',
      gender: '',
      minimum_price: 15,
      maximum_price: 45,
    });

    expect(bewteenPriceTestResponse.products).toContain(productBlueShoe);
    expect(bewteenPriceTestResponse.products).toContain(productGrayShoe);
  });
});