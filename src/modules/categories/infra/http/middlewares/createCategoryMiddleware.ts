import { celebrate, Joi, Segments } from 'celebrate';

const createCategoryMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    keywords: Joi.string().required(),
  }),
});

export default createCategoryMiddleware;
