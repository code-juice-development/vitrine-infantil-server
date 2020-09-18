import { celebrate, Joi, Segments } from 'celebrate';

const createStoreMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
    api: Joi.string().required(),
  }),
});

export default createStoreMiddleware;
