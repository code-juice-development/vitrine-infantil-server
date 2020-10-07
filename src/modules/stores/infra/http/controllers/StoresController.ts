import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListStoresService from '@modules/stores/services/ListStoresService';
import CreateStoreService from '@modules/stores/services/CreateStoreService';
import UpdateStoreService from '@modules/stores/services/UpdateStoreService';
import DeleteStoreService from '@modules/stores/services/DeleteStoreService';
import ShowStoreService from '@modules/stores/services/ShowStoreService';

import Queue from '@shared/infra/bull/Queue';

class StoresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStoresService = container.resolve(ListStoresService);

    const stores = await listStoresService.execute();

    return response.json(stores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStoreService = container.resolve(ShowStoreService);

    const store = await showStoreService.execute({ id });

    return response.json(store);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, commission, api, link } = request.body;

    const createStoreService = container.resolve(CreateStoreService);

    const store = await createStoreService.execute({
      name,
      commission,
      api,
      link,
    });

    Queue.getInstance().add('UpdateProductFromStore', { store }, null);

    return response.status(201).json(store);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, commission, api, link } = request.body;

    const updateStoreService = container.resolve(UpdateStoreService);

    const store = await updateStoreService.execute({
      id,
      name,
      commission,
      api,
      link,
    });

    Queue.getInstance().add('UpdateProductFromStore', { store }, null);

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStoreService = container.resolve(DeleteStoreService);

    await deleteStoreService.execute({ id });

    return response.status(204).send();
  }
}

export default StoresController;
