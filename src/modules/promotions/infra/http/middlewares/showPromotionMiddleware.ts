import { celebrate, Joi, Segments } from 'celebrate';

const showPromotionMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showPromotionMiddleware;
