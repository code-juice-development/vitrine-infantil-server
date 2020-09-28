import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  name: string;

  description: string;

  keywords: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
    description,
    keywords,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.create({
      name,
      description,
      keywords,
    });

    return category;
  }
}

export default CreateCategoryService;
