import { MigrationInterface, QueryRunner } from 'typeorm';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

export class CreateDefaultUser1603111392366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.manager.getRepository(User);

    const hashedPassword = await new BCryptHashProvider().generateHash('root');

    const user = usersRepository.create({
      name: 'Vitrine Infantil Shop',
      email: 'admin@vitrineinfantilshop.com',
      image_url: '',
      password: hashedPassword,
    });

    usersRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.manager.getRepository(User);

    usersRepository.delete({ email: 'admin@vitrineinfantilshop.com' });
  }
}
