import { celebrate, Joi, Segments } from 'celebrate';

/** Use only on Filtered Index, on ProductsSearchController */
const indexProductsMiddleware = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().optional(),
    ordenation: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    categories: Joi.string().optional(),
    gender: Joi.string().optional(),
    minimum_price: Joi.number().optional(),
    maximum_price: Joi.number().optional(),
    stores: Joi.string().optional(),
  }),
});

export default indexProductsMiddleware;
