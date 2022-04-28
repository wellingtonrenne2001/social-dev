import { usersRoutes } from '@modules/users/infra/http/routes/usersRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);

export { routes };
