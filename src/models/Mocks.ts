import { UserType } from "./UserModel";

export interface IUserModelMock extends BaseMock {
    name: {
        first: String;
        last: String;
    };
    username: String;
    password: String;
    userType: UserType;
    courses: Array<Course>;
    createdAt: Date;
    deleted: Boolean;
    deletedAt: Date;
};

export interface ICourseModelMock extends BaseMock {
    name: String;
    description: String;
    schedules: Array<Schedule>;
    credits: Number
    lecturer: String;

};

export interface Course {
    creditScore: Number;
    course: String;
}

export interface Schedule {
    dayOfWeek: Number;
    time: String;
    room: String;
}

export interface BaseMock {
    [key: string]: any;
    _id: String;
    createdAt: Date;
    deleted: Boolean;
    deletedAt: Date;
}