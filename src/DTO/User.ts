import { IUserModel, UserType } from "../models/UserModel";

export class User {
    
    public id : String;    
    public firstName : String;  
    public lastName : String;   
    public isLecturer : Boolean;      
    public courses : any[];   

     /**
     * Creates flattended user object menth for transfer
     */
    constructor(userModel: IUserModel) {
            this.id = userModel.id;
            this.firstName = userModel.name.first;
            this.lastName = userModel.name.last;
            this.isLecturer = userModel.userType == UserType.Lecturer;
            this.courses = userModel.courses;
    }
}