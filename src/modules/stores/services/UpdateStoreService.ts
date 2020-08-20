import { inject, injectable } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import Store from '@modules/stores/infra/typeorm/entities/Store';

interface IRequest {

  id: string;

  name: string;

  api: string;

  link: string;

};

@injectable()
class UpdateStoreService {

  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  public async execute({id, name, api, link}: IRequest): Promise<Store> {
    const store = await this.storesRepository.update({
      id,
      name,
      api,
      link
    });

    return store;
  }

};

export default UpdateStoreService;
