import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';

import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {

  id: string;

  name: string;

  description: string;

  image: string;

  category: string;

  link: string;

  price: string;

  size: string;

  color: string;

  gender: string;

  store_id: string;

};

@injectable()
class UpdateProductService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ id, name, description, image, category, link, price, size, color, gender, store_id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.update({
      id,
      name, 
      description,
      image,
      category,
      link,
      price,
      size,
      color,
      gender,
      store_id,
    });

    return product;
  }

};

export default UpdateProductService;
