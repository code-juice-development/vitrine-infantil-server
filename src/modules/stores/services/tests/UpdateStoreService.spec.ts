import FakeStoreService from '@modules/stores/repositories/fakes/FakeStoreRepository';

import UpdateStoreService from '@modules/stores/services/UpdateStoreService';

let fakeStoresRepository: FakeStoreService;
let updateStoreService: UpdateStoreService;

describe('Create Store Service', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoreService();
    updateStoreService = new UpdateStoreService(fakeStoresRepository);
  });

  it('should be able to create a new Store', async () => {
    const store = await fakeStoresRepository.create({
      api: 'www.dream.com/admin',
      link: 'www.dream.com',
      name: 'Dream',
    });

    const updatedStore = await updateStoreService.execute({
      id: store.id,
      api: 'www.store.com/admin',
      link: 'www.store.com',
      name: 'Store',
    });

    expect(updatedStore.id).toBe(store.id);
    expect(updatedStore.api).toBe('www.store.com/admin');
    expect(updatedStore.link).toBe('www.store.com');
    expect(updatedStore.name).toBe('Store');
  });
});
