import { Router } from 'express';

import ProductsSearchController from '@modules/products/infra/http/controllers/ProductsSearchController';

import indexProductsPublicMiddleware from '@modules/products/infra/http/middlewares/indexProductsPublicMiddleware';
import showProductPublicMiddleware from '@modules/products/infra/http/middlewares/showProductPublicMiddleware';

const productsSearchRouter = Router();

const productsSearchController = new ProductsSearchController();

productsSearchRouter.get(
  '/',
  indexProductsPublicMiddleware,
  productsSearchController.index,
);
productsSearchRouter.get(
  '/:id',
  showProductPublicMiddleware,
  productsSearchController.show,
);

export default productsSearchRouter;
