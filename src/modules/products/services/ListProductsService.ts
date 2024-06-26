import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default ListProductsService;
