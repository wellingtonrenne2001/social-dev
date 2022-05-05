import uploadConfig from '@config/uploadConfig';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import multer from 'multer';
import { UsersController } from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();

const upload = multer(uploadConfig.multer);

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

usersRoutes.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().optional(),
      username: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(8).max(16).optional(),
    },
  }),
  isAuthenticated,
  usersController.update,
);

usersRoutes.patch('/avatar', isAuthenticated, upload.single('avatar'), usersController.updateAvatar);

export { usersRoutes };
