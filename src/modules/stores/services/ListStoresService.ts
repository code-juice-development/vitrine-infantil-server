import { inject, injectable } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import Store from '@modules/stores/infra/typeorm/entities/Store';

@injectable()
class ListStoresService {

  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  public async execute(): Promise<Store[]> {
    const stores = await this.storesRepository.findAll();

    return stores;
  }

};

export default ListStoresService;
