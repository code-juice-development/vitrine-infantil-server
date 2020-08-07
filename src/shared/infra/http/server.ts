import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import '@config/dotenv';
import '@shared/infra/typeorm';
import '@shared/container';

import routes from '@shared/infra/http/routes/';
import errorHandler from '@shared/infra/http/middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(`🚀 Served launched on port ${process.env.APP_PORT}`);
});