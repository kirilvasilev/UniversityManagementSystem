import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { GetUserRepo, GetCourseRepo } from '../container/ContainerProvider';
import { handleError } from '../handlers/ErrorHandler';
import { log, LogLevel } from '../logger/ILogger';
import { UserType } from '../models/UserModel';
import { User } from '../DTO/User';
import { Course } from '../DTO/Course';
import { RouterValidator } from './RouterValidator';
import { Types } from 'mongoose';


const CONTROLLER_NAME = 'UserRouter';

class UserRouter extends RouterValidator {

    public router: Router;

    constructor() {
        super();
        this.router = Router();
        this.routes();
    }

    /** Returns the user's data and the courses he is attending  */
    public async GetUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        let userId = req.params.id || (req as any).user.id;
        try {
            let user = await repo.findById(userId.toString());
            if (user) {
                res.status(HttpStatus.OK).json(new User(user));
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found.' });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUser');
        }
    }



    public async DeleteUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        let userId = req.params.id || (req as any).user.id;
        try {
            let user = await repo.findById(userId.toString());
            user.deleted = true;
            user.deletedAt = new Date();
            user = await user.save();
            res.status(HttpStatus.ACCEPTED).json({ message: 'User deleted.', userId: user.id });
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'DeleteUser');
        }
    }

    public async UpdateUser(req: Request, res: Response) {
        let repo = GetUserRepo();
        let userId = req.params.id || (req as any).user.id;
        try {
            let user = await repo.findById(userId.toString());
            if (user && !user.deleted) {

                //Deleting object is only performet with the DETETE verb
                if (req.body.deleted) {
                    delete req.body.deleted;
                    log('Unauthorized action. Can\'t delete user here!', CONTROLLER_NAME, 'UpdateUser', LogLevel.Warning);
                }

                // Mongoose schema validation fails for enum types
                if (req.body.userType && !(req as any).user.isLecturer) {

                    log(`Unauthorized action. Invalid userType property: ${req.body.userType}`, CONTROLLER_NAME, 'UpdateUser', LogLevel.Warning);
                    delete req.body.userType;
                }

                user = await repo.update(userId.toString(), req.body);
                res.status(HttpStatus.ACCEPTED).json(new User(user));
            }
            else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found.' });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'UpdateUser');
        }
    }

    public async GetUsers(req: Request, res: Response) {
        let repo = GetUserRepo();

        try {
            let users = await repo.find({}, null, null, 'courses');
            res.status(HttpStatus.OK).json(users.map(user => new User(user)));
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUsers');
        }
    }

    public async GetUserCourses(req: Request, res: Response) {
        let repo = GetUserRepo();
        let userId = req.params.id || (req as any).user.id;
        try {
            let user = await repo.findById(userId.toString());
            if (user && !user.deleted) {

                let courseRepo = GetCourseRepo();

                if (user.userType == UserType.Lecturer) {
                    let lecturerCourses = await courseRepo.find({ lecturer: { $in: user.id } });
                    let hangingCourses = await courseRepo.find({ lecturer: null });

                    res.status(HttpStatus.OK).json({
                        myCourses: lecturerCourses.map(course => new Course(course)),
                        otherCourses: hangingCourses.map(course => new Course(course))
                    });
                }
                else {
                    let studentCourses = await courseRepo.find({ _id: { $in: user.courses.map(course => course.course) } });
                    let otherCourses = await courseRepo.find({ _id: { $nin: user.courses.map(course => course.course) } });

                    res.status(HttpStatus.OK).json({
                        myCourses: studentCourses.map(course => new Course(course)),
                        otherCourses: otherCourses.map(course => new Course(course))
                    });
                }
            }
            else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found.' });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetUserCourses');
        }
    }

    public async AddCourse(req: Request, res: Response) {
        let repo = GetUserRepo();
        let userId = req.params.id || (req as any).user.id;
        try {
            await repo.addCourse(userId, { creditScore: 0, course: repo.toObjectId(req.body.id) });
            res.status(HttpStatus.CREATED).json({message: 'Course added.'});
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'AddCourse');
        }
    }

    public async RemoveCourse(req: Request, res: Response) {
        let repo = GetUserRepo();
        let userId = req.params.id || (req as any).user.id;
        try {
            let courseId = req.body.id;
            let user = await repo.findById(userId.toString());
            //await repo.removeCourse(userId, courseId);
            let course = user.courses.find((credit) => credit.course == courseId);
            user.courses.splice(user.courses.indexOf(course), 1);
            user = await user.save();
            res.status(HttpStatus.ACCEPTED).json({ message: 'Course removed.' });
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'RemoveCourse');
        }
    }

    public routes() {

        this.router.get('/', this.GetUsers);

        this.router.delete('/', this.DeleteUser);
        this.router.put('/', [this.ValidateBody, this.UpdateUser]);

        this.router.get('/courses', this.GetUserCourses);
        this.router.post('/courses', [this.ValidateBody, this.AddCourse]);
        this.router.delete('/courses', this.RemoveCourse);

        this.router.get('/:id', [this.ValidateId, this.GetUser]);
        this.router.delete('/:id', [this.ValidateId, this.DeleteUser]);
        this.router.put('/:id', [this.ValidateId, this.ValidateBody, this.UpdateUser]);

        this.router.get('/:id/courses', [this.ValidateId, this.GetUserCourses]);
        this.router.post('/:id/courses', [this.ValidateId, this.ValidateBody, this.AddCourse]);
        this.router.delete('/:id/courses', [this.ValidateId, this.RemoveCourse]);
    }
}

// export

export default new UserRouter().router;
