import request from 'supertest';
import { getConnection } from 'typeorm';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../src/app/repositories/UserRepository';
import createConnection from '../../src/database';
import app from '../../src/app';

describe('Authentication', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it('should authenticate with valid credentials', async () => {
        const userRepo = getCustomRepository(UserRepository);
        const user = userRepo.create({
            name: 'Dean',
            email: 'dean@example.com',
            password_hash: '123123'
        });
        await userRepo.save(user);

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123456'
        });

        expect(response.status).toBe(200);
    });
});