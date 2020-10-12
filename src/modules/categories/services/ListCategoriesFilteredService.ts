import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  name: string;

  page: number;
}

interface IResponse {
  total: number;

  categories: Category[];
}

@injectable()
class ListCategoriesFilteredService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, page }: IRequest): Promise<IResponse> {
    const {
      total,
      categories,
    } = await this.categoriesRepository.findByNameWithPagination(name, page);

    return { total, categories };
  }
}

export default ListCategoriesFilteredService;
