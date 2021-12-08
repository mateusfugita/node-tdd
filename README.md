# Node.js TDD
API developed using TDD (test-driven development) in Node.js and Typescript.

## Tests
- **Unit test:** test pure functions (only use the resources from the programming language), it doesn't touch in side effects (things that could go wrong) and, for the same input variables, it should return the same values.
- **Integration test:** test funcionalities that could call APIs, operate with the database (CRUD operations), among other features, and it can have side effects
### How to create tests using TDD?
- Create a test and run it (it will fail)
- Develop your function to pass your test (it doesn't matter if the funcionality you created at this time is correct or not)
- Create new tests to invalidate what you did before
- Continue to develop your function until the funcionality is complete and covered by the tests (all tests passes)

## Technologies
- Node.js
- Typescript
- TypeORM
- SQLite
- JWT
- Jest
- Factory
- Faker

## Configuration
1. Create a .env file based on the .env.test file
```
$ cp .env.test .env
```

2. Modify the file with the database name and path from your SQLite database.

## Running app
1. Install the dependencies
```
$ yarn install
```

2. Run the app
```
$ yarn run dev
```

3. If you want to run the tests, run:
```
$ yarn test
```
