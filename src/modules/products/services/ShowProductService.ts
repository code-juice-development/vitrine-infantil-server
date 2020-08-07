import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {

  id: string;

};

@injectable()
class ShowProductService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if(!product) {
      throw new AppError("Não encontrado Produto com o ID informado");
    }

    return product;
  }
  
};

export default ShowProductService;
