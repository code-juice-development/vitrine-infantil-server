import { celebrate, Joi, Segments } from 'celebrate';

const indexLogsMiddleware = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    content: Joi.string(),
    page: Joi.number(),
  }),
});

export default indexLogsMiddleware;
