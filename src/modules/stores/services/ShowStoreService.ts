import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import Store from '@modules/stores/infra/typeorm/entities/Store';

interface IRequest {

  id: string;

};

@injectable()
class ShowStoreService {

  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Store> {
    const store = await this.storesRepository.findById(id);

    if(!store) {
      throw new AppError("Não encontrada Loja com o ID informado");
    }

    return store;
  }

};

export default ShowStoreService;
