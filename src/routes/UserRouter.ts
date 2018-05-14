import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetUser(req: Request, res: Response): void {
        User.find({})
        .then(data => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch(err => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }

    public DeleteUser(req: Request, res: Response): void {
        
    }

    public UpdateUser(req: Request, res: Response): void {
        
    }


    public routes() {
        this.router.get('/users', this.GetUser);
    }
}

// export

export default new UserRouter().router;
