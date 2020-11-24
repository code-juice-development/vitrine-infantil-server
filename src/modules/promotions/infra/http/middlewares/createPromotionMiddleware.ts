import { celebrate, Joi, Segments } from 'celebrate';

const createPromotionMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    coupon: Joi.string().required(),
    description: Joi.string().required(),
    link: Joi.string().required(),
    store_id: Joi.string().uuid().required(),
  }),
});

export default createPromotionMiddleware;
