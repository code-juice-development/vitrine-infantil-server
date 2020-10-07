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
      name: 'Dream',
      commission: 5,
      link: 'www.dream.com',
      api: 'www.dream.com/admin',
    });

    const updatedStore = await updateStoreService.execute({
      id: store.id,
      name: 'Store',
      commission: 5,
      link: 'www.store.com',
      api: 'www.store.com/admin',
    });

    expect(updatedStore.id).toBe(store.id);
    expect(updatedStore.api).toBe('www.store.com/admin');
    expect(updatedStore.link).toBe('www.store.com');
    expect(updatedStore.name).toBe('Store');
  });
});
