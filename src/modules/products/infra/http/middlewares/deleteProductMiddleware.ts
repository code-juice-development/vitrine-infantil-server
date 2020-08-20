import { celebrate, Joi, Segments } from 'celebrate';

const deleteProductMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  })
});

export default deleteProductMiddleware;
