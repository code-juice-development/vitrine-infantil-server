import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateUserService from '@modules/users/services/UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;

describe('Update Users Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserService = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update a User', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      image_url: '',
      password: 'adm@123',
    });

    const updateUser = await updateUserService.execute({
      id: user.id,
      name: 'John Ruan',
      email: 'johnruan@example.com',
      image_url: '',
    });

    expect(updateUser.id).toBe(user.id);
    expect(updateUser.name).toBe('John Ruan');
    expect(updateUser.email).toBe('johnruan@example.com');
  });
});
