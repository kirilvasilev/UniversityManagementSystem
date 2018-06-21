import { ICourseModel } from "../models/CourseModel";
import { IUserModel } from "../models/UserModel";
import { User } from "./User";

export class Course {
    
    public id : String;   
    public  name : String;
    public description : String;
    public schedules : any[];
    public credits : Number;    
    public lecturer : any;

    /**
     * Creates a flattened course object
     */
    constructor(courseModel: ICourseModel) {
        this.id = courseModel.id;
        this.name = courseModel.name;
        this.description = courseModel.description;
        this.schedules = courseModel.schedules;
        this.credits = courseModel.credits;
        try {
        this.lecturer = new User(((courseModel.lecturer as any) as IUserModel));
        }
        catch {
            this.lecturer = courseModel.lecturer;
        }
    }
}