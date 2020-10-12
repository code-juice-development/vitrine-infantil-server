import { celebrate, Joi, Segments } from 'celebrate';

const indexCategoriesMiddleware = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    name: Joi.string(),
    page: Joi.string(),
  }),
});

export default indexCategoriesMiddleware;
