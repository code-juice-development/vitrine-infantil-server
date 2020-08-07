import { Router } from 'express';

import StoresController from '@modules/stores/infra/http/controllers/StoresController';

const storesRouter = Router();

const storesController = new StoresController();

storesRouter.post('/', storesController.create);
storesRouter.put('/:id', storesController.update);
storesRouter.delete('/:id', storesController.delete);
storesRouter.get('/:id', storesController.show);
storesRouter.get('/', storesController.index);

export default storesRouter;