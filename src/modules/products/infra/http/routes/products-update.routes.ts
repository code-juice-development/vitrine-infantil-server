import { Router } from 'express';

import ProductsUpdateController from '@modules/products/infra/http/controllers/ProductsUpdateController';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const productsUpdateRouter = Router();

const productsUpdateController = new ProductsUpdateController();

productsUpdateRouter.use(isUserLoggedIn);

productsUpdateRouter.get('/', productsUpdateController.create);

export default productsUpdateRouter;