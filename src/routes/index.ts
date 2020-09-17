import { Router } from 'express';
import surveyRouter from './surveys.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/surveys', surveyRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
