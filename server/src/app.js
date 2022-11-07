import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

import routers from './routers/index.js';
app.use('/', routers);

// import socket from './socket.js';
// socket(io);

export default app;