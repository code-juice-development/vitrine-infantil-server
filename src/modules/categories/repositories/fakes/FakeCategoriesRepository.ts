import { v4 } from 'uuid';

import ICategoriesRepository, {
  ICategoriesWithCount,
} from '@modules/categories/repositories/ICategoriesRepository';

import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '@modules/categories/dtos/IUpdateCategoryDTO';

import Category from '@modules/categories/infra/typeorm/entities/Category';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async create({
    name,
    description,
    keywords,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4() }, { name, description, keywords });

    this.categories.push(category);

    return category;
  }

  public async update({
    id,
    name,
    description,
    keywords,
  }: IUpdateCategoryDTO): Promise<Category> {
    const category = this.categories.find(
      (categoryFind) => categoryFind.id === id,
    );

    Object.assign(category, { name, description, keywords });

    return category ?? new Category();
  }

  public async delete(id: string): Promise<boolean> {
    this.categories = this.categories.filter((category) => category.id !== id);

    return true;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(
      (categoryFind) => categoryFind.id === id,
    );

    return category;
  }

  public async findByKeyword(keyword: string): Promise<Category | undefined> {
    const category = this.categories.find((categoryFind) =>
      categoryFind.keywords.includes(keyword),
    );

    return category;
  }

  public async findByNameWithPagination(
    name: string,
    page: number,
  ): Promise<ICategoriesWithCount> {
    const categories = this.categories.filter(
      (actualCategory) => !(name && actualCategory.name !== name),
    );

    return {
      total: categories.length,
      categories: categories.slice((page - 1) * 10, 1),
    };
  }

  public async findAll(): Promise<Category[]> {
    return this.categories;
  }
}

export default FakeCategoriesRepository;
