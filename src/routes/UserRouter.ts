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
            res.json({
                statusCode: 201,
                user
            });
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
            user.deletedAt = new Date(Date.now());
            user = await user.save();
            res.json({statusCode: 203, message: 'User deleted'});
        } catch (error) {
            console.log(error.message);
            res.json({statusCode: 500, message: 'Internal problem!'});
        }
    }

    public async UpdateUser(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.update(req.params.id, req.body);
            res.json({statusCode: 202, user});
        } catch (error) {
            console.log(error.message);
            res.json({statusCode: 500, message: 'Internal problem!'});
        }
    }

    public async AddCourse(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.findById(req.params.id);
            user.courses.push({creditScore: 0, course: repo.toObjectId(req.body.courseId)})
            user = await user.save();
            res.json({statusCode: 201, message: 'Course added'});
        } catch (error) {
            console.log(error.message);
            res.json({statusCode: 500, message: 'Internal problem!'});
        }
    }

    public async RemoveCourse(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let courseId = repo.toObjectId(req.body.courseId);
            let user = await repo.findById(req.params.id);
            let course = user.courses.find((credit) => credit.course == courseId);
            user.courses.splice(user.courses.indexOf(course), 1);
            user = await user.save();
            res.json({statusCode: 203, message: 'User deleted'});
        } catch (error) {
            console.log(error.message);
            res.json({statusCode: 500, message: 'Internal problem!'});
        }
    }

    public routes() {
        this.router.get('/:userId', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.delete('/', this.DeleteUser);
        this.router.put('/', this.UpdateUser);  
        this.router.post('/courses/:courseId', this.AddCourse);
        this.router.delete('/courses/:courseId', this.RemoveCourse);
    }
}

// export

export default new UserRouter().router;
