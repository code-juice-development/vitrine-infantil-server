import { Router } from 'express';

import CategoriesController from '@modules/categories/infra/http/controllers/CategoriesController';

import showCategoryMiddleware from '@modules/categories/infra/http/middlewares/showCategoryMiddleware';
import createCategoryMiddleware from '@modules/categories/infra/http/middlewares/createCategoryMiddleware';
import updateCategoryMiddleware from '@modules/categories/infra/http/middlewares/updateCategoryMiddleware';
import deleteCategoryMiddleware from '@modules/categories/infra/http/middlewares/deleteCategoryMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.use(isUserLoggedIn);

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.get('/:id', showCategoryMiddleware, categoriesController.show);
categoriesRouter.post(
  '/',
  createCategoryMiddleware,
  categoriesController.create,
);
categoriesRouter.put(
  '/:id',
  updateCategoryMiddleware,
  categoriesController.update,
);
categoriesRouter.delete(
  '/:id',
  deleteCategoryMiddleware,
  categoriesController.delete,
);

export default categoriesRouter;
