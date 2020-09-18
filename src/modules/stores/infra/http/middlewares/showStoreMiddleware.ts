import { celebrate, Joi, Segments } from 'celebrate';

const showStoreMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showStoreMiddleware;
