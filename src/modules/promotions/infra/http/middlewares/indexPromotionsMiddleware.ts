import { celebrate, Joi, Segments } from 'celebrate';

const indexPromotionsMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    name: Joi.string().required(),
    page: Joi.number(),
  }),
});

export default indexPromotionsMiddleware;
