import { celebrate, Joi, Segments } from 'celebrate';

const updateStoreMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
    api: Joi.string().required(),
  }),
});

export default updateStoreMiddleware;
