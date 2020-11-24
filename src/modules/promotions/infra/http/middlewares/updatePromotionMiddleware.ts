import { celebrate, Joi, Segments } from 'celebrate';

const updatePromotionMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    coupon: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
    store_id: Joi.string().uuid().required(),
  }),
});

export default updatePromotionMiddleware;
