import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  id: string;

  name: string;

  description: string;

  image: string;

  link: string;

  price: string;

  size: string;

  color: string;

  gender: string;

  category_id: string;

  store_id: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    image,
    link,
    price,
    size,
    color,
    gender,
    category_id,
    store_id,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.update({
      id,
      name,
      description,
      image,
      link,
      price,
      size,
      color,
      gender,
      category_id,
      store_id,
    });

    return product;
  }
}

export default UpdateProductService;
