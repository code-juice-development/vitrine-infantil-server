import { celebrate, Joi, Segments } from 'celebrate';

const indexProductsMiddleware = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    categories: Joi.string().optional(),
    gender: Joi.string().optional(),
    minimum_price: Joi.number().optional(),
    maximum_price: Joi.number().optional(),
    stores: Joi.string().optional(),
    page: Joi.number().optional(),
  }),
});

export default indexProductsMiddleware;
