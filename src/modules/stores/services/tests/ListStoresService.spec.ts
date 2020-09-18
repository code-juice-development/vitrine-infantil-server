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
      api: 'www.dream.com/admin',
      link: 'www.dream.com',
      name: 'Dream',
    });

    const storeSweet = await fakeStoresRepository.create({
      api: 'www.sweet.com/admin',
      link: 'www.sweet.com',
      name: 'Sweet',
    });

    const stores = await listStoresService.execute();

    expect(stores).toContain(storeDream);
    expect(stores).toContain(storeSweet);
  });
});
