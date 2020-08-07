import { Router } from 'express';

import storesRouter from '@modules/stores/infra/http/routes/stores.routes';

const routes = Router();

routes.use('/stores', storesRouter);

export default routes;