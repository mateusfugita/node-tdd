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

    afterEach(async () => {
        const entities = getConnection().entityMetadatas;

        for (const entity of entities) {
            const repository = getConnection().getRepository(entity.name); // Get repository
            await repository.clear(); // Clear each entity table's content
        }
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
            password: '123123'
        });
        await userRepo.save(user);

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123123'
        });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const userRepo = getCustomRepository(UserRepository);
        const user = userRepo.create({
            name: 'Dean',
            email: 'dean@example.com',
            password: '123123'
        });
        await userRepo.save(user);

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123456'
        });

        expect(response.status).toBe(401);
    } )
});