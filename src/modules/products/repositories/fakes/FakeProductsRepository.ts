import { v4 } from 'uuid';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    description,
    image,
    category,
    link,
    price,
    size,
    color,
    gender,
    store_id,
  }: ICreateProductDTO): Promise<Product> {
    const store = new Product();

    Object.assign(
      store,
      { id: v4() },
      {
        name,
        description,
        image,
        category,
        link,
        price,
        size,
        color,
        gender,
        store_id,
      },
    );

    this.products.push(store);

    return store;
  }

  public async update({
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
    store_id,
  }: IUpdateProductDTO): Promise<Product> {
    const product = this.products.find((productFind) => productFind.id === id);

    Object.assign(product, {
      name,
      description,
      image,
      category,
      link,
      price,
      size,
      color,
      gender,
      store_id,
    });

    return product ?? new Product();
  }

  public async delete(id: string): Promise<boolean> {
    const findIndex = this.products.findIndex((product) => product.id === id);

    this.products.splice(findIndex, 1);

    return true;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find((productFind) => productFind.id === id);

    return product;
  }

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async deleteByStore(store_id: string): Promise<boolean> {
    this.products = this.products.filter(
      (product) => product.store_id !== store_id,
    );

    return true;
  }

  public async findByFilters(
    page: number,
    name: string,
    description: string,
    categories: string[],
    gender: string,
    minimum_price: number,
    maximum_price: number,
    stores: string[],
  ): Promise<Product[]> {
    const searchProducts = this.products.filter((product) => {
      let isValid = true;

      if (name && product.name !== name) {
        isValid = false;
      }

      if (description && product.description !== description) {
        isValid = false;
      }

      if (
        categories.length &&
        !categories.some((findCategory) => findCategory === product.category)
      ) {
        isValid = false;
      }

      if (gender && product.gender !== gender) {
        isValid = false;
      }

      if (minimum_price && Number(product.price) <= minimum_price) {
        isValid = false;
      }

      if (maximum_price && Number(product.price) >= maximum_price) {
        isValid = false;
      }

      if (
        stores.length &&
        !stores.some((findStore) => findStore === product.store.id)
      ) {
        isValid = false;
      }

      return isValid;
    });

    return searchProducts.slice((page - 1) * 10, 10);
  }

  public async countByFilters(
    name: string,
    description: string,
    categories: string[],
    gender: string,
    minimum_price: number,
    maximum_price: number,
    stores: string[],
  ): Promise<number> {
    const searchProducts = this.products.filter((product) => {
      let isValid = true;

      if (name && product.name !== name) {
        isValid = false;
      }

      if (description && product.description !== description) {
        isValid = false;
      }

      if (
        categories.length &&
        !categories.some((findCategory) => findCategory === product.category)
      ) {
        isValid = false;
      }

      if (gender && product.gender !== gender) {
        isValid = false;
      }

      if (minimum_price && Number(product.price) <= minimum_price) {
        isValid = false;
      }

      if (maximum_price && Number(product.price) >= maximum_price) {
        isValid = false;
      }

      if (
        stores.length &&
        !stores.some((findStore) => findStore === product.store.id)
      ) {
        isValid = false;
      }

      return isValid;
    });

    return searchProducts.length;
  }

  public async findCategories(): Promise<string[]> {
    const categories = this.products.map((product) => {
      return product.category;
    });

    return categories;
  }
}

export default FakeProductsRepository;
