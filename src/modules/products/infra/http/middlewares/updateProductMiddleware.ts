import { celebrate, Joi, Segments } from 'celebrate';

const updateProductMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    link: Joi.string().required(),
    price: Joi.number().required(),
    size: Joi.string().required(),
    color: Joi.string().required(),
    gender: Joi.string().required(),
    category_id: Joi.string().required(),
    store_id: Joi.string().uuid().required(),
  }),
});

export default updateProductMiddleware;
