import { Router } from 'express';

import CategoriesController from '@modules/categories/infra/http/controllers/CategoriesController';

import showCategoryMiddleware from '@modules/categories/infra/http/middlewares/showCategoryMiddleware';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.get('/:id', showCategoryMiddleware, categoriesController.show);

export default categoriesRouter;
