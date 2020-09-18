import { celebrate, Joi, Segments } from 'celebrate';

const showProductMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showProductMiddleware;
