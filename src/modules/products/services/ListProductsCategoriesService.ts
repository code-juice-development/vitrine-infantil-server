import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

@injectable()
class ListProductsCategoriesService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<string[]> {
    const categories = await this.productsRepository.findCategories();

    return categories;
  }
}

export default ListProductsCategoriesService;
