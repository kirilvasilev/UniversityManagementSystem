import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { GetCourseRepo } from '../container/ContainerProvider';
import { handleError } from '../handlers/ErrorHandler';
import { log, LogLevel } from '../logger/ILogger';
import { Course } from '../DTO/Course';


const CONTROLLER_NAME = 'CourseRouter';

class CourseRouter {



    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async GetCourses(req: Request, res: Response) {
        let repo = GetCourseRepo();
        try {
            let courses = await repo.find({}, null, null, 'lecturer');
            if (courses) {
                res.status(HttpStatus.OK).json(courses.map(course => new Course(course)));
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Courses not found.' });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetCourse');
        }
    }

    /** Returns the course's data and the schedules he is attending  */
    public async GetCourse(req: Request, res: Response) {
        let repo = GetCourseRepo();
        try {
            let course = await repo.findById(req.params.id, 'lecturer');
            if (course && !course.deleted) {
                res.status(HttpStatus.OK).json(new Course(course));
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Course not found.' });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'GetCourse');
        }
    }

    public async CreateCourse(req: Request, res: Response) {
        let repo = GetCourseRepo();
        try {
            if(req.body.lecturer == undefined) req.body.lecturer = (req as any).user._id
            let course = await repo.create(req.body);
            let createdCourse = await repo.findById(course.id, 'lecturer');
            res.status(HttpStatus.CREATED).json(new Course(course));
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'CreateCourse');
        }
    }

    public async DeleteCourse(req: Request, res: Response) {
        let repo = GetCourseRepo();
        try {
            let course = await repo.findById(req.params.id);
            course.deleted = true;
            course.deletedAt = new Date();
            course = await course.save();
            res.status(HttpStatus.ACCEPTED).json({ message: 'Course deleted.' });
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'DeleteCourse');
        }
    }

    public async UpdateCourse(req: Request, res: Response) {
        let repo = GetCourseRepo();
        try {
            let course = await repo.findById(req.params.id);
            if (course && !course.deleted) {

                //Deleting object is only performet with the DETETE verb
                if (req.body.deleted) {
                    delete req.body.deleted;
                    log('Unauthorized action. Can\'t delete course here!', CONTROLLER_NAME, 'UpdateCourse', LogLevel.Warning);
                }

                course = await repo.update(req.params.id, req.body);
                res.status(HttpStatus.ACCEPTED).json(new Course(course));
            }
            else {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Course not found.' });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'UpdateCourse');
        }
    }

    public async AddSchedule(req: Request, res: Response) {
        let repo = GetCourseRepo();
        try {
            let course = await repo.findById(req.params.id);
            let schedule = course.schedules.find((schedule) => {
                return schedule.dayOfWeek == req.body.dayOfWeek &&
                    schedule.time == req.body.time &&
                    schedule.room == req.body.room
            }
            );
            if (!schedule) {
                course.schedules.push(req.body)
                course = await course.save();
                res.status(HttpStatus.CREATED).json(new Course(course));
            }
            else {
                res.status(HttpStatus.CONFLICT).json({ message: 'Schedule already exists.' });
            }
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'AddSchedule');
        }
    }

    public async RemoveSchedule(req: Request, res: Response) {
        let repo = GetCourseRepo();
        try {
            let course = await repo.findById(req.params.id);
            let schedule = course.schedules.find((schedule) => {
                return schedule.dayOfWeek == req.body.dayOfWeek &&
                    schedule.time == req.body.time &&
                    schedule.room == req.body.room
            }
            );
            course.schedules.splice(course.schedules.indexOf(schedule), 1);
            course = await course.save();
            res.status(HttpStatus.ACCEPTED).json(new Course(course));
        } catch (error) {
            handleError(res, error, CONTROLLER_NAME, 'RemoveSchedule');
        }
    }

    public routes() {
        this.router.get('/', this.GetCourses);
        this.router.get('/:id', this.GetCourse);
        this.router.post('/', this.CreateCourse);
        this.router.delete('/:id', this.DeleteCourse);
        this.router.put('/:id', this.UpdateCourse);

        this.router.post('/:id/schedules/', this.AddSchedule);
        this.router.delete('/:id/schedules/', this.RemoveSchedule);
    }
}

// export

export default new CourseRouter().router;
