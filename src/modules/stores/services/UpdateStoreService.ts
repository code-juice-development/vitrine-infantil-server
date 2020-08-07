import { inject, injectable } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

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

  public async execute({id, name, api, link}: IRequest) {
    await this.storesRepository.update({
      id,
      name,
      api,
      link
    });
  }

};

export default UpdateStoreService;
