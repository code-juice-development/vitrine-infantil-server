import { container } from 'tsyringe';

import '@modules/users/providers';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';
import LogsRepository from '@modules/logs/infra/typeorm/repositories/LogsRepository';

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository';
import PromotionsRepository from '@modules/promotions/infra/typeorm/repositories/PromotionsRepository';

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository,
);
container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
container.registerSingleton<ILogsRepository>('LogsRepository', LogsRepository);
container.registerSingleton<IPromotionsRepository>(
  'PromotionsRepository',
  PromotionsRepository,
);
