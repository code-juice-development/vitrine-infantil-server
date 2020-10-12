import { inject, injectable } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import Store from '@modules/stores/infra/typeorm/entities/Store';

interface IRequest {
  name: string;

  page: number;
}

interface IResponse {
  total: number;

  stores: Store[];
}

@injectable()
class ListStoresFilteredService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({ name, page }: IRequest): Promise<IResponse> {
    const {
      total,
      stores,
    } = await this.storesRepository.findByNameWithPagination(name, page);

    return { total, stores };
  }
}

export default ListStoresFilteredService;
