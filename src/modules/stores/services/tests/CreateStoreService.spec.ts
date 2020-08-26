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
      api: 'www.store.com/admin',
      link: 'www.store.com/admin',
      name: 'Store'
    });

    expect(store).toHaveProperty('id');
  });
});