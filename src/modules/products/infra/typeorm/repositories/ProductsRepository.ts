import { Repository, getRepository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    description,
    image,
    link,
    price,
    size,
    color,
    gender,
    category_id,
    store_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      image,
      link,
      price,
      size,
      color,
      gender,
      category_id,
      store_id,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async update({
    id,
    name,
    description,
    image,
    link,
    price,
    size,
    color,
    gender,
    category_id,
    store_id,
  }: IUpdateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      id,
      name,
      description,
      image,
      link,
      price,
      size,
      color,
      gender,
      category_id,
      store_id,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.ormRepository.delete(id);

    return deleteResult.affected != null;
  }

  public async deleteByStore(store_id: string): Promise<boolean> {
    const deleteResult = await this.ormRepository.delete({ store_id });

    return deleteResult.affected != null;
  }

  /**
   * Por enquanto deve retornar a Store junto, por causa da performance.
   * @param id Store ID
   */
  public async findById(id: string): Promise<Product | undefined> {
    const store = await this.ormRepository.findOne(id, {
      relations: ['store'],
    });

    return store;
  }

  public async findByFilters(
    page: number,
    name: string,
    description: string,
    gender: string,
    minimum_price: number,
    maximum_price: number,
    categories: Array<string>,
    stores: Array<string>,
  ): Promise<Product[]> {
    const queryBuilder = this.ormRepository.createQueryBuilder('product');

    queryBuilder.innerJoinAndSelect('product.category', 'category');

    if (name) {
      queryBuilder.andWhere(
        `translate(lower(product.name), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${name}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (description) {
      queryBuilder.andWhere(
        `translate(lower(product.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${description}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (categories.length) {
      queryBuilder.andWhere('category.id IN (:...categories)', {
        categories,
      });
    }

    if (gender) {
      queryBuilder.andWhere('product.gender = :gender', { gender });
    }

    if (minimum_price) {
      queryBuilder.andWhere('product.price >= :minimum_price', {
        minimum_price,
      });
    }

    if (maximum_price) {
      queryBuilder.andWhere('product.price <= :maximum_price', {
        maximum_price,
      });
    }

    if (stores.length) {
      queryBuilder.andWhere('product.store_id IN (:...stores)', { stores });
    }

    const products = await queryBuilder
      .innerJoinAndSelect('product.store', 'store')
      .skip((page - 1) * 12)
      .take(12)
      .orderBy('product.price')
      .getMany();

    return products;
  }

  public async countByFilters(
    name: string,
    description: string,
    gender: string,
    minimum_price: number,
    maximum_price: number,
    categories: Array<string>,
    stores: Array<string>,
  ): Promise<number> {
    const queryBuilder = this.ormRepository.createQueryBuilder('product');

    queryBuilder.innerJoinAndSelect('product.category', 'category');

    if (name) {
      queryBuilder.andWhere(
        `translate(lower(product.name), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${name}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (description) {
      queryBuilder.andWhere(
        `translate(lower(product.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${description}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (categories.length) {
      queryBuilder.andWhere('category.id IN (:...categories)', {
        categories,
      });
    }

    if (gender) {
      queryBuilder.andWhere('product.gender = :gender', { gender });
    }

    if (minimum_price) {
      queryBuilder.andWhere('product.price >= :minimum_price', {
        minimum_price,
      });
    }

    if (maximum_price) {
      queryBuilder.andWhere('product.price <= :maximum_price', {
        maximum_price,
      });
    }

    if (stores.length) {
      queryBuilder.andWhere('product.store_id IN (:...stores)', { stores });
    }

    const count = await queryBuilder.getCount();

    return count;
  }

  public async findAll(): Promise<Product[]> {
    const products = (await this.ormRepository.find()) || [];

    return products;
  }
}

export default ProductsRepository;
