import { Router } from 'express';

import PromotionsController from '@modules/promotions/infra/http/controllers/PromotionsController';

import showPromotionMiddleware from '@modules/promotions/infra/http/middlewares/showPromotionMiddleware';

const promotionsRouter = Router();

const promotionsController = new PromotionsController();

promotionsRouter.get('/', promotionsController.index);
promotionsRouter.get(
  '/:id',
  showPromotionMiddleware,
  promotionsController.show,
);

export default promotionsRouter;
