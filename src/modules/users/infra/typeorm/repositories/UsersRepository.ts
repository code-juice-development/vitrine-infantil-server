import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {

  private ormRepository: Repository<User>;

  public constructor() {
    this.ormRepository = getRepository(User);
  }
  
  public async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password
    });

    await this.ormRepository.save(user);

    return user;
  }
  
  public async update({ id, email, password }: IUpdateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      id,
      email,
      password
    });

    await this.ormRepository.save(user);

    return user;
  }
  
  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.ormRepository.delete(id);

    return deleteResult.affected != null;
  }
  
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }
  
  public async findAll(): Promise<User[]> {
    const users = this.ormRepository.find() || new Array();

    return users;
  }

};

export default UsersRepository;
