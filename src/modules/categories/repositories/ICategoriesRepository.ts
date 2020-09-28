import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '@modules/categories/dtos/IUpdateCategoryDTO';

import Category from '@modules/categories/infra/typeorm/entities/Category';

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;

  update(data: IUpdateCategoryDTO): Promise<Category>;

  delete(id: string): Promise<boolean>;

  findById(id: string): Promise<Category | undefined>;

  findByKeyword(keyword: string): Promise<Category | undefined>;

  findAll(): Promise<Category[]>;
}

export default ICategoriesRepository;
