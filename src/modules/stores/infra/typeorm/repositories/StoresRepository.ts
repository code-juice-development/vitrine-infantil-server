import { Repository, getRepository } from 'typeorm';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
import IUpdateStoreDTO from '@modules/stores/dtos/IUpdateStoreDTO';

import Store from '@modules/stores/infra/typeorm/entities/Store';

class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = getRepository(Store);
  }

  public async create({
    name,
    commission,
    api,
    link,
  }: ICreateStoreDTO): Promise<Store> {
    const store = this.ormRepository.create({
      name,
      commission,
      api,
      link,
    });

    await this.ormRepository.save(store);

    return store;
  }

  public async update({
    id,
    name,
    commission,
    api,
    link,
  }: IUpdateStoreDTO): Promise<Store> {
    const store = this.ormRepository.create({
      id,
      name,
      commission,
      api,
      link,
    });

    await this.ormRepository.save(store);

    return store;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.ormRepository.delete({ id });

    return deleteResult.affected != null;
  }

  public async findById(id: string): Promise<Store | undefined> {
    const store = await this.ormRepository.findOne(id);

    return store;
  }

  public async findAll(): Promise<Store[]> {
    const stores = (await this.ormRepository.find()) || [];

    return stores;
  }
}

export default StoresRepository;
