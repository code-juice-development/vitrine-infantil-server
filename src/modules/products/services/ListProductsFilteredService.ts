import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  page: number;

  ordenation: string;

  name: string;

  description: string;

  gender: string;

  minimum_price: number;

  maximum_price: number;

  categories: string[];

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
    ordenation,
    name,
    description,
    gender,
    minimum_price,
    maximum_price,
    categories,
    stores,
  }: IRequest): Promise<IReponse> {
    const products = await this.productsRepository.findByFilters(
      page,
      ordenation,
      name,
      description,
      gender,
      minimum_price,
      maximum_price,
      categories,
      stores,
    );

    const total = await this.productsRepository.countByFilters(
      name,
      description,
      gender,
      minimum_price,
      maximum_price,
      categories,
      stores,
    );

    return {
      products,
      total,
    };
  }
}

export default ListProductsFilteredService;
