import { celebrate, Joi, Segments } from 'celebrate';

const createUserMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    image_url: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export default createUserMiddleware;
