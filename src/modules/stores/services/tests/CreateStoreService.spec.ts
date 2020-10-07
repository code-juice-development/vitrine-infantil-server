import FakeStoreService from '@modules/stores/repositories/fakes/FakeStoreRepository';

import CreateStoreService from '@modules/stores/services/CreateStoreService';

let fakeStoresRepository: FakeStoreService;
let createStoreService: CreateStoreService;

describe('Create Store Service', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoreService();
    createStoreService = new CreateStoreService(fakeStoresRepository);
  });

  it('should be able to create a new Store', async () => {
    const store = await createStoreService.execute({
      name: 'Store',
      commission: 5,
      link: 'www.store.com/admin',
      api: 'www.store.com/admin',
    });

    expect(store).toHaveProperty('id');
  });
});
