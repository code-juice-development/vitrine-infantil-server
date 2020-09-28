import { celebrate, Joi, Segments } from 'celebrate';

const deleteCategoryMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default deleteCategoryMiddleware;
