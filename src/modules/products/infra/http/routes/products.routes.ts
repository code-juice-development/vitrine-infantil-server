import { Router } from 'express';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';

import showProductMiddleware from '@modules/products/infra/http/middlewares/showProductMiddleware';
import createProductMiddleware from '@modules/products/infra/http/middlewares/createProductMiddleware';
import updateProductMiddleware from '@modules/products/infra/http/middlewares/updateProductMiddleware';
import deleteProductMiddleware from '@modules/products/infra/http/middlewares/deleteProductMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.use(isUserLoggedIn);

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', showProductMiddleware, productsController.show);
productsRouter.post('/', createProductMiddleware, productsController.create);
productsRouter.put('/:id', updateProductMiddleware, productsController.update);
productsRouter.delete('/:id', deleteProductMiddleware, productsController.delete);

export default productsRouter;
