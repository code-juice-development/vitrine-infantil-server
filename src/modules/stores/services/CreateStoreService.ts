import { inject, injectable } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import Store from '@modules/stores/infra/typeorm/entities/Store';

interface IRequest {

  name: string;

  api: string;

  link: string;

};

@injectable()
class CreateStoreService {

  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  public async execute({name, api, link}: IRequest): Promise<Store> {
    const store = await this.storesRepository.create({
      name,
      api,
      link
    });

    return store;
  }

};

export default CreateStoreService;
