import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
import IUpdateStoreDTO from '@modules/stores/dtos/IUpdateStoreDTO';

import Store from '@modules/stores/infra/typeorm/entities/Store';

export interface IStoresWithCount {
  total: number;
  stores: Store[];
}

interface IStoresRepository {
  create(data: ICreateStoreDTO): Promise<Store>;

  update(data: IUpdateStoreDTO): Promise<Store>;

  delete(id: string): Promise<boolean>;

  findById(id: string): Promise<Store | undefined>;

  findByNameWithPagination(
    name: string,
    page: number,
  ): Promise<IStoresWithCount>;

  findAll(): Promise<Store[]>;
}

export default IStoresRepository;
