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

import BullBoard from 'bull-board';
import Queue from '@shared/infra/bull/Queue';
// import Socket from '@shared/infra/socketio/Socket';

const app = express();

// const server = createServer(app);
// const socket = socketio(server);

// Socket.getInstance().registerSocket(socket);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(routes);
app.use(errors());
app.use(errorHandler);

BullBoard.setQueues(Queue.getInstance().getQueues());
app.use('/admin', BullBoard.UI);

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Served launched');
});
