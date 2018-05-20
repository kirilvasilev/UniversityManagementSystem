import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import UserRouter from './routes/UserRouter';

class Server {

    public app: express.Application;
    /**
     *
     */
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        // set up mongoose
        const MONGO_URI = 'mongodb://localhost/ums';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI).then(
            () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
            console.log(`Connected to MongoDB at ${MONGO_URI || process.env.MONGODB_URI}!`)
            // mongoose.connection.collections['users'].drop( (err) =>
            //     console.log(`collection users dropped`));
          }).catch(err => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
          });

        // configure middleware
        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();
        this.app.use('/api/v1/user', UserRouter);
        this.app.use('/', router);
       
    }
}
export default new Server().app;