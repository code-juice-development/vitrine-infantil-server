import { celebrate, Joi, Segments } from 'celebrate';

const indexProductsMiddleware = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    name: Joi.string(),
    page: Joi.string(),
  }),
});

export default indexProductsMiddleware;
