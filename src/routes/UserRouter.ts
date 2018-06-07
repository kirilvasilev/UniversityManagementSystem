import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { GetUserRepo, GetCourseRepo } from '../container/ContainerProvider';
import { handleError } from '../handlers/ErrorHandler';
import { log, LogLevel } from '../logger/ILogger';
import { UserType } from '../models/UserModel';


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
            if (user && !user.deleted) {
                res.status(HttpStatus.OK).json(user);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({message: 'User not found.'});
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUser');
        }
    }

    

    public async DeleteUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let user = await repo.findById(req.params.id);
            user.deleted = true;
            user.deletedAt = new Date();
            user = await user.save();
            res.status(HttpStatus.ACCEPTED).json({message: 'User deleted.', userId: user.id});
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'DeleteUser');
        }
    }

    public async UpdateUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let user = await repo.findById(req.params.id);
            if (user && !user.deleted) {

                //Deleting object is only performet with the DETETE verb
                if (req.body.deleted) {
                    delete req.body.deleted;
                    log('Unauthorized action. Can\'t delete user here!', CONTROLLER_NAME, 'UpdateUser', LogLevel.Warning);
                }

                // Mongoose schema validation fails for enum types
                if (req.body.userType) {

                    log(`Unauthorized action. Invalid userType property: ${req.body.userType}`, CONTROLLER_NAME, 'UpdateUser', LogLevel.Warning);
                    delete req.body.userType;
                }
                //TODO: Check if authorized to update userType!

                user = await repo.update(req.params.id, req.body);
                res.status(HttpStatus.ACCEPTED).json(user);
            }
            else {
                res.status(HttpStatus.NOT_FOUND).json({message: 'User not found.'});
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'UpdateUser');
        }
    }

    public async GetUsers(req: Request, res: Response) {
        let repo = GetUserRepo();

        try {
            let users = await repo.find({ deleted: false }, '-password -username -deleted', 'courses');
            res.status(HttpStatus.OK).json(users);
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUsers');
        }
    }

    public async GetUserCourses(req: Request, res: Response) {
        let repo = GetUserRepo();

        try {
            let user = await repo.findById(req.params.id);
            if (user && !user.deleted) {

                let courseRepo = GetCourseRepo();

                if (user.userType == UserType.Lecturer) {
                    let lecturerCourses = await courseRepo.find({ lecturer: { $in: user._id } });
                    let hangingCourses = await courseRepo.find({ lecturer: null });

                    res.status(HttpStatus.OK).json({
                        lecturerCourses: lecturerCourses,
                        hangingCourses: hangingCourses
                    });
                }
                else {
                    let studentCourses = await courseRepo.find({ _id: { $in: user.courses.map(course => course.course) } });
                    let otherCourses = await courseRepo.find({ _id: { $nin: user.courses.map(course => course.course) } });

                    res.status(HttpStatus.OK).json({
                        stundetCourses: studentCourses,
                        otherCourses: otherCourses
                    });
                }
            }
            else {
                res.status(HttpStatus.NOT_FOUND).json({message: 'User not found.'});
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUserCourses');
        }
    }

    public async AddCourse(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let user = await repo.findById(req.params.id);
            user.courses.push({ creditScore: 0, course: repo.toObjectId(req.body.id) })
            user = await user.save();
            res.status(HttpStatus.CREATED).json(user);
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'AddCourse');
        }
    }

    public async RemoveCourse(req: Request, res: Response) {
        let repo = GetUserRepo();
        try {
            let courseId = repo.toObjectId(req.body.id);
            let user = await repo.findById(req.params.id);
            let course = user.courses.find((credit) => credit.course == courseId);
            user.courses.splice(user.courses.indexOf(course), 1);
            user = await user.save();
            res.status(HttpStatus.ACCEPTED).json({message: 'Course removed.'});
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'RemoveCourse');
        }
    }

    public routes() {
        this.router.get('/:id', this.GetUser);
        this.router.delete('/:id', this.DeleteUser);
        this.router.put('/:id', this.UpdateUser);
        this.router.get('/', this.GetUsers);

        this.router.get('/:id/courses', this.GetUserCourses);
        this.router.post('/:id/courses/', this.AddCourse);
        this.router.delete('/:id/courses/', this.RemoveCourse);
    }
}

// export

export default new UserRouter().router;
