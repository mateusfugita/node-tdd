import { Factory } from '@linnify/typeorm-factory';
import faker from 'faker';

import { User } from '../src/app/models/User';

class UserFactory extends Factory<User>{
    entity = User;

    name = faker.name.findName();
    email = faker.internet.email();
    password = faker.internet.password();
}

export { UserFactory };