import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

import createUserMiddleware from '@modules/users/infra/http/middlewares/createUserMiddleware';
import showUserMiddleware from '@modules/users/infra/http/middlewares/showUserMiddleware';
import updateUserMiddleware from '@modules/users/infra/http/middlewares/updateUserMiddleware';
import deleteUserMiddleware from '@modules/users/infra/http/middlewares/deleteUserMiddleware';
import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', createUserMiddleware, usersController.create);

usersRouter.use(isUserLoggedIn);

usersRouter.get('/', usersController.index);
usersRouter.get('/:id', showUserMiddleware, usersController.show);
usersRouter.put('/:id', updateUserMiddleware, usersController.update);
usersRouter.delete('/:id', deleteUserMiddleware, usersController.delete);

export default usersRouter;
