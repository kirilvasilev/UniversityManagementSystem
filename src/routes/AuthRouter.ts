import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { GetUserRepo } from '../container/ContainerProvider';
import { handleError } from '../handlers/ErrorHandler';
import { log, LogLevel } from '../logger/ILogger';
import { UserType } from '../models/UserModel';
import { User } from '../DTO/User';


const CONTROLLER_NAME = 'AuthRouter';

class AuthRouter {



    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    public async Register(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let foundUsers = await repo.find({ username: req.body.username });
            let users = await repo.find();
            if (foundUsers.length > 0) {
                res.status(HttpStatus.CONFLICT).json({ message: "User already exists." });
            }
            else {
                req.body.userType = users.length > 0 ? UserType.Student : UserType.Lecturer;
                let user = await repo.create(req.body);
                let flatUser = new User(user);
                res.status(HttpStatus.CREATED).json({ user: flatUser, token: jwt.sign(flatUser, 'SUPERSECRETCODE') });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'Register');
        }
    }

    public async Login(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {

            let user = await repo.findOne({ username: req.body.username });

            if (user && user.password === req.body.password) {
                let flatUser = new User(user);
                res.status(HttpStatus.ACCEPTED).json({ user: flatUser, token: jwt.sign(flatUser, 'SUPERSECRETCODE') });
                return;
            }
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Wrong username or password.' });

        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'Login');
        }
    }

    public routes() {
        this.router.post('/register', this.Register);
        this.router.post('/login', this.Login);
        this.router.use('**', (req, res) => res.status(HttpStatus.NOT_FOUND).json({ message: 'Route not found' }));
    }
}
// export

export default new AuthRouter().router;
