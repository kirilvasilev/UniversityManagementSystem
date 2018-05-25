import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import path from 'path';

import UserRouter from './routes/UserRouter';
import CourseRouter from './routes/CourseRouter';
import { LogLevel, log } from './logger/ILogger';
import IndexRouter from './routes/IndexRouter';

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
            log(`Connected to MongoDB at ${MONGO_URI || process.env.MONGODB_URI}!`)
            // mongoose.connection.collections['users'].drop( (err) =>
            //     console.log(`collection users dropped`));
          }).catch(err => {
            log("MongoDB connection error. Please make sure MongoDB is running. " + err, 'Server', 'config', LogLevel.Error);
            process.exit();
          });

        // configure middleware
        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());

        // Point static path to dist
        this.app.use(express.static(path.join(__dirname, 'app')));
        // Catch all other routes and return the index file

    }

    public routes(): void {
        this.app.get('/', IndexRouter);
        this.app.use('/api/v1/users', UserRouter);
        this.app.use('/api/v1/courses', CourseRouter); 
        }
        // this.app.get('/pushy', (req, res) => {
        //     var stream = res.push('/main.js', {
        //       status: 200, // optional
        //       method: 'GET', // optional
        //       request: {
        //         accept: '*/*'
        //       },
        //       response: {
        //         'content-type': 'application/javascript'
        //       }
        //     })
        //     stream.on('error', function() {
        //     })
        //     stream.end('alert("hello from push stream!");')
        //     res.end('<script src="/main.js"></script>')
        //   });        
    }
}
export default new Server().app;