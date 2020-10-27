import '@config/dotenv';
import 'reflect-metadata';

import express from 'express';
// import { createServer } from 'http';
// import socketio from 'socket.io';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';

import routes from '@shared/infra/http/routes/';
import errorHandler from '@shared/infra/http/middlewares/errorHandler';

// import Socket from '@shared/infra/socketio/Socket';

const app = express();

// const server = createServer(app);
// const socket = socketio(server);

// Socket.getInstance().registerSocket(socket);

app.use(express.json());
app.use(cors({ origin: process.env.CROSS_ORIGIN }));
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Served launched');
});
