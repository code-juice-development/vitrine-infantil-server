import { Router } from 'express';

import StoresController from '@modules/stores/infra/http/controllers/StoresController';

import showStoreMiddleware from '@modules/stores/infra/http/middlewares/showStoreMiddleware';
import createStoreMiddleware from '@modules/stores/infra/http/middlewares/createStoreMiddleware';
import updateStoreMiddleware from '@modules/stores/infra/http/middlewares/updateStoreMiddleware';
import deleteStoreMiddleware from '@modules/stores/infra/http/middlewares/deleteStoreMiddleware';
import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const storesRouter = Router();

const storesController = new StoresController();

storesRouter.get('/', storesController.index);
storesRouter.get('/:id', showStoreMiddleware, storesController.show);

storesRouter.use(isUserLoggedIn);

storesRouter.post('/', createStoreMiddleware, storesController.create);
storesRouter.put('/:id', updateStoreMiddleware, storesController.update);
storesRouter.delete('/:id', deleteStoreMiddleware, storesController.delete);

export default storesRouter;
