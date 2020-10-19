import {
  Repository,
  getRepository,
  SelectQueryBuilder,
  getManager,
} from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';
import Store from '@modules/stores/infra/typeorm/entities/Store';
import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IProductFetch {
  product_id: string;
  product_name: string;
  product_description: string;
  product_image: string;
  product_link: string;
  product_price: string;
  product_size: string;
  product_color: string;
  product_gender: string;
  category_id: string;
  category_name: string;
  category_description: string;
  category_keywords: string;
  store_id: string;
  store_name: string;
  store_comission: number;
  store_link: string;
  store_api: string;
}

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

  public async findByFilters_old(
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

    queryBuilder.innerJoinAndSelect('product.category', 'category');
    queryBuilder.innerJoinAndSelect('product.store', 'store');

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

    if (categories.length) {
      queryBuilder.andWhere('product.category_id IN (:...categories)', {
        categories,
      });
    }

    if (stores.length) {
      queryBuilder.andWhere('product.store_id IN (:...stores)', { stores });
    }

    const products = await queryBuilder
      .skip((page - 1) * 12)
      .take(12)
      .orderBy(`product.${ordenation || 'price'}`)
      .getMany();

    return products;
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
    const ormRepositoryStore = getRepository(Store);

    const queryBuilderStore = ormRepositoryStore.createQueryBuilder('store');

    if (stores && stores.length) {
      queryBuilderStore.where('store.id IN (:...stores)', {
        stores,
      });
    }

    queryBuilderStore.orderBy('store.commission', 'DESC');

    const storeSearch = await queryBuilderStore.getMany();

    // Se não houveram Stores cadastradas
    if (storeSearch.length === 0) return [];

    const sqlUnionStore: string[] = [];

    storeSearch.forEach(async ({ id: store_id }) => {
      const sqlUnion = `(${this.getSubQueryFindByFilters(
        store_id,
        ordenation,
        name,
        description,
        gender,
        minimum_price,
        maximum_price,
        categories,
      ).getSql()})`;

      sqlUnionStore.push(sqlUnion);
    });

    const limit = 12;
    const offset = (page - 1) * 12;

    const results = await getManager().query(`
      select *
        from (${sqlUnionStore.join('\n union all \n')}) as origem
       order by origem.product_line ASC, 
                origem.store_commission DESC
       limit ${limit}
      offset ${offset}
    `);

    const products: Product[] = [];

    results.forEach((element: IProductFetch) => {
      const product = getManager().create(Product, {
        id: element.product_id,
        name: element.product_name,
        description: element.product_description,
        image: element.product_image,
        link: element.product_link,
        price: element.product_price,
        size: element.product_size,
        color: element.product_color,
        gender: element.product_gender,
      });

      product.category = getManager().create(Category, {
        id: element.category_id,
        name: element.category_name,
        description: element.category_description,
        keywords: element.category_keywords,
      });

      product.store = getManager().create(Store, {
        id: element.store_id,
        name: element.store_name,
        commission: element.store_comission,
        link: element.store_link,
        api: element.store_api,
      });

      products.push(product);
    });

    return products;
  }

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
    const queryBuilder = this.ormRepository.createQueryBuilder('product');

    queryBuilder.addSelect(
      'row_number() over (order by product.price) as product_line',
    );

    queryBuilder.innerJoinAndSelect('product.category', 'category');
    queryBuilder.innerJoinAndSelect('product.store', 'store');

    queryBuilder.andWhere(`product.store_id = '${store_id}'`);

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
      queryBuilder.andWhere(
        `category.id IN (${categories
          .map((category) => `'${category}'`)
          .join(',')})`,
      );
    }

    if (gender) {
      queryBuilder.andWhere(`product.gender = '${gender}'`);
    }

    if (minimum_price) {
      queryBuilder.andWhere(`product.price >= ${String(minimum_price)}`);
    }

    if (maximum_price) {
      queryBuilder.andWhere(`product.price <= ${String(maximum_price)}`);
    }

    queryBuilder.orderBy(`product.${ordenation || 'price'}`);

    return queryBuilder;
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

    if (categories.length) {
      queryBuilder.andWhere('product.category_id IN (:...categories)', {
        categories,
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
