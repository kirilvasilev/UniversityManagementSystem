import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import * as HttpStatus from 'http-status-codes';

import UserRouter from './routes/UserRouter';
import CourseRouter from './routes/CourseRouter';
import AuthRouter from './routes/AuthRouter'
import {
    LogLevel,
    log
} from './logger/ILogger';
//import IndexRouter from './routes/IndexRouter';

class Server {

    public app: express.Application;
    /**
     *
     */
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        //expressHTTP2Workaround({ express:express, http2:http2, app:this.app });
    }

    public config() {
        // set up mongoose
        const MONGO_URI = 'mongodb://localhost/ums';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI).then(
            () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
                log(`Connected to MongoDB at ${MONGO_URI || process.env.MONGODB_URI}!`)
                // mongoose.connection.collections['users'].drop( (err) =>
                //     console.log(`collection users dropped`));
            }).catch(err => {
                log("MongoDB connection error. Please make sure MongoDB is running. " + err, 'Server', 'config', LogLevel.Error);
                process.exit();
            });
           // this.app.use(expressHTTP2Workaround({ express:express, http2:http2 }));

        // configure middleware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());

        // Point static path to dist
        this.app.use(express.static(path.join(__dirname, 'app')));
    }

    public routes(): void {

        this.app.use('/api/v1/users', UserRouter);
        this.app.use('/api/v1/courses', CourseRouter);
        this.app.use(['/register', '/login'], AuthRouter)
        this.app.get('**', (req, res) => {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
    }
}
export default new Server().app;