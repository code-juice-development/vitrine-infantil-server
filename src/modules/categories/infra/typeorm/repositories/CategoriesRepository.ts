import { Repository, getRepository, Like } from 'typeorm';

import ICategoriesRepository, {
  ICategoriesWithCount,
} from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '@modules/categories/dtos/IUpdateCategoryDTO';

import Category from '@modules/categories/infra/typeorm/entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({
    name,
    description,
    keywords,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
      description,
      keywords,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async update({
    id,
    name,
    description,
    keywords,
  }: IUpdateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      id,
      name,
      description,
      keywords,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.ormRepository.delete(id);

    return deleteResult.affected !== null;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id);

    return category;
  }

  public async findByKeyword(keyword: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      keywords: Like(`%${keyword}%`),
    });

    return category;
  }

  public async findByNameWithPagination(
    name: string,
    page: number,
  ): Promise<ICategoriesWithCount> {
    const queryBuilder = this.ormRepository.createQueryBuilder();

    if (name) {
      queryBuilder.where({
        name: Like(`%${name}%`),
      });
    }

    queryBuilder.orderBy('name');

    const total = await queryBuilder.getCount();

    if (page) {
      queryBuilder.skip((page - 1) * 10).take(10);
    }

    const categories = (await queryBuilder.getMany()) || [];

    return { total, categories };
  }

  public async findAll(): Promise<Category[]> {
    const categories = (await this.ormRepository.find()) || [];

    return categories;
  }
}

export default CategoriesRepository;
