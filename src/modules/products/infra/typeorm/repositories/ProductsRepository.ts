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
    name, description, image, category, price, size, color, gender, store_id 
  }: ICreateProductDTO): Promise<Product> {

    const product = this.ormRepository.create({
      name,
      description,
      image,
      category,
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
    id, name, description, image, category, price, size, color, gender, store_id 
  }: IUpdateProductDTO): Promise<Product> {

    const product = this.ormRepository.create({
      id,
      name,
      description,
      image,
      category,
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
    const deleteResult = await this.ormRepository.delete(store_id);

    return deleteResult.affected != null;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const store = await this.ormRepository.findOne(id);

    return store;
  }

  public async findAll(): Promise<Product[]> {
    const stores = await this.ormRepository.find() || new Array();

    return stores;
  }

}

export default ProductsRepository;
