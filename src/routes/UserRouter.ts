import { Router, Request, Response, NextFunction } from 'express';
import  * as HttpStatus  from 'http-status-codes';

import { UserRepository } from '../repositories/UserRepository';
import { RepositoryBase } from '../repositories/RepositoryBase';
import { IUserModel } from '../models/UserModel';
import { ContainerProvider } from '../container/ContainerProvider';
import { handleError } from '../handlers/ErrorHandler';

const CONTROLLER_NAME = 'UserRouter';

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
            handleError(res, error, CONTROLLER_NAME, 'GetUser');
        }        
    }

    public async CreateUser(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.create(req.body);
            res.status(HttpStatus.CREATED).send(user);
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'CreateUser');
        }       
    }

    public async DeleteUser(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.findById(req.params.id);
            user.deleted = true;
            user.deletedAt = new Date(Date.now());
            user = await user.save();
            res.status(HttpStatus.ACCEPTED).send();
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'DeleteUser');
        }
    }

    public async UpdateUser(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.update(req.params.id, req.body);
            res.status(HttpStatus.ACCEPTED).send(user);
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'UpdateUser');
        }
    }

    public async AddCourse(req: Request, res: Response) {
        let repo = ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
        try {
            let user = await repo.findById(req.params.id);
            user.courses.push({creditScore: 0, course: repo.toObjectId(req.body.courseId)})
            user = await user.save();
            res.status(HttpStatus.CREATED).send('Course added');
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'AddCourse');
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
            res.status(HttpStatus.ACCEPTED).send('User deleted');
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'RemoveCourse');
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
