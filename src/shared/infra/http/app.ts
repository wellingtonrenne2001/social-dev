import 'dotenv/config';
import 'reflect-metadata';
import '../typeorm';
import '@shared/container';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errors } from 'celebrate';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errors());

app.use(errorHandler);

export { app };
