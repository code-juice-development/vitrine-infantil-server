import { Router } from 'express';

import StoresController from '@modules/stores/infra/http/controllers/StoresController';

import showStoreMiddleware from '@modules/stores/infra/http/middlewares/showStoreMiddleware';

const storesRouter = Router();

const storesController = new StoresController();

storesRouter.get('/', storesController.index);
storesRouter.get('/:id', showStoreMiddleware, storesController.show);

export default storesRouter;
