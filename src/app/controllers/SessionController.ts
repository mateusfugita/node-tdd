import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class SessionController {
    async store(req: Request, res: Response){
        const { email, password } = req.body;

        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findOne({
            email
        });

        if(!user){
            return res.status(401).json({ message: 'User not found' });
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ message: 'Incorrect password'});
        }

        return res.json({
            user
        });
    }
}

export { SessionController };