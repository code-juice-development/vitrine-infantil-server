import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  id: string;
}

@injectable()
class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Não foi encontrada Categoria com o ID informado');
    }

    return category;
  }
}

export default ShowCategoryService;
