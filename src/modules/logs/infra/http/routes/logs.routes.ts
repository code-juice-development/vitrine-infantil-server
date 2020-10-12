import { Router } from 'express';

import LogsController from '@modules/logs/infra/http/controllers/LogsController';

import indexLogsMiddlewares from '@modules/logs/infra/http/middlewares/indexLogsMiddlewares';
import showLogMiddleware from '@modules/logs/infra/http/middlewares/showLogMiddleware';
import deleteLogMiddleware from '@modules/logs/infra/http/middlewares/deleteLogMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const logsRouter = Router();

const logsController = new LogsController();

logsRouter.use(isUserLoggedIn);

logsRouter.get('/', indexLogsMiddlewares, logsController.index);
logsRouter.get('/:id', showLogMiddleware, logsController.show);
logsRouter.delete('/:id', deleteLogMiddleware, logsController.delete);

export default logsRouter;
