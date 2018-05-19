import { Types } from 'mongoose';

import { IUMSModel } from './IUMSModel';

export interface IUserModel extends IUMSModel {
    name: {
        first: String;
        last: String;
    };
    username: String;
    password: String;
    userType: String;  
    credits: [{
        creditScore: Number;
        course: Types.ObjectId;
    }];
};