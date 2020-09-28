import { celebrate, Joi, Segments } from 'celebrate';

const showCategoryMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showCategoryMiddleware;
