import { Request, Response } from 'express';

class SessionController {
    async store(req: Request, res: Response){
        return res.json({
            status: 200
        });
    }
}

export { SessionController };