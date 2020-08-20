import { container } from 'tsyringe';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IStoresRepository>('StoresRepository', StoresRepository);
container.registerSingleton<IProductRepository>('ProductsRepository', ProductsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
