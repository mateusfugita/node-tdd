import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
    "type": "sqlite",
    "database": process.env.DB_NAME,
    "migrations": ["./src/database/migrations/**.ts"],
    "entities": ["./src/app/models/**.{js,ts}"],
    "logging": false,
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}