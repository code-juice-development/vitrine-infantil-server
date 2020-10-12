import { celebrate, Joi, Segments } from 'celebrate';

const indexStoresMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    name: Joi.string().uuid().required(),
    page: Joi.number(),
  }),
});

export default indexStoresMiddleware;
