import { inject, injectable } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

interface IRequest {

  id: string;

};

@injectable()
class DeleteStoreService {

  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  public async execute({ id }: IRequest) {
    await this.storesRepository.delete(id);
  }

};

export default DeleteStoreService;
