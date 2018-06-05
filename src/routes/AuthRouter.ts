import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

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
            
            if(req.body.username) {
                if(await repo.find({username: req.body.username})) {
                    res.status(HttpStatus.CONFLICT).send("User already exists!");
                }
            }

            let user = await repo.create(req.body);
            res.status(HttpStatus.CREATED).send(user);
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'CreateUser');
        }
    }

    public async Login(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {

            let user = await repo.findOne({username: req.body.username});

            if(!user) {
                res.status(HttpStatus.NOT_FOUND).send("User not found!");
            }

            if(user.password === req.body.password){
                res.status(HttpStatus.ACCEPTED).send(user);
            }
            res.sendStatus(HttpStatus.UNAUTHORIZED); 

        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'CreateUser');
        }
    }
    
    public routes() {
        this.router.post('/register', this.Register);
        this.router.post('/login', this.Login);
    }
}
// export

export default new AuthRouter().router;
