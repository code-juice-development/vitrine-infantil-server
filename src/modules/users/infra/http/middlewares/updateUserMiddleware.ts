import { celebrate, Joi, Segments } from 'celebrate';

const updateUserMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    image_url: Joi.string().required(),
  }),
});

export default updateUserMiddleware;
