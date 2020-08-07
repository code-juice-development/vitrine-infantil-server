import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {

  id: string;

};

@injectable()
class DeleteProductService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ id }: IRequest) {
    await this.productsRepository.delete(id);
  }

};

export default DeleteProductService;
