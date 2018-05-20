import { Router, Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { RepositoryBase } from '../repositories/RepositoryBase';
import { IUserModel } from '../models/UserModel';
import { ContainerProvider } from '../container/ContainerProvider';

class UserRouter {

    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    /** Returns the user's data and the courses he is attending  */
    public async GetUser(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let data = await repo.findById(req.params.userId);
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        } catch (error) {
            console.log(error.message);
            res.json({statusCode: 500, message: 'Internal problem!'});
        }        
    }

    public async CreateUser(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.create(req.body);

        } catch (error) {
            console.log(error.message);
            res.json({statusCode: 500, message: 'Internal problem!'});
        }       
    }

    public async DeleteUser(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.findById(req.params.id);
            user.deleted = true;
            user = await user.save();
            res.json({statusCode: 200, message: 'User deleted'});
        } catch (error) {
            console.log(error.message);
            res.json({statusCode: 500, message: 'Internal problem!'});
        }
    }

    public UpdateUser(req: Request, res: Response): void {
        
    }

    public AddCourse(req: Request, res: Response): void {
        
    }

    public RemoveCourse(req: Request, res: Response): void {
        
    }



    public routes() {
        this.router.get('/:userId', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/', this.UpdateUser);
        this.router.delete('/', this.DeleteUser);
        this.router.post('/courses/:id', this.AddCourse);
        this.router.delete('/courses/:id', this.RemoveCourse);
    }
}

// export

export default new UserRouter().router;
