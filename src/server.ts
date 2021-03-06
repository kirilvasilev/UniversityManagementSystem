import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import * as HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';


import UserRouter from './routes/UserRouter';
import CourseRouter from './routes/CourseRouter';
import AuthRouter from './routes/AuthRouter'
import {
    LogLevel,
    log
} from './logger/ILogger';
import { env } from 'process';
import { USERS, COURSES } from './repositories/MockData';
import { UserSchema } from './schemas/UserSchema';
import { CourseSchema } from './schemas/CourseSchema';
import { GetUserRepo, GetCourseRepo } from './container/ContainerProvider';

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
            async () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
                log(`Connected to MongoDB at ${MONGO_URI || process.env.MONGODB_URI}!`)
                if (!env.production) {
                    try {
                        await mongoose.connection.collections['users'].drop();
                        log(`collection users dropped`);
                    }
                    catch {

                    }
                    finally {
                        USERS.forEach(async user => await UserSchema.create(user));
                    }
                    try {
                        await mongoose.connection.collections['courses'].drop();
                        log(`collection courses dropped`);
                    }
                    catch {

                    }
                    finally {
                        COURSES.forEach(async course => await CourseSchema.create(course));
                    }
                    log(`finished populating data`);
                }
                let userRepo = GetUserRepo();
                let courseRepo = GetCourseRepo();

                let users = await userRepo.find();
                let courses = await courseRepo.find();

                courses[0].lecturer = users[1].id;
                courses[1].lecturer = users[2].id;
                courses[2].lecturer = users[1].id;

                await users[3].courses.push({ creditScore: 2, course: courses[0].id }, { creditScore: 3, course: courses[2].id });
                await users[4].courses.push({ creditScore: 4, course: courses[0].id });
                await users[5].courses.push({ creditScore: 5, course: courses[1].id }, { creditScore: 4, course: courses[2].id });

                await courses.forEach(async course => await course.save());
                await users.forEach(async user => await user.save());

                log(`finished creating relations`);
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

    private UseAuthentication(req: Request, res: Response, next: NextFunction) {
        if ((req as any).user) {
            next();
        }
        else {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized user!' });
        }
    }

    public routes(): void {
        this.app.use(async (req, res, next) => {
            (req as any).user = undefined;
            if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
                try {
                    let decode = await jwt.verify(req.headers.authorization.split(' ')[1], 'SUPERSECRETCODE');
                    (req as any).user = decode;
                    log(`Authenticated user: ${(decode as any).username}`);
                }
                catch {
                }
            }
            next();
        });
        this.app.use('/api/v1/users', [this.UseAuthentication, UserRouter]);
        this.app.use('/api/v1/courses', [this.UseAuthentication, CourseRouter]);
        this.app.use('/', AuthRouter);
    }
}
export default new Server().app;