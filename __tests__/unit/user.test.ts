import bcrypt from 'bcryptjs';
import { getConnection } from 'typeorm';

import createConnection from '../../src/database';
import { UserFactory } from '../factories';

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
        const userFactory: UserFactory = new UserFactory();
        const user = await userFactory.create({
            password: '123456'
        });

        const compareHash = await bcrypt.compare('123456', user.password_hash);

        expect(compareHash).toBe(true);
    })
})