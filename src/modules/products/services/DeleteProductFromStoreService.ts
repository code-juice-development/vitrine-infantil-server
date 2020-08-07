import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {

  store_id: string;

}

@injectable()
class DeleteProductFromStoreService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ store_id }: IRequest) {
    await this.productsRepository.deleteByStore(store_id);
  }

};

export default DeleteProductFromStoreService;