import request from 'supertest';
import { getConnection } from 'typeorm';

import createConnection from '../../src/database';
import app from '../../src/app';
import { UserFactory } from '../factories';

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
        const userFactory: UserFactory = new UserFactory();
        const user = await userFactory.create({
            password: '123123'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123123'
        });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const userFactory: UserFactory = new UserFactory();
        const user = await userFactory.create({
            password: '123123'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123456'
        });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticate', async () => {
        const userFactory: UserFactory = new UserFactory();
        const user = await userFactory.create({
            password: '123123'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123123'
        });

        expect(response.body).toHaveProperty("token");
    })

    it('should be able to access private routes when authenticated', async () => {
        const userFactory: UserFactory = new UserFactory();
        const user = await userFactory.create({
            password: '123123'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    })

    it('should not be able to access private routes without jwt token', async () => {
        const response = await request(app).get('/dashboard');

        expect(response.status).toBe(401);
    })

    it('should not be able to access private routes with invalid jwt token', async () => {
        const userFactory: UserFactory = new UserFactory();
        const user = await userFactory.create({
            password: '123123'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer 123123`);

        expect(response.status).toBe(401);
    })
});