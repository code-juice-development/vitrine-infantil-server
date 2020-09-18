import { Router } from 'express';

import storesRouter from '@modules/stores/infra/http/routes/stores.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productsCategoriesRouter from '@modules/products/infra/http/routes/products-categories.routes';
import productsUpdateRouter from '@modules/products/infra/http/routes/products-update.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/stores', storesRouter);
routes.use('/products', productsRouter);
routes.use('/products-categories', productsCategoriesRouter);
routes.use('/products-update', productsUpdateRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
