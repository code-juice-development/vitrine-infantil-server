import { celebrate, Joi, Segments } from 'celebrate';

const deletePromotionMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default deletePromotionMiddleware;
