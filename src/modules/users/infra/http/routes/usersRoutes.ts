import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import { UsersController } from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
    },
  }),
  usersController.create,
);

usersRoutes.get(
  '/:username',
  celebrate({
    [Segments.PARAMS]: {
      username: Joi.string().required(),
    },
  }),
  usersController.show,
);

export { usersRoutes };
