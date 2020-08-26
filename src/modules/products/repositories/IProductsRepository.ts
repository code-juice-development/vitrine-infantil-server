import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IProductsRepository {

  create(data: ICreateProductDTO): Promise<Product>;

  update(data: IUpdateProductDTO): Promise<Product>;

  delete(id: string): Promise<boolean>;

  deleteByStore(store_id: string): Promise<boolean>

  findById(id: string): Promise<Product | undefined>;

  findByFilters(page: number, name: string, description: string, category: string, gender: string, minimum_price: number, maximum_price: number): Promise<Product[]>;

  countByFilters(name: string, description: string, category: string, gender: string, minimum_price: number, maximum_price: number): Promise<number>;

  findAll(): Promise<Product[]>;

};

export default IProductsRepository;
