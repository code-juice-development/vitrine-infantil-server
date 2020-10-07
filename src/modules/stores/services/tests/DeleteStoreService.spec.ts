import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';

import DeleteStoreService from '@modules/stores/services/DeleteStoreService';

let fakeStoresRepository: FakeStoresRepository;
let deleteStoreService: DeleteStoreService;

describe('Delete Store Service', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    deleteStoreService = new DeleteStoreService(fakeStoresRepository);
  });

  it('should be able to delete a Store', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Store',
      commission: 5,
      link: 'www.store.com',
      api: 'www.store.com/admin',
    });

    const { id } = store;

    await deleteStoreService.execute({ id });

    const findStore = await fakeStoresRepository.findById(id);

    expect(findStore).toEqual(undefined);
  });
});
