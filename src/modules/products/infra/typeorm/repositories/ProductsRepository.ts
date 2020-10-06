import {
  Repository,
  getRepository,
  // SelectQueryBuilder,
  // getManager,
} from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';
// import Store from '@modules/stores/infra/typeorm/entities/Store';

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
    ordenation: string,
    name: string,
    description: string,
    gender: string,
    minimum_price: number,
    maximum_price: number,
    categories: Array<string>,
    stores: Array<string>,
  ): Promise<Product[]> {
    const queryBuilder = this.ormRepository.createQueryBuilder('product');

    if (name) {
      queryBuilder.andWhere(
        `translate(lower(product.name), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
          '%'||translate(lower('${queryBuilder.escape(
            name,
          )}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (description) {
      queryBuilder.andWhere(
        `translate(lower(product.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
          '%'||translate(lower('${queryBuilder.escape(
            description,
          )}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (categories.length) {
      queryBuilder.andWhere('product.category IN (:...categories)', {
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

    queryBuilder.innerJoinAndSelect('products.category', 'category');

    const products = [] as Product[];

    await queryBuilder
      .innerJoinAndSelect('products.store', 'store')
      .skip((page - 1) * 12)
      .take(12)
      .orderBy(`products.${ordenation || 'price'}`)
      .getMany();

    return products;
  }

  /*
  public async findByFilters(
    page: number,
    ordenation: string,
    name: string,
    description: string,
    gender: string,
    minimum_price: number,
    maximum_price: number,
    categories: Array<string>,
    stores: Array<string>,
  ): Promise<Product[]> {
    if (!stores || stores.length === 0) {
      const ormRepositoryStore = getRepository(Store);

      // eslint-disable-next-line no-param-reassign
      stores = ((await ormRepositoryStore.find()) || []).map((store) => {
        return String(store.id);
      });
    }

    const sqlUnionStore: string[] = [];

    stores.forEach(async (store_id) => {
      const sqlUnion = this.getSubQueryFindByFilters(
        store_id,
        ordenation,
        name,
        description,
        gender,
        minimum_price,
        maximum_price,
        categories,
      ).getSql();

      sqlUnionStore.push(sqlUnion);
    });

    const limit = 12;
    const offset = (page - 1) * 12;

    const results = await getManager().query(`
      select origem.id,
             origem.name,
             origem.description,
             origem.image,
             origem.link,
             origem.price,
             origem.size,
             origem.color,
             origem.gender
        from (${sqlUnionStore.join('\n union all \n')}) as origem
       order by origem.number, origem.${ordenation || 'price'}
       limit ${limit}
      offset ${offset}
    `);

    console.log(results);

    // const queryBuilder = this.ormRepository.createQueryBuilder('products');

    // queryBuilder.innerJoinAndSelect('products.category', 'category');

    const products = [] as Product[];

    // await queryBuilder
    //   .innerJoinAndSelect('products.store', 'store')
    //   .skip((page - 1) * 12)
    //   .take(12)
    //   .orderBy(`products.${ordenation || 'price'}`)
    //   .getMany();

    return products;
  }
  */

  /*
  private getSubQueryFindByFilters(
    store_id: string,
    ordenation: string,
    name: string,
    description: string,
    gender: string,
    minimum_price: number,
    maximum_price: number,
    categories: Array<string>,
  ): SelectQueryBuilder<Product> {
    //   const queryBuilder = this.ormRepository.createQueryBuilder('product');

    //   const sql = `
    //   select row_number() over (order by product.price) as number,
    //          product.id,
    //          product.name,
    //          product.description,
    //          product.image,
    //          product.link,
    //          product.price,
    //          product.size,
    //          product.color,
    //          product.gender,
    //    where product.store_id = '${store_id}'
    // `;

    const queryBuilder = this.ormRepository.createQueryBuilder('product');

    queryBuilder.addSelect(
      'row_number() over (order by product.price) as number',
    );

    queryBuilder.andWhere(
      `product.store_id = ${queryBuilder.escape(store_id)}`,
    );

    if (name) {
      queryBuilder.andWhere(
        `translate(lower(product.name), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
          '%'||translate(lower('${queryBuilder.escape(
            name,
          )}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (description) {
      queryBuilder.andWhere(
        `translate(lower(product.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
          '%'||translate(lower('${queryBuilder.escape(
            description,
          )}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (categories.length) {
      queryBuilder.andWhere(
        `category.id IN (${queryBuilder.escape(categories.join(','))})`,
      );
    }

    if (gender) {
      queryBuilder.andWhere(`product.gender = ${queryBuilder.escape(gender)}`);
    }

    if (minimum_price) {
      queryBuilder.andWhere(
        `product.price >= ${queryBuilder.escape(String(minimum_price))}`,
      );
    }

    if (maximum_price) {
      queryBuilder.andWhere(
        `product.price <= ${queryBuilder.escape(String(maximum_price))}`,
      );
    }

    return queryBuilder;
  }
  */

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
          '%'||translate(lower('${queryBuilder.escape(
            name,
          )}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
      );
    }

    if (description) {
      queryBuilder.andWhere(
        `translate(lower(product.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
          '%'||translate(lower('${queryBuilder.escape(
            description,
          )}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
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
