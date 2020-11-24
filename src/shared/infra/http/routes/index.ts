import { Router } from 'express';

import BullBoard from 'bull-board';
import Queue from '@shared/infra/bull/Queue';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import storesRouter from '@modules/stores/infra/http/routes/stores.routes';
import storesPublicRouter from '@modules/stores/infra/http/routes/stores-public.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import categoriesPublicRouter from '@modules/categories/infra/http/routes/categories-public.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productsPublicRouter from '@modules/products/infra/http/routes/products-public.routes';
import productsUpdateRouter from '@modules/products/infra/http/routes/products-update.routes';
import logsRouter from '@modules/logs/infra/http/routes/logs.routes';
import promotionsRouter from '@modules/promotions/infra/http/routes/promotions.routes';
import promotionsPublicRouter from '@modules/promotions/infra/http/routes/promotions-public.routes';

const routes = Router();

/** @description Public Routes */
routes.use('/stores-public', storesPublicRouter);
routes.use('/categories-public', categoriesPublicRouter);
routes.use('/products-public', productsPublicRouter);
routes.use('/promotions-public', promotionsPublicRouter);

BullBoard.setQueues(Queue.getInstance().getQueues());
routes.use('/admin', BullBoard.UI);

/** @description Private Routes */
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/stores', storesRouter);
routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/products-update', productsUpdateRouter);
routes.use('/logs', logsRouter);
routes.use('/promotions', promotionsRouter);

export default routes;
