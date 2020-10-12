import { celebrate, Joi, Segments } from 'celebrate';

const showProductPublicMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showProductPublicMiddleware;
