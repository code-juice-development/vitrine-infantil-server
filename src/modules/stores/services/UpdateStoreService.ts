import { inject, injectable } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import Store from '@modules/stores/infra/typeorm/entities/Store';

interface IRequest {
  id: string;

  name: string;

  commission: number;

  api: string;

  link: string;
}

@injectable()
class UpdateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
    id,
    name,
    commission,
    api,
    link,
  }: IRequest): Promise<Store> {
    const store = await this.storesRepository.update({
      id,
      name,
      commission,
      api,
      link,
    });

    return store;
  }
}

export default UpdateStoreService;
