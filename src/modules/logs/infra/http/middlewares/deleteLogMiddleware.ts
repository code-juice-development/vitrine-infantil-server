import { celebrate, Joi, Segments } from 'celebrate';

const deleteLogMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default deleteLogMiddleware;
