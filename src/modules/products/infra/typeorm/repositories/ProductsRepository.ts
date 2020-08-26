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
    name, description, image, category, link, price, size, color, gender, store_id 
  }: ICreateProductDTO): Promise<Product> {

    const product = this.ormRepository.create({
      name,
      description,
      image,
      category,
      link,
      price, 
      size,
      color,
      gender,
      store_id
    });

    await this.ormRepository.save(product);

    return product;
  }
  
  public async update({ 
    id, name, description, image, category, link, price, size, color, gender, store_id 
  }: IUpdateProductDTO): Promise<Product> {

    const product = this.ormRepository.create({
      id,
      name,
      description,
      image,
      category,
      link,
      price, 
      size,
      color,
      gender,
      store_id
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

  public async findById(id: string): Promise<Product | undefined> {
    const store = await this.ormRepository.findOne(id);

    return store;
  }

  public async findByFilters(page: number, name: string, description: string, category: string, gender: string, minimum_price: number, maximum_price: number): Promise<Product[]> {
    const queryBuilder = this.ormRepository.createQueryBuilder('product');

    if(name) {
      queryBuilder.andWhere(
        `translate(lower(product.name), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${name}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`
      );
    }

    if(description) {
      queryBuilder.andWhere(
        `translate(lower(product.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${description}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`
      );
    }

    if(category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if(gender) {
      queryBuilder.andWhere('product.gender = :gender', { gender });
    }

    if(minimum_price) {
      queryBuilder.andWhere('product.price >= :minimum_price', { minimum_price });
    }
    
    if(maximum_price) {
      queryBuilder.andWhere('product.price <= :maximum_price', { maximum_price });
    }

    const products = await queryBuilder
      .orderBy('product.price')
      .limit(10)
      .offset((page - 1) * 10)
      .getMany();

    return products;
  }

  public async countByFilters(name: string, description: string, category: string, gender: string, minimum_price: number, maximum_price: number): Promise<number> {
    const queryBuilder = this.ormRepository.createQueryBuilder('product');

    if(name) {
      queryBuilder.andWhere(
        `translate(lower(product.name), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${name}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`
      );
    }

    if(description) {
      queryBuilder.andWhere(
        `translate(lower(product.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${description}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`
      );
    }

    if(category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if(gender) {
      queryBuilder.andWhere('product.gender = :gender', { gender });
    }

    if(minimum_price) {
      queryBuilder.andWhere('product.price >= :minimum_price', { minimum_price });
    }
    
    if(maximum_price) {
      queryBuilder.andWhere('product.price <= :maximum_price', { maximum_price });
    }

    const count = await queryBuilder.getCount();

    return count;
  }

  public async findAll(): Promise<Product[]> {
    const stores = await this.ormRepository.find() || new Array();

    return stores;
  }

}

export default ProductsRepository;
