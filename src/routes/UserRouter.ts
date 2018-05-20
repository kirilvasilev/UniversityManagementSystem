import { Router, Request, Response, NextFunction } from 'express';
import  * as HttpStatus  from 'http-status-codes';

import { GetUserRepo } from '../container/ContainerProvider';
import { RepositoryBase } from '../repositories/RepositoryBase';
import { IUserModel } from '../models/UserModel';
import { handleError } from '../handlers/ErrorHandler';
import { log, LogLevel } from '../logger/ILogger';


const CONTROLLER_NAME = 'UserRouter';

class UserRouter {

    

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /** Returns the user's data and the courses he is attending  */
    public async GetUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let user = await repo.findById(req.params.id);
            if(user && !user.deleted){
                res.status(HttpStatus.OK).send(user);
            } else {
                res.status(HttpStatus.NOT_FOUND).send('User not found!');
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUser');
        }        
    }

    public async CreateUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            console.log(req.body);
            let user = await repo.create(req.body);
            res.status(HttpStatus.CREATED).send(user);
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'CreateUser');
        }       
    }

    public async DeleteUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let user = await repo.findById(req.params.id);
            user.deleted = true;
            user.deletedAt = new Date();
            user = await user.save();
            res.status(HttpStatus.ACCEPTED).send();
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'DeleteUser');
        }
    }

    public async UpdateUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let user = await repo.findById(req.params.id);
            if(user && !user.deleted){

                //Deleting object is only performet with the DETETE verb
                if(req.body.deleted){
                    delete req.body.deleted;
                    log('Unauthorized action. Can\'t delete user here!', CONTROLLER_NAME, 'UpdateUser', LogLevel.Warning);
                }

                // Mongoose schema validation fails for enum types
               if(req.body.userType && ['STUDENT', 'LECTURER'].indexOf(req.body.userType) < 0){
                
                log(`Unauthorized action. Invalid userType property: ${req.body.userType}`, CONTROLLER_NAME, 'UpdateUser', LogLevel.Warning);
                delete req.body.userType;
               }
                //TODO: Check if authorized to update userType!

                user = await repo.update(req.params.id, req.body);
                res.status(HttpStatus.ACCEPTED).send(user);
            } 
            else {
                res.status(HttpStatus.NOT_FOUND).send('User not found!');
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'UpdateUser');
        }
    }

    public async GetUserCourses(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let user = await repo.findById(req.params.id);
            if(user && !user.deleted){
                //let signedCourses = repo.
                if(user.userType == 'STUDENT'){
                    res.status(HttpStatus.OK)
                }
                else {

                }

                res.status(HttpStatus.OK).send(user);
            } else {
                res.status(HttpStatus.NOT_FOUND).send('User not found!');
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUserCourses');
        }        
    }

    public async AddCourse(req: Request, res: Response) {
        let repo = GetUserRepo();
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
        let repo = GetUserRepo();
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
        this.router.get('/:id', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.delete('/:id', this.DeleteUser);
        this.router.put('/:id', this.UpdateUser);  

        this.router.get('/:id/courses', this.GetUserCourses);
        this.router.post('/:id/course/', this.AddCourse);
        this.router.delete('/:id/course/', this.RemoveCourse);
    }
}

// export

export default new UserRouter().router;
