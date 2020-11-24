import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    users.forEach((user) => {
      // eslint-disable-next-line no-param-reassign
      delete user.password;
    });

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ id });

    delete user.password;

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, image_url, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      image_url,
      password,
    });

    delete user.password;

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, email, image_url } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    await updateUserService.execute({
      id,
      name,
      email,
      image_url,
    });

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id });

    return response.status(204).send();
  }
}

export default UsersController;
