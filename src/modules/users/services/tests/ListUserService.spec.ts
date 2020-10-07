import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListUserService from '@modules/users/services/ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUserService: ListUserService;

describe('List Users Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUserService = new ListUserService(fakeUsersRepository);
  });

  it('should be able to list all Users', async () => {
    const userJohnDoe = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      image_url: '',
      password: 'adm@123',
    });

    const userJohnDue = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      image_url: '',
      password: 'adm@321',
    });

    const users = await listUserService.execute();

    expect(users).toContain(userJohnDoe);
    expect(users).toContain(userJohnDue);
  });
});
