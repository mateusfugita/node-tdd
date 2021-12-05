import { Router } from 'express';
import { SessionController } from './app/controllers/SessionController';

const routes = Router();
const sessionController = new SessionController();

routes.post('/sessions', sessionController.store);
routes.get('/sessions', (req, res) => {
    return res.json({
        message: 'BAL'
    });
})

export { routes };