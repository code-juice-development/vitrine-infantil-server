import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
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
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
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
    const product = await this.productsRepository.create({
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

export default CreateProductService;
