import AppError from '@shared/errors/AppError';

import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';

import ShowStoreService from '@modules/stores/services/ShowStoreService';

let fakeStoresRepository: FakeStoresRepository;
let showStoreService: ShowStoreService;

describe('Show Store Service', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    showStoreService = new ShowStoreService(fakeStoresRepository);
  });

  it('should be able to show Store', async () => {
    const store = await fakeStoresRepository.create({
      api: 'www.dream.com/admin',
      link: 'www.dream.com',
      name: 'Dream',
    });

    const findStore = await showStoreService.execute({ id: store.id });

    expect(store).toEqual(findStore);
  });

  it('should not be able to show a nonexistent Store', async () => {
    expect(
      showStoreService.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
