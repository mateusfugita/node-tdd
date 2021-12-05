import bcrypt from 'bcryptjs';
import { getConnection } from 'typeorm';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../src/app/repositories/UserRepository';
import createConnection from '../../src/database';

describe('User', () => {
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

    it('should encrypt user password', async () => {
        const userRepo = getCustomRepository(UserRepository);
        const user = userRepo.create({
            name: 'Dean',
            email: 'dean@example.com',
            password: '123456'
        });
        await userRepo.save(user);

        const compareHash = await bcrypt.compare('123456', user.password_hash);

        expect(compareHash).toBe(true);
    })
})