import { Router } from 'express';

import storesRouter from '@modules/stores/infra/http/routes/stores.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productsSearchRouter from '@modules/products/infra/http/routes/products-search.routes';
import productsUpdateRouter from '@modules/products/infra/http/routes/products-update.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/stores', storesRouter);
routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/products-search', productsSearchRouter);
routes.use('/products-update', productsUpdateRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
