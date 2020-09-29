import { Router } from 'express';

import ProductsSearchController from '@modules/products/infra/http/controllers/ProductsSearchController';

import indexProductMiddleware from '@modules/products/infra/http/middlewares/indexProductsMiddleware';
import showProductMiddleware from '@modules/products/infra/http/middlewares/showProductMiddleware';

const productsSearchRouter = Router();

const productsSearchController = new ProductsSearchController();

productsSearchRouter.get(
  '/',
  indexProductMiddleware,
  productsSearchController.index,
);
productsSearchRouter.get(
  '/:id',
  showProductMiddleware,
  productsSearchController.show,
);

export default productsSearchRouter;
