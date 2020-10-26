import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Queue from '@shared/infra/bull/Queue';

import CreateStoreService from '@modules/stores/services/CreateStoreService';
import UpdateStoreService from '@modules/stores/services/UpdateStoreService';
import DeleteStoreService from '@modules/stores/services/DeleteStoreService';
import ListStoresFilteredService from '@modules/stores/services/ListStoresFilteredService';
import ShowStoreService from '@modules/stores/services/ShowStoreService';

class StoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, commission, api, link } = request.body;

    const createStoreService = container.resolve(CreateStoreService);

    const store = await createStoreService.execute({
      name,
      commission,
      api,
      link,
    });

    await Queue.getInstance().add('UpdateProductFromStore', { store }, null);

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

    await Queue.getInstance().add('UpdateProductFromStore', { store }, null);

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStoreService = container.resolve(DeleteStoreService);

    await deleteStoreService.execute({ id });

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, page } = request.query;

    const listStoresFilteredService = container.resolve(
      ListStoresFilteredService,
    );

    const { total, stores } = await listStoresFilteredService.execute({
      name: String(name ?? ''),
      page: Number(page ?? 0),
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(stores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStoreService = container.resolve(ShowStoreService);

    const store = await showStoreService.execute({ id });

    return response.json(store);
  }
}

export default StoresController;
