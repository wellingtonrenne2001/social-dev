import { sessionsRoutes } from '@modules/users/infra/http/routes/sessionsRoutes';
import { usersRoutes } from '@modules/users/infra/http/routes/usersRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export { routes };
