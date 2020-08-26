import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {

  page: number;

  name: string;

  description: string;
  
  category: string;
  
  gender: string;
  
  minimum_price: number;
  
  maximum_price: number;

};

interface IReponse {

  products: Product[];

  total: number;

};

@injectable()
class ListProductsFilteredService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ 
    page, name, description, category, gender, minimum_price, maximum_price
  }: IRequest): Promise<IReponse> {
    const products = await this.productsRepository.findByFilters(
      page,
      name,
      description,
      category,
      gender,
      minimum_price,
      maximum_price
    );

    const total = await this.productsRepository.countByFilters(
      name,
      description,
      category,
      gender,
      minimum_price,
      maximum_price
    );

    return {
      products,
      total
    };
  }

};

export default ListProductsFilteredService;
