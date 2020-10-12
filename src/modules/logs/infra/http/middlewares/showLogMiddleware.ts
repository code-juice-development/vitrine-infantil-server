import { celebrate, Joi, Segments } from 'celebrate';

const showLogMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showLogMiddleware;
