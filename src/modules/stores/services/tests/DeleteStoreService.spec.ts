import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';
import FakeStoreService from '@modules/stores/repositories/fakes/FakeStoreRepository';

import DeleteStoreService from '@modules/stores/services/DeleteStoreService';

let fakeStoresRepository: FakeStoresRepository;
let deleteStoreService: DeleteStoreService;

describe('Delete Store Service', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoreService();
    deleteStoreService = new DeleteStoreService(fakeStoresRepository);
  });

  it('should be able to delete a Store', async () => {
    const store = await fakeStoresRepository.create({
      api: 'www.store.com/admin',
      link: 'www.store.com',
      name: 'Store'
    });

    const id = store.id;

    await deleteStoreService.execute({ id });

    const findStore = await fakeStoresRepository.findById(id);

    expect(findStore).toEqual(undefined);
  });
});