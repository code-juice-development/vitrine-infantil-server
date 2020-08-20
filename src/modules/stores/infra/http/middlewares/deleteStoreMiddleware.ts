import { celebrate, Joi, Segments } from 'celebrate';

const deleteStoreMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  })
});

export default deleteStoreMiddleware;
