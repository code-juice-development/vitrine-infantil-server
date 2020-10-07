import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';

import ListStoresService from '@modules/stores/services/ListStoresService';

let fakeStoresRepository: FakeStoresRepository;
let listStoresService: ListStoresService;

describe('List Store Service', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    listStoresService = new ListStoresService(fakeStoresRepository);
  });

  it('should be able to list all Stores', async () => {
    const storeDream = await fakeStoresRepository.create({
      name: 'Dream',
      commission: 5,
      link: 'www.dream.com',
      api: 'www.dream.com/admin',
    });

    const storeSweet = await fakeStoresRepository.create({
      name: 'Sweet',
      commission: 5,
      link: 'www.sweet.com',
      api: 'www.sweet.com/admin',
    });

    const stores = await listStoresService.execute();

    expect(stores).toContain(storeDream);
    expect(stores).toContain(storeSweet);
  });
});
