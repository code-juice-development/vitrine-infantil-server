import { container } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<IStoresRepository>('StoresRepository', StoresRepository);
container.registerSingleton<IProductRepository>('ProductsRepository', ProductsRepository);
