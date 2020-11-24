import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  id: string;

  name: string;

  email: string;

  image_url: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    image_url,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.update({
      id,
      name,
      email,
      image_url,
    });

    return user;
  }
}

export default UpdateUserService;
