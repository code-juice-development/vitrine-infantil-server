import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  keyword: string;
}

@injectable()
class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ keyword }: IRequest): Promise<Category | undefined> {
    const category = await this.categoriesRepository.findByKeyword(keyword);

    return category;
  }
}

export default ShowCategoryService;
