import { Types } from 'mongoose';

import { IUMSModel } from './IUMSModel';

export enum UserType { Student = 0, Lecturer };

export interface IUserModel extends IUMSModel {
    name: {
        first: String;
        last: String;
    };
    username: String;
    password: String;
    userType: UserType;
    courses: [{
        creditScore: Number;
        course: Types.ObjectId;
    }];
};

