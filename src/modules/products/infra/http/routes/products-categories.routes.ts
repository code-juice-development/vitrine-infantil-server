import { Router } from 'express';

import ProductsCategoriesController from '@modules/products/infra/http/controllers/ProductsCategoriesController';

const productsCategoriesRouter = Router();

const productsCategoriesController = new ProductsCategoriesController();

productsCategoriesRouter.get('/', productsCategoriesController.index);

export default productsCategoriesRouter;
