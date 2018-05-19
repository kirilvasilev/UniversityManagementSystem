import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetUser(req: Request, res: Response) {
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

    public CreateUser(req: Request, res: Response): void {
        
    }

    public DeleteUser(req: Request, res: Response): void {
        
    }

    public UpdateUser(req: Request, res: Response): void {
        
    }


    public routes() {
        this.router.get('/', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/', this.UpdateUser);
        this.router.post('/', this.DeleteUser);
    }
}

// export

export default new UserRouter().router;
