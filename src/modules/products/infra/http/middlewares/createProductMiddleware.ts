import { celebrate, Joi, Segments } from 'celebrate';

const createProductMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    link: Joi.string().required(),
    price: Joi.number().required(),
    size: Joi.string().required(),
    color: Joi.string().required(),
    gender: Joi.string().required(),
    store_id: Joi.string().uuid().required(),
  })
});

export default createProductMiddleware;
