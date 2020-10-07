import { v4 } from 'uuid';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
import IUpdateStoreDTO from '@modules/stores/dtos/IUpdateStoreDTO';

import Store from '@modules/stores/infra/typeorm/entities/Store';

class FakeStoresRepository implements IStoresRepository {
  private stores: Store[] = [];

  public async create({
    name,
    commission,
    api,
    link,
  }: ICreateStoreDTO): Promise<Store> {
    const store = new Store();

    Object.assign(store, { id: v4() }, { name, commission, api, link });

    this.stores.push(store);

    return store;
  }

  public async update({
    id,
    name,
    commission,
    api,
    link,
  }: IUpdateStoreDTO): Promise<Store> {
    const store = this.stores.find((storeFind) => storeFind.id === id);

    Object.assign(store, { name, commission, api, link });

    return store ?? new Store();
  }

  public async delete(id: string): Promise<boolean> {
    const findIndex = this.stores.findIndex((store) => store.id === id);

    this.stores.splice(findIndex, 1);

    return true;
  }

  public async findById(id: string): Promise<Store | undefined> {
    const store = this.stores.find((storeFind) => storeFind.id === id);

    return store;
  }

  public async findAll(): Promise<Store[]> {
    return this.stores;
  }
}

export default FakeStoresRepository;
