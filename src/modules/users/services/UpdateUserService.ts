import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {

  id: string;

  email: string;

  password: string;

}

@injectable()
class UpdateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, email, password }: IRequest): Promise<User> {
    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.update({
      id,
      email,
      password: hashedPassword
    });

    return user;
  }

};

export default UpdateUserService;