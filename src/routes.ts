import { Router } from 'express';
import authMiddleware from './app/middleware/auth';
import { SessionController } from './app/controllers/SessionController';

const routes = Router();
const sessionController = new SessionController();

routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
})

export { routes };