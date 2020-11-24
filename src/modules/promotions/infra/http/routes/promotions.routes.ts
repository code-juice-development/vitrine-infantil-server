import { Router } from 'express';

import PromotionsController from '@modules/promotions/infra/http/controllers/PromotionsController';

import showPromotionMiddleware from '@modules/promotions/infra/http/middlewares/showPromotionMiddleware';
import createPromotionMiddleware from '@modules/promotions/infra/http/middlewares/createPromotionMiddleware';
import updatePromotionMiddleware from '@modules/promotions/infra/http/middlewares/updatePromotionMiddleware';
import deletePromotionMiddleware from '@modules/promotions/infra/http/middlewares/deletePromotionMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const promotionsRouter = Router();

const promotionsController = new PromotionsController();

promotionsRouter.use(isUserLoggedIn);

promotionsRouter.get('/', promotionsController.index);
promotionsRouter.get(
  '/:id',
  showPromotionMiddleware,
  promotionsController.show,
);
promotionsRouter.post(
  '/',
  createPromotionMiddleware,
  promotionsController.create,
);
promotionsRouter.put(
  '/:id',
  updatePromotionMiddleware,
  promotionsController.update,
);
promotionsRouter.delete(
  '/:id',
  deletePromotionMiddleware,
  promotionsController.delete,
);

export default promotionsRouter;
