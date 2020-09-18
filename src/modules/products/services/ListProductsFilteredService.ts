import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  page: number;

  name: string;

  description: string;

  categories: string[];

  gender: string;

  minimum_price: number;

  maximum_price: number;

  stores: string[];
}

interface IReponse {
  products: Product[];

  total: number;
}

@injectable()
class ListProductsFilteredService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    page,
    name,
    description,
    categories,
    gender,
    minimum_price,
    maximum_price,
    stores,
  }: IRequest): Promise<IReponse> {
    const products = await this.productsRepository.findByFilters(
      page,
      name,
      description,
      categories,
      gender,
      minimum_price,
      maximum_price,
      stores,
    );

    const total = await this.productsRepository.countByFilters(
      name,
      description,
      categories,
      gender,
      minimum_price,
      maximum_price,
      stores,
    );

    return {
      products,
      total,
    };
  }
}

export default ListProductsFilteredService;
