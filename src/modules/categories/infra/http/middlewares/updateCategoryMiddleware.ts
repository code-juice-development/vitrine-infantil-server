import { celebrate, Joi, Segments } from 'celebrate';

const updateCategoryMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    keywords: Joi.string().required(),
  }),
});

export default updateCategoryMiddleware;
