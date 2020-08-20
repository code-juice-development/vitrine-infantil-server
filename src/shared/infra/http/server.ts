import '@config/dotenv';
import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';

import routes from '@shared/infra/http/routes/';
import errorHandler from '@shared/infra/http/middlewares/errorHandler';

import BullBoard from 'bull-board';
import Queue from '@shared/infra/bull/Queue';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorHandler);

BullBoard.setQueues(Queue.getInstance().getQueues());
app.use('/admin', BullBoard.UI);

app.listen(process.env.APP_PORT, () => {
  console.log(`🚀 Served launched on port ${process.env.APP_PORT}`);
});