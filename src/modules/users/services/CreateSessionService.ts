import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {

  email: string;

  password: string;

}

interface IResponse {

  user: User;

  token: string;

}

@injectable()
class CreateSessionService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('Email e/ou Senha incorreto', 401);
    }

    const isPasswordMatch = await compare(password, String(user.password));

    if(!isPasswordMatch) {
      throw new AppError('Email e/ou Senha incorreto', 401);
    }

    const token = sign({}, String(process.env.SECRET), {
      subject: user.id,
      expiresIn: '30d'
    });

    return {
      user,
      token
    };
  }

};

export default CreateSessionService;
