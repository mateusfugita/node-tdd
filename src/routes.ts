import { Router } from 'express';
import { SessionController } from './app/controllers/SessionController';

const routes = Router();
const sessionController = new SessionController();

routes.post('/sessions', sessionController.store);

export { routes };