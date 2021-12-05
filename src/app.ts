import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

import 'reflect-metadata';
import express from 'express';
import createConnection from './database';
import { routes } from './routes';

createConnection();

class AppController {
    express: any;

    constructor(){
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(express.json());
    }

    routes(){
        this.express.use(routes);
    }
}

export default new AppController().express;