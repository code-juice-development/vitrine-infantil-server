import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    image_url,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, { name, email, image_url, password });

    this.users.push(user);

    return user;
  }

  public async update({
    id,
    name,
    email,
    image_url,
  }: IUpdateUserDTO): Promise<User> {
    const user = this.users.find((userFind) => userFind.id === id);

    Object.assign(user, { id, name, email, image_url });

    return user ?? new User();
  }

  public async delete(id: string): Promise<boolean> {
    const findIndex = this.users.findIndex((userFind) => userFind.id === id);

    this.users.splice(findIndex, 1);

    return true;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((userFind) => userFind.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((userFind) => userFind.email === email);

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }
}

export default FakeUsersRepository;
