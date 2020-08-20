import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

interface IUsersRepository {

  create(data: ICreateUserDTO): Promise<User>;

  update(data: IUpdateUserDTO): Promise<User>;

  delete(id: string): Promise<boolean>;

  findById(id: string): Promise<User | undefined>;
  
  findByEmail(email: string): Promise<User | undefined>;

  findAll(): Promise<User[]>;

};

export default IUsersRepository;
