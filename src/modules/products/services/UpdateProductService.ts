import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {

  id: string;

  name: string;

  description: string;

  image: string;

  category: string;

  price: number;

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

  public async execute({ id, name, description, image, category, price, size, color, gender, store_id }: IRequest) {
    await this.productsRepository.update({
      id,
      name, 
      description,
      image,
      category,
      price,
      size,
      color,
      gender,
      store_id,
    });
  }

};

export default UpdateProductService;
