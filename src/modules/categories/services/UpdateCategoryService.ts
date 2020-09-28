import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  id: string;

  name: string;

  description: string;

  keywords: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    keywords,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.update({
      id,
      name,
      description,
      keywords,
    });

    return category;
  }
}

export default UpdateCategoryService;
