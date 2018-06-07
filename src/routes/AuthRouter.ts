import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { GetUserRepo } from '../container/ContainerProvider';
import { handleError } from '../handlers/ErrorHandler';
import { log, LogLevel } from '../logger/ILogger';


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
            let foundUsers = await repo.find({username: req.body.username});

            if(foundUsers.length > 0) {
                res.status(HttpStatus.CONFLICT).json({message: "User already exists."});
            }
            else {
                let user = await repo.create(req.body);
                delete user.password;
                res.status(HttpStatus.CREATED).json({token: jwt.sign(user, 'SUPERSECRETCODE')});
            }          
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'CreateUser');
        }
    }

    public async Login(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {

            let user = await repo.findOne({username: req.body.username});

            if(user && user.password === req.body.password){
                delete user.password;
                res.status(HttpStatus.ACCEPTED).json({token: jwt.sign(user, 'SUPERSECRETCODE')});
                return;
            }
            res.status(HttpStatus.UNAUTHORIZED).json({message: 'Wrong username or password.'}); 

        } catch (error) {    
            handleError(res, error, CONTROLLER_NAME, 'CreateUser');
        }
    }
    
    public routes() {
        this.router.post('/register', this.Register);
        this.router.post('/login', this.Login);
        this.router.use('**', (req, res) => res.status(HttpStatus.NOT_FOUND).json({message: 'Route not found'}));
    }
}
// export

export default new AuthRouter().router;
