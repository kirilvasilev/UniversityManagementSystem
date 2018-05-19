import { Router, Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { RepositoryBase } from '../repositories/RepositoryBase';
import { IUserModel } from '../models/UserModel';

class UserRouter {

    public router: Router;
    private repo: RepositoryBase<IUserModel>;
    constructor(repo: RepositoryBase<IUserModel>) {
        this.router = Router();
        this.repo = repo;
        this.routes();
    }

    /** Returns the user's data and the courses he is attending  */
    public GetUser(req: Request, res: Response) {
        this.repo.findById(req.params.id)
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
        this.repo.create(req.body);
    }

    public DeleteUser(req: Request, res: Response): void {
        this.repo.findById(req.params.id)
        .then(user => {
            user.deleted = true;
            user.save()
            .then(user => {
                const status = res.statusCode;
                res.json({status, user})
            })
            .catch(err => {
                const status = res.statusCode;
                res.json({status, user})
            })
        });
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

export default new UserRouter(new UserRepository()).router;
