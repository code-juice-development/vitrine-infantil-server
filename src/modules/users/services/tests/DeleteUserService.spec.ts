import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import DeleteUserService from '@modules/users/services/DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('Delete User Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete a User', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      image_url: '',
      password: 'adm@123',
    });

    const { id } = user;

    await deleteUserService.execute({ id });

    const findUser = await fakeUsersRepository.findById(id);

    expect(findUser).toEqual(undefined);
  });
});
